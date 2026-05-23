import { useState } from 'react'
import { 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Globe 
} from 'lucide-react'
import logoImg from './assets/logo.webp'
import concreteFooterLogoImg from './assets/concrete.svg'
import cmsCollageImg from './assets/headless-cms-collage.webp'
import HeroCanvas from './components/HeroCanvas'

interface PricingPlan {
  name: string;
  priceCents: number;
  description: string;
  badge?: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  details: {
    label: string;
    value: string;
    emphasized?: boolean;
  }[];
}

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("Growth Care");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const isYearly = billingCycle === "yearly";
  const yearlyDiscountCents = 1000;
  const formatPrice = (priceCents: number) => {
    const euros = Math.floor(priceCents / 100).toString();
    const cents = (priceCents % 100).toString().padStart(2, "0");

    return { euros, cents };
  };

  const plans: PricingPlan[] = [
    {
      name: "Static Care",
      priceCents: 5990,
      description: "Für einfache Websites, die zuverlässig online bleiben sollen und nur selten geändert werden.",
      features: [
        "Statisches Managed Hosting",
        "SSL-Zertifikat inklusive",
        "Globales CDN für schnelle Ladezeiten weltweit",
        "10 GB Storage für Bilder, Downloads und kleine Videos",
        "SEO-Optimierungen für bessere Auffindbarkeit",
        "Basic Security Monitoring",
        "Änderungen jederzeit durch unser Team möglich"
      ],
      cta: "Einfach online bleiben",
      highlighted: false,
      details: [
        { label: "Hosting", value: "Statische Website" },
        { label: "CMS", value: "Nicht enthalten" },
        { label: "SEO", value: "Optimiert" },
        { label: "Reaktionszeit", value: "3-5 Werktage" },
        { label: "Stundensatz", value: "100 €/h", emphasized: true }
      ]
    },
    {
      name: "CMS Care",
      priceCents: 9990,
      badge: "Beliebte Wahl",
      description: "Für Teams, die Inhalte selbst ändern und unabhängiger von laufender Entwicklung bleiben möchten.",
      features: [
        "Concrete CMS inklusive",
        "Texte, Bilder und vorbereitete Module selbst pflegen",
        "2 CMS-Nutzer enthalten",
        "Managed Hosting inklusive",
        "Keine separate Hosting-Gebühr. Deine Website läuft betreut in unserer Infrastruktur.",
        "Erweiterte SEO-Optimierungen für CMS-Inhalte",
        "Updates, Backups und CMS-Betrieb inklusive",
        "Reduzierter Stundensatz für Weiterentwicklung"
      ],
      cta: "Selbst Inhalte pflegen",
      highlighted: false,
      details: [
        { label: "Hosting", value: "Managed CMS" },
        { label: "Hosting-Gebühr", value: "Inklusive" },
        { label: "CMS", value: "2 Nutzer" },
        { label: "SEO", value: "Erweitert" },
        { label: "Reaktionszeit", value: "1-2 Werktage" },
        { label: "Stundensatz", value: "100 €/h", emphasized: true }
      ]
    },
    {
      name: "Growth Care",
      priceCents: 12490,
      badge: "Empfohlen",
      description: "Für Unternehmen und Agenturen, die ihre Website laufend erweitern und Entwicklungskosten senken wollen.",
      features: [
        "Alles aus CMS Care",
        "5 CMS-Nutzer enthalten",
        "Managed Hosting inklusive",
        "Keine separate Hosting-Gebühr. Deine Website läuft betreut in unserer Infrastruktur.",
        "Priorisierte Betreuung für laufende Änderungen",
        "Ideal für Video Hosting und höhere Besucherzahlen",
        "Mehrsprachigkeit für internationale Websites",
        "Google Analytics Integration direkt im Dashboard",
        "Erweiterte SEO-Struktur für Kampagnen und Landingpages",
        "Integration und Betreuung zusätzlicher API-Schnittstellen möglich",
        "Self-Hosting auf Anfrage möglich",
        "KI-gestützte, agentic Workflows bevorzugt verfügbar"
      ],
      cta: "Flexibel wachsen",
      highlighted: true,
      details: [
        { label: "Hosting", value: "Managed CMS" },
        { label: "Hosting-Gebühr", value: "Inklusive" },
        { label: "CMS", value: "5 Nutzer" },
        { label: "SEO", value: "Advanced" },
        { label: "Reaktionszeit", value: "Innerhalb von 24 Stunden" },
        { label: "Stundensatz", value: "80 €/h", emphasized: true }
      ]
    }
  ];

  const faqs = [
    {
      q: "Was ist Concrete CMS?",
      a: "Concrete CMS ist unser Managed CMS auf Basis von Payload CMS und Next.js. Es wurde entwickelt, damit Websites nach dem Launch einfach gepflegt, erweitert und technisch betreut werden können."
    },
    {
      q: "Warum Concrete CMS statt WordPress?",
      a: "Concrete CMS ist bewusst schlanker und kontrollierter aufgebaut. Du bekommst genau die Inhalte, Module und Bearbeitungsmöglichkeiten, die deine Website braucht, ohne ein schweres Plugin-System pflegen zu müssen. Das macht die Bedienung einfacher und reduziert typische Sicherheitsrisiken, weil weniger fremde Erweiterungen, weniger Wartungsaufwand und weniger Angriffsfläche im laufenden Betrieb entstehen."
    },
    {
      q: "Was ist der Unterschied zwischen Static Care und den CMS-Paketen?",
      a: "Static Care hält eine fertige Website schnell und sicher online, enthält aber kein CMS zur Selbstpflege. CMS Care ergänzt Concrete CMS, damit du Inhalte selbst bearbeiten kannst. Growth Care ist für Websites gedacht, die regelmäßig erweitert werden."
    },
    {
      q: "Kann ich meine Website selbst bearbeiten?",
      a: "Ja, in den CMS-Paketen kannst du je nach Aufbau Texte, Bilder, Seitenbereiche, Module und strukturierte Inhalte direkt im CMS pflegen. Dadurch muss nicht jede kleine Änderung als Entwicklungsaufgabe geplant werden."
    },
    {
      q: "Kann ich Concrete CMS mit jeder bestehenden Website verwenden?",
      a: "Leider nicht als direkte Erweiterung für bestehende WordPress-Seiten oder bereits laufende Projekte. Concrete CMS ist ein maßgeschneidertes, optionales System für Concrete Kund:innen und wird im Rahmen neuer Website-Projekte konzipiert, die neu entwickelt und designed werden."
    },
    {
      q: "Was passiert, wenn ich Hilfe bei Änderungen brauche?",
      a: "Dann übernehmen wir die Anpassungen für dich. Je nach Paket profitierst du von reduzierten Entwicklerstundensätzen: 100 €/h in Static Care, 100 €/h in CMS Care und 80 €/h in Growth Care."
    },
    {
      q: "Was macht Concrete CMS besonders in der langfristigen Zusammenarbeit mit Concrete?",
      a: "Concrete CMS ist technisch deutlich weiterentwickelter als eine klassische WordPress-Lösung und auf langfristige Weiterentwicklung ausgelegt. Besonders in CMS Care und Growth Care können neue Inhalte, Module und Funktionen durch moderne KI-Workflows effizienter umgesetzt werden. Dadurch sinken zusätzliche Entwicklerkosten und Entwicklungszeiten deutlich. Als Agentur können wir direkt im CMS gestalten, erweitern und optimieren, ohne für jede Anpassung separate Entwicklerleistungen einkaufen zu müssen."
    },
    {
      q: "Wie unterscheiden sich die SEO-Optimierungen?",
      a: "Static Care kommt mit technischer Basis-SEO für bessere Auffindbarkeit: schnelle Ladezeiten, indexierbare Seiten, saubere Metadaten und stabile statische Auslieferung. CMS Care erweitert das um pflegbare SEO-Felder für Seiten und Inhalte. Growth Care ergänzt eine stärkere Struktur für Landingpages, Kampagnen, Analytics-Auswertung und laufende Optimierungen."
    },
    {
      q: "Wo wird meine Website gehostet?",
      a: "Auf Wunsch hosten wir deine Website DSGVO-konform auf VPS-Servern in Deutschland oder innerhalb Europas, zum Beispiel über Hetzner-Infrastruktur. Damit bleiben Hosting, Betrieb und technische Betreuung klar nachvollziehbar und für Datenschutzanforderungen im europäischen Raum geeignet."
    },
    {
      q: "Ist Hosting in CMS Care und Growth Care enthalten?",
      a: "Ja. In CMS Care und Growth Care ist das Managed Hosting bereits in der monatlichen Subscription enthalten. Es gibt keine separate Hosting-Gebühr. Wir übernehmen Betrieb, technische Betreuung und CMS-Bereitstellung, damit du dich nicht selbst um Server, Wartung oder Infrastrukturkosten kümmern musst."
    },
    {
      q: "Kann ich Concrete CMS auch selbst hosten?",
      a: "Ja, Self-Hosting ist grundsätzlich möglich. In diesem Fall läuft Concrete CMS über eine Lizenzvereinbarung und einen aktiven Lizenz-Key. Das CMS kann auf einem eigenen Server genutzt werden, solange eine aktive CMS Care oder Growth Care Subscription besteht. Wichtig: Self-Hosting ersetzt nicht die Subscription. Nach einer Kündigung kann die Website weiterhin als statische Version selbst gehostet werden, der Zugriff auf die CMS-Oberfläche und die laufende CMS-Betreuung sind dann aber nicht mehr enthalten."
    },
    {
      q: "Bin ich an euch gebunden?",
      a: "Nein. Deine Website gehört dir. Das laufende CMS, Hosting und die technische Betreuung sind unsere Serviceleistung, aber du bekommst bei einer Kündigung einen statischen Export deiner Website."
    },
    {
      q: "Was passiert, wenn ich kündige?",
      a: "Du kannst monatlich kündigen. Wenn du ein CMS-Paket beendest, erhältst du einen statischen Export deiner Website, den du bei uns im Static Care Paket oder bei einem anderen Anbieter weiter hosten kannst."
    },
    {
      q: "Welches Paket ist das richtige für mich?",
      a: "Static Care passt, wenn deine Website fertig ist, sicher online bleiben und besser auffindbar sein soll. CMS Care ist die beste Wahl, wenn dein Team Inhalte selbst pflegen möchte. Growth Care empfehlen wir, wenn du regelmäßig neue Inhalte, Landingpages, Video-Inhalte oder Funktionen planst."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] font-sans selection:bg-[#E65F2B] selection:text-white flex flex-col justify-between">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF9F6]/80 border-b border-black/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center group">
            <img src={logoImg} alt="Concrete CMS Logo" className="h-8 sm:h-12 w-auto max-w-[150px] sm:max-w-[200px] object-contain transition-transform group-hover:scale-105" />
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider font-semibold">
            <a href="#pricing" className="hover:text-[#E65F2B] transition-colors">Care-Pläne</a>
            <a href="#faq" className="hover:text-[#E65F2B] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#pricing" 
              className="bg-[#121212] hover:bg-[#E65F2B] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all hover:scale-105 duration-300 inline-block shadow-sm whitespace-nowrap"
            >
              Pläne ansehen
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
            CARE Pakete für deine Website
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-normal uppercase tracking-normal leading-[0.95] sm:leading-[0.9] text-[#121212] mb-8">
            <span className="sm:hidden">
              Deine neue<br />
              Webseite<br />
              bleibt schnell,<br />
              sicher und<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#121212] via-[#5F5F5F] to-[#E65F2B]">
                erweiterbar.
              </span>
            </span>
            <span className="hidden sm:inline">
              Deine neue Webseite bleibt schnell,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#121212] via-[#5F5F5F] to-[#E65F2B]">
                sicher und erweiterbar.
              </span>
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#5F5F5F] font-sans font-normal leading-relaxed mb-12">
            Ein modernes CMS für Websites, die nach dem Launch weiter wachsen. Hosting, Betreuung, Updates und flexible Weiterentwicklung in einem monatlichen Paket.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto bg-[#E65F2B] hover:bg-[#d04e1c] text-white px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 duration-300 flex items-center justify-center gap-2"
            >
              Care-Pläne ansehen <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* CMS Simplicity Section */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] text-[#121212] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
            <div>
              <span className="text-[#E65F2B] uppercase tracking-widest font-mono text-xs font-bold block mb-4">Einfach selbst pflegen</span>
              <h2 className="text-3xl sm:text-5xl font-display font-normal uppercase tracking-normal leading-tight mb-6">
                Content ändern, ohne WordPress-Chaos.
              </h2>
              <p className="text-[#5F5F5F] text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Concrete CMS zeigt deinem Team nur die Inhalte, Seiten und Module, die wirklich gebraucht werden. Texte, Bilder, Seitenstrukturen und Medien lassen sich kontrolliert bearbeiten, ohne dass ein komplexes Plugin-System gepflegt werden muss.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Klare Felder statt überladener Admin-Oberflächen",
                  "Vorbereitete Module für wiederkehrende Inhalte",
                  "Bild- und Medienpflege direkt im Workflow",
                  "Weniger Angriffsfläche durch kontrollierte Erweiterungen"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-[#121212]">
                    <Check className="w-4 h-4 text-[#E65F2B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://payloadcms.com/use-cases/headless-cms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-8 bg-[#121212] hover:bg-[#E65F2B] text-white px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all hover:scale-105 duration-300"
              >
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#E65F2B]/10 blur-3xl opacity-70" />
              <img
                src={cmsCollageImg}
                alt="Concrete CMS Oberfläche mit visueller Inhaltsbearbeitung, Seitenstruktur und Medienverwaltung"
                className="relative w-full rounded-[28px] border border-black/10 shadow-2xl shadow-black/20 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (THE HERO OF THE PAGE) */}
      <section id="pricing" className="py-24 bg-[#121212] text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(230,95,43,0.06),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#E65F2B] uppercase tracking-widest font-mono text-xs font-bold block mb-4">Website Operations</span>
            <h2 className="text-3xl sm:text-5xl font-display font-normal uppercase tracking-normal mb-6">
              Static Care ist Hosting. CMS Care ist Kontrolle. Growth Care ist Wachstum.
            </h2>
            <p className="text-[#A0A0A0] font-sans text-sm sm:text-base leading-relaxed">
              Wähle den Plan, der zu deinem Änderungsbedarf passt. Du kaufst nicht nur Serverplatz, sondern Sicherheit, Flexibilität, Support und niedrigere Weiterentwicklungskosten.
            </p>
          </div>

          <div className="mb-12 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-4 rounded-full bg-white/5 border border-white/10 px-4 py-3">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-colors ${
                  !isYearly ? "text-white" : "text-[#A0A0A0] hover:text-white"
                }`}
              >
                Monatlich
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={isYearly}
                aria-label="Zwischen monatlicher und jährlicher Zahlung wechseln"
                onClick={() => setBillingCycle(isYearly ? "monthly" : "yearly")}
                className={`relative h-8 w-16 rounded-full border transition-colors ${
                  isYearly ? "bg-[#E65F2B] border-[#E65F2B]" : "bg-black/40 border-white/10"
                }`}
              >
                <span
                  className={`absolute left-0 top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                    isYearly ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-colors ${
                  isYearly ? "text-white" : "text-[#A0A0A0] hover:text-white"
                }`}
              >
                Jährlich
              </button>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#E65F2B] font-bold">
              Jährlich bis zu 120 € sparen.
            </span>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              const displayPrice = formatPrice(plan.priceCents - (isYearly ? yearlyDiscountCents : 0));
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
                      <span className="text-[#E65F2B] font-mono text-xs uppercase tracking-widest font-semibold">{plan.name}</span>
                      <div className="flex items-baseline gap-2 mt-3 mb-4">
                        <span className="font-sans font-extrabold tracking-tight">
                          <span className="text-5xl sm:text-6xl">€{displayPrice.euros}</span>
                          <sup className="align-super text-xl sm:text-2xl ml-1">,{displayPrice.cents}</sup>
                        </span>
                        <span className="text-[#A0A0A0] text-xs font-mono uppercase tracking-wider">/ Monat</span>
                      </div>
                      <p className="text-xs text-[#A0A0A0] uppercase font-mono tracking-wider font-semibold border-b border-white/5 pb-4 mb-4 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#E65F2B]" /> {isYearly ? "Jährliche Zahlung" : "Monatlich kündbar"}
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
                      {plan.details.map((detail) => (
                        <div key={detail.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-xs font-mono">
                          <span className="text-[#A0A0A0]">{detail.label}:</span>
                          <span className={`${detail.emphasized ? 'text-[#E65F2B]' : 'text-white'} font-semibold text-right`}>
                            {detail.value}
                          </span>
                        </div>
                      ))}
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

          {/* Trust and value box */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
            <div className="bg-[#181818] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#E65F2B]/10 border border-[#E65F2B]/20 flex items-center justify-center text-[#E65F2B] shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-normal uppercase tracking-normal text-lg">Monatlich kündbar. Deine Website bleibt deine Website.</h4>
                <p className="text-xs sm:text-sm text-[#A0A0A0] mt-2 leading-relaxed">
                  Du kannst dein Paket jederzeit monatlich kündigen. Wenn du ein CMS-Paket beendest, erhältst du einen statischen Export deiner Website, den du überall weiter hosten kannst. CMS, Bearbeitung und laufende Betreuung sind Teil des aktiven Managed Services.
                </p>
              </div>
            </div>
            <div className="bg-[#E65F2B] text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-white/75">Kostenhebel</span>
              <p className="font-display text-xl sm:text-2xl font-normal uppercase tracking-normal leading-tight">
                Schon ab ca. 1,5 Stunden Weiterentwicklung pro Monat lohnt sich Growth Care gegenüber dem regulären Stundensatz.
              </p>
              <a
                href="#pricing"
                onClick={() => setSelectedPlan("Growth Care")}
                className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-[#FAF9F6] px-5 py-3 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all self-start hover:scale-105 duration-300"
              >
                Growth ansehen <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Technical Accordion FAQ */}
      <section id="faq" className="py-24 bg-[#FAF9F6] text-[#121212] relative">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-[#E65F2B] uppercase tracking-widest font-mono text-xs font-bold block mb-4">Transparenz</span>
            <h2 className="text-3xl sm:text-4xl font-display font-normal uppercase tracking-normal">
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
                      isOpen ? 'max-h-[620px] border-t border-black/5' : 'max-h-0'
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
          <span className="text-[#E65F2B] uppercase tracking-widest font-mono text-xs font-bold block mb-4">Weiter wachsen</span>
          <h2 className="text-3xl sm:text-5xl font-display font-normal uppercase tracking-normal mb-8">
            Bereit für eine Website, die nach dem Launch weiter wächst?
          </h2>
          <p className="max-w-xl mx-auto text-[#A0A0A0] text-xs sm:text-sm leading-relaxed mb-12">
            Betrieb, CMS, Support und flexible Weiterentwicklung in einem monatlichen Plan. Du bleibst unabhängig und kannst genau dort investieren, wo deine Website wachsen soll.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              onClick={() => setSelectedPlan("Growth Care")}
              className="w-full sm:w-auto bg-[#E65F2B] hover:bg-[#d04e1c] text-white px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:scale-105 duration-300"
            >
              Care-Pläne vergleichen
            </a>
            <a href="#faq" className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-colors">
              Fragen klären
            </a>
          </div>
        </div>
      </section>

      {/* Architectural Footer */}
      <footer className="bg-black text-[#A0A0A0] border-t border-white/5 py-12 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={concreteFooterLogoImg} alt="Concrete CMS Logo" className="h-5 w-auto opacity-90 invert" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Concrete CMS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-mono text-[10px] uppercase tracking-widest">
            <a href="#pricing" className="hover:text-white transition-colors">Care-Pläne</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="https://www.concrete-designs.de/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Concrete Designs</a>
          </div>
          <div className="text-[10px] font-mono tracking-wider">
            © {new Date().getFullYear()} Concrete CMS. CARE Pakete für deine Website.
          </div>
        </div>
      </footer>

    </div>
  );
}
