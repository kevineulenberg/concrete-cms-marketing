import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isWebGL = false;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;

    // 2D Fallback Variables (Interactive Node Grid / Concrete Blocks)
    let ctx: CanvasRenderingContext2D | null = null;
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }
    let particles: Particle[] = [];
    const maxParticles = 60;
    const connectionDist = 120;

    // Track mouse coordinates
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;

    // Attempt to initialize WebGL
    try {
      gl = canvas.getContext('webgl', { 
        alpha: true, 
        antialias: true,
        premultipliedAlpha: false 
      });

      if (gl) {
        // Vertex Shader Source
        const vsSource = `
          attribute vec2 position;
          void main() {
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `;

        // Robust FBM Shader
        const fsSource = `
          #ifdef GL_FRAGMENT_PRECISION_HIGH
          precision highp float;
          #else
          precision mediump float;
          #endif

          uniform vec2 u_resolution;
          uniform float u_time;
          uniform vec2 u_mouse;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                       mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(0.87758, 0.47942, -0.47942, 0.87758);
            for (int i = 0; i < 4; ++i) {
              v += a * noise(p);
              p = rot * p * 2.0 + shift;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

            vec2 m = (u_mouse.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
            float d = length(p - m);
            float mouseInfluence = smoothstep(1.5, 0.0, d);

            float time = u_time * 0.15;
            vec2 q = vec2(0.0);
            q.x = fbm(p + vec2(0.0));
            q.y = fbm(p + vec2(1.0));

            vec2 r = vec2(0.0);
            r.x = fbm(p + 1.0 * q + vec2(1.7, 9.2) + 0.12 * time);
            r.y = fbm(p + 1.0 * q + vec2(8.3, 2.8) + 0.09 * time);

            float f = fbm(p + 1.0 * r + mouseInfluence * 0.4);

            vec3 color_base = vec3(0.98, 0.976, 0.965);   // Alabaster (#FAF9F6)
            vec3 color_slate = vec3(0.92, 0.91, 0.88);  // Light warm concrete gray
            vec3 color_orange = vec3(0.92, 0.42, 0.22); // Safety Orange (#E65F2B)

            vec3 col = mix(color_base, color_slate, clamp(f * 1.5, 0.0, 1.0));
            col = mix(col, color_orange, clamp(length(q) * mouseInfluence * 0.55, 0.0, 1.0));
            col = mix(col, vec3(0.96, 0.95, 0.93), clamp(length(r) * 0.35, 0.0, 1.0));

            gl_FragColor = vec4(col, 1.0);
          }
        `;

        // Shader Compilations
        const compileShader = (source: string, type: number) => {
          const shader = gl!.createShader(type);
          if (!shader) return null;
          gl!.shaderSource(shader, source);
          gl!.compileShader(shader);
          if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
            console.error("Shader compilation warning:", gl!.getShaderInfoLog(shader));
            gl!.deleteShader(shader);
            return null;
          }
          return shader;
        };

        vs = compileShader(vsSource, gl.VERTEX_SHADER);
        fs = compileShader(fsSource, gl.FRAGMENT_SHADER);

        if (vs && fs) {
          program = gl.createProgram();
          if (program) {
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);

            if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
              gl.useProgram(program);
              isWebGL = true;
            }
          }
        }
      }
    } catch (e) {
      console.warn("WebGL initialization failed, using 2D fallback", e);
    }

    // Setup positions if WebGL works
    if (isWebGL && gl && program) {
      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1.0, -1.0,
           1.0, -1.0,
          -1.0,  1.0,
          -1.0,  1.0,
           1.0, -1.0,
           1.0,  1.0,
        ]),
        gl.STATIC_DRAW
      );

      const positionLocation = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    } else {
      // Initialize 2D Context & Particles Fallback
      isWebGL = false;
      ctx = canvas.getContext('2d');
      if (ctx) {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
          particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * 400, // Hero area height
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1.5,
            color: Math.random() > 0.85 ? '#E65F2B' : '#7A7A7A'
          });
        }
      }
    }

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseX = e.touches[0].clientX - rect.left;
        targetMouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let animationId = 0;
    const startTime = performance.now();

    const render = () => {
      // 1. ROBUST SIZE MATCHING: Match the backing store dimensions directly to clientWidth/clientHeight
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || 500;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        if (isWebGL && gl) {
          gl.viewport(0, 0, width, height);
        }
      }

      // Smooth mouse coordinates damping
      if (targetMouseX !== -9999) {
        if (mouseX === -9999) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.08;
          mouseY += (targetMouseY - mouseY) * 0.08;
        }
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }

      if (isWebGL && gl && program) {
        // WebGL Render Block
        const currentTime = (performance.now() - startTime) / 1000;
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const mouseLocation = gl.getUniformLocation(program, "u_mouse");

        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(timeLocation, currentTime);
        
        // Pass mouse Y relative to bottom of canvas in WebGL coordinates
        const webglMouseY = mouseY !== -9999 ? canvas.height - mouseY : -9999;
        gl.uniform2f(mouseLocation, mouseX, webglMouseY);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else if (ctx) {
        // High-End 2D Particles Blueprint Grid Render Block
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fill subtle alabaster canvas background
        ctx.fillStyle = '#FAF9F6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render delicate grid block lines in background
        ctx.strokeStyle = 'rgba(18, 18, 18, 0.015)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Draw and update node particles
        particles.forEach((p) => {
          // Drifting movement
          p.x += p.vx;
          p.y += p.vy;

          // Wall boundaries bouncing
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          // Mouse gravity/repulsion effect
          if (mouseX !== -9999 && mouseY !== -9999) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const force = (150 - dist) / 150;
              p.x += (dx / dist) * force * 1.5;
              p.y += (dy / dist) * force * 1.5;
            }
          }

          // Draw node point
          ctx!.fillStyle = p.color;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fill();
        });

        // Draw connection lines between nearby particles
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
              const alpha = (1 - dist / connectionDist) * 0.08;
              ctx.strokeStyle = `rgba(18, 18, 18, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (isWebGL && gl) {
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (program) gl.deleteProgram(program);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-20 pointer-events-none block"
    />
  );
}
