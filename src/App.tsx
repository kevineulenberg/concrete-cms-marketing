import { useState } from 'react'
import { 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Globe 
} from 'lucide-react'
import logoImg from './assets/logo.webp'
import HeroCanvas from './components/HeroCanvas'

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  badge?: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  specs: {
    storage: string;
    bandwidth: string;
    sla: string;
  };
}

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("Professional");

  const plans: PricingPlan[] = [
    {
      name: "Core",
      price: 60,
      description: "Für schnelle visuelle Websites, Designstudios und Standard-Produktionsseiten, die ein extrem performantes Hosting benötigen.",
      features: [
        "Visuelle Bearbeitung direkt im Kontext",
        "Automatisierte Core-Updates & Sicherheits-Patches",
        "Tägliche verschlüsselte Offsite-Backups (30 Tage Aufbewahrung)",
        "Globales Edge CDN mit DDOS-Schutz",
        "Kostenlose SSL-Zertifikate (Let's Encrypt)",
        "Erweiterter SEO- & Metadaten-Manager",
        "Core-Blockbibliothek & Layout-Builder"
      ],
      cta: "Core-Instanz bereitstellen",
      highlighted: false,
      specs: {
        storage: "10 GB High-Speed-SSD",
        bandwidth: "Unbegrenzt",
        sla: "Standard-Helpdesk"
      }
    },
    {
      name: "Professional",
      price: 90,
      badge: "Sehr Beliebt",
      description: "Für kollaborative Teams, Agentur-Portfolios und professionelle Publishing-Setups mit hohem Content-Aufkommen.",
      features: [
        "Alles aus dem Core-Tarif",
        "Dedizierte Staging-Umgebung mit 1-Klick-Synchronisation",
        "Erweiterte benutzerdefinierte Berechtigungen & redaktionelle Workflows",
        "Multi-Website-Management-Dashboard",
        "Visuelle Versionierung & Rollback-Verlauf",
        "Erweiterte Sicherheit & Web Application Firewall (WAF)",
        "Premium-API-Zugang & nativer Webhooks-Support"
      ],
      cta: "Mit Professional skalieren",
      highlighted: true,
      specs: {
        storage: "50 GB NVMe-SSD-Speicher",
        bandwidth: "Unbegrenzt (Hohe Priorität)",
        sla: "8 Std. SLA Reaktionszeit"
      }
    },
    {
      name: "Enterprise",
      price: 120,
      description: "Für geschäftskritische Anwendungen, riesige Portale, strenge Compliance-Anforderungen und vollkommene architektonische Flexibilität.",
      features: [
        "Alles aus dem Professional-Tarif",
        "Hochverfügbares, automatisch skalierendes Cluster-Setup",
        "Dedizierte Datenbank- & Redis-Cache-Instanzen",
        "Single Sign-On (SSO / SAML / OAuth)",
        "Sicherheits-Audit-Trail & Log-Streaming auf Enterprise-Niveau",
        "Individuelle Integrationsberatung (2 Std./Monat)",
        "Notfall-Telefon-Hotline rund um die Uhr"
      ],
      cta: "Enterprise-Tarif anfordern",
      highlighted: false,
      specs: {
        storage: "200 GB NVMe-Speicher",
        bandwidth: "Unbegrenzt (Dedizierte Anbindung)",
        sla: "1 Std. SLA-Garantie für kritische Fälle"
      }
    }
  ];

  const faqs = [
    {
      q: "Gibt es wirklich keine Einrichtungsgebühren oder versteckten Kosten?",
      a: "Ja, absolut korrekt. Wir glauben an vollkommene Transparenz. Es gibt keinerlei Einrichtungsgebühren, Bereitstellungs- oder Bereitstellungskosten. Sie zahlen nur die feste monatliche Gebühr des von Ihnen gewählten Tarifs."
    },
    {
      q: "Kann ich meinen Tarif später upgraden oder downgraden?",
      a: "Selbstverständlich. Sie können Ihren Cluster jederzeit direkt über die Concrete CMS Cloud-Konsole skalieren oder zwischen den Tarifen wechseln. Upgrades werden ohne Ausfallzeit sofort wirksam, und die Abrechnung erfolgt anteilig."
    },
    {
      q: "Wie funktioniert der 1-Klick-Staging-Sync im Professional-Tarif?",
      a: "Wir stellen eine isolierte Shadow-Instanz Ihres Concrete CMS bereit. Sie können sicher Blöcke bauen, Themes testen oder neue Website-Architekturen entwerfen. Nach der Freigabe klicken Sie auf „In Produktion veröffentlichen“, um Ihre Änderungen sicher zu übertragen, ohne die Live-Website zu gefährden."
    },
    {
      q: "Was unterscheidet Concrete CMS Cloud von gewöhnlichem Hosting?",
      a: "Klassisches Hosting ist verallgemeinert. Concrete CMS Cloud wurde auf Serverebene speziell für die Concrete PHP-Block-Engine entwickelt. Dies beinhaltet fein abgestimmten OPCache, angepasste Datenbank-Engines, automatische Core-Updates und direkte Optimierungen für die visuelle Bearbeitung."
    },
    {
      q: "Wo werden meine Daten gehostet und wie sicher sind sie?",
      a: "Wir hosten Ihre Instanzen auf erstklassiger, ISO-zertifizierter europäischer und amerikanischer Cloud-Infrastruktur. Jeder Tarif beinhaltet ein Let's Encrypt SSL-Zertifikat, visuelle Sicherheitsverfolgung, tägliche Offsite-Backups und eine fortschrittliche Web Application Firewall (WAF)."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] font-sans selection:bg-[#E65F2B] selection:text-white flex flex-col justify-between">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF9F6]/80 border-b border-black/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center group">
            <img src={logoImg} alt="Concrete CMS Logo" className="h-12 w-auto max-w-[200px] object-contain transition-transform group-hover:scale-105" />
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider font-semibold">
            <a href="#pricing" className="hover:text-[#E65F2B] transition-colors">Preismodelle</a>
            <a href="#faq" className="hover:text-[#E65F2B] transition-colors">Technische FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#pricing" 
              className="bg-[#121212] hover:bg-[#E65F2B] text-white px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all hover:scale-105 duration-300 inline-block shadow-sm"
            >
              Jetzt starten
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-56 md:pb-48">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(230,95,43,0.03),transparent_40%)]" />
        <HeroCanvas />
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-xs font-mono font-medium tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-[#E65F2B] animate-pulse" />
            CMS powered by Payload CMS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] text-[#121212] mb-8 font-sans">
            Brutale Einfachheit.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#121212] via-[#5F5F5F] to-[#E65F2B]">
              Enterprise-Power.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#5F5F5F] font-sans font-normal leading-relaxed mb-12">
            Das intuitivste, auf Payload CMS basierende Enterprise-CMS der Welt – das ultimative System zur Stärkung deiner Marke. Keine komplexen Setups, extreme Geschwindigkeit und vollkommene visuelle Freiheit auf jedem Bildschirm.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto bg-[#E65F2B] hover:bg-[#d04e1c] text-white px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 duration-300 flex items-center justify-center gap-2"
            >
              Tarife entdecken <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* Pricing Section (THE HERO OF THE PAGE) */}
      <section id="pricing" className="py-24 bg-[#121212] text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(230,95,43,0.06),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#E65F2B] uppercase tracking-widest font-mono text-xs font-bold block mb-4">Preisarchitektur</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-sans">
              Transparente monatliche Tarife.
            </h2>
            <p className="text-[#A0A0A0] font-sans text-sm sm:text-base leading-relaxed">
              Wählen Sie das passende Tarifmodell, das mit Ihrer Marke und Ihrem Team wächst. Keine versteckten Gebühren, unbegrenzte visuelle Editoren und <strong className="text-white">dauerhaft kostenlose Einrichtung</strong>.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
                <div 
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`cursor-pointer relative p-8 sm:p-10 rounded-[32px] border transition-all duration-500 flex flex-col justify-between outline-none ${
                    plan.highlighted 
                      ? 'bg-gradient-to-b from-[#1E1E1E] to-[#141414] border-[#E65F2B] shadow-2xl scale-100 lg:scale-[1.03] z-10' 
                      : 'bg-[#181818] border-white/5 hover:border-white/20'
                  } ${isSelected ? 'ring-2 ring-[#E65F2B]/50' : ''}`}
                >
                  
                  {plan.badge && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#E65F2B] text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 rounded-full font-bold shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-8">
                      <span className="text-[#E65F2B] font-mono text-xs uppercase tracking-widest font-semibold">{plan.name}-Tarif</span>
                      <div className="flex items-baseline gap-2 mt-3 mb-4">
                        <span className="text-5xl sm:text-6xl font-extrabold tracking-tight font-sans">€{plan.price}</span>
                        <span className="text-[#A0A0A0] text-xs font-mono uppercase tracking-wider">/ Monat</span>
                      </div>
                      <p className="text-xs text-[#A0A0A0] uppercase font-mono tracking-wider font-semibold border-b border-white/5 pb-4 mb-4 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#E65F2B]" /> Einrichtung: €0 Kostenlos
                      </p>
                      <p className="text-[#A0A0A0] text-xs sm:text-sm leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Features checklist */}
                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                          <Check className="w-4 h-4 text-[#E65F2B] shrink-0 mt-0.5" />
                          <span className="text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs & CTA */}
                  <div>
                    <div className="bg-black/30 p-5 rounded-2xl border border-white/5 mb-8 space-y-2.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#A0A0A0]">Speicherkapazität:</span>
                        <span className="text-white font-semibold">{plan.specs.storage}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#A0A0A0]">Bandbreite:</span>
                        <span className="text-white font-semibold">{plan.specs.bandwidth}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#A0A0A0]">Support-Reaktionszeit:</span>
                        <span className="text-[#E65F2B] font-semibold">{plan.specs.sla}</span>
                      </div>
                    </div>

                    <a 
                      href="#contact"
                      className={`w-full py-4 px-6 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-center block transition-all duration-300 ${
                        plan.highlighted
                          ? 'bg-[#E65F2B] hover:bg-[#d04e1c] text-white shadow-lg shadow-[#E65F2B]/10 hover:scale-105'
                          : 'bg-white/10 hover:bg-white/15 text-white hover:scale-105'
                      }`}
                    >
                      {plan.cta}
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Pricing Highlight banner */}
          <div className="mt-16 bg-[#181818] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E65F2B]/10 border border-[#E65F2B]/20 flex items-center justify-center text-[#E65F2B] shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-lg">Benötigen Sie eine maßgeschneiderte Architektur oder ein hochvolumiges Multi-Site-Cluster?</h4>
                <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">Wir konzipieren maßgeschneiderte Enterprise-Cloud-Frameworks, Bare-Metal-Isolation und spezialisierte Datenbank-Cluster.</p>
              </div>
            </div>
            <a 
              href="#contact"
              className="bg-white text-black hover:bg-[#FAF9F6] px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all shrink-0 hover:scale-105 duration-300"
            >
              Architekten kontaktieren
            </a>
          </div>

        </div>
      </section>

      {/* Technical Accordion FAQ */}
      <section id="faq" className="py-24 bg-[#FAF9F6] text-[#121212] relative">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-[#E65F2B] uppercase tracking-widest font-mono text-xs font-bold block mb-4">Betriebshandbuch</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Häufig gestellte Fragen
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-[#F0EEEA] border border-black/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none hover:bg-black/[0.02] transition-colors"
                  >
                    <span className="font-sans font-bold text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#E65F2B] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>

                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-60 border-t border-black/5' : 'max-h-0'
                    }`}
                  >
                    <p className="p-6 text-xs sm:text-sm text-[#5F5F5F] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#121212] to-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(230,95,43,0.04),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[#E65F2B] uppercase tracking-widest font-mono text-xs font-bold block mb-4">Sofort bereitstellen</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-8 font-sans">
            Bereit, managed Concrete zu erleben?
          </h2>
          <p className="max-w-xl mx-auto text-[#A0A0A0] text-xs sm:text-sm leading-relaxed mb-12">
            Erleben Sie blitzschnelles Rendering, direkte visuelle Seitengestaltung und eiserne Serversicherheit. Keine Einrichtungsgebühr, in wenigen Minuten startklar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setSelectedPlan("Professional")}
              className="w-full sm:w-auto bg-[#E65F2B] hover:bg-[#d04e1c] text-white px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:scale-105 duration-300"
            >
              Managed Cloud starten
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-colors">
              Mit Engineering sprechen
            </button>
          </div>
        </div>
      </section>

      {/* Architectural Footer */}
      <footer className="bg-black text-[#A0A0A0] border-t border-white/5 py-12 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Concrete CMS Logo" className="h-6 w-auto opacity-80" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Concrete CMS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-mono text-[10px] uppercase tracking-widest">
            <a href="#pricing" className="hover:text-white transition-colors">Preismodelle</a>
            <a href="#faq" className="hover:text-white transition-colors">Service-Handbuch</a>
          </div>
          <div className="text-[10px] font-mono tracking-wider">
            © {new Date().getFullYear()} Concrete Cloud. Alle Rechte vorbehalten. Einrichtung ist €0.
          </div>
        </div>
      </footer>

    </div>
  );
}
