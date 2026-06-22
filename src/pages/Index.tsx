import { useState, useEffect, useRef } from "react";
import HeroSection, { NAV_ITEMS } from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactsSection from "@/components/sections/ContactsSection";
import CallbackWidget from "@/components/CallbackWidget";

const SEND_ORDER_URL =
  "https://functions.poehali.dev/85f005a0-449a-4c18-ab87-11e17bfd6b08";

const STATS = [
  { num: "17", suffix: "лет", label: "на рынке" },
  { num: "1200", suffix: "+", label: "завершённых проектов" },
  { num: "340", suffix: "", label: "постоянных клиентов" },
  { num: "98", suffix: "%", label: "соблюдение сроков" },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [counters, setCounters] = useState<number[]>(STATS.map(() => 0));
  const [countersStarted, setCountersStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calc, setCalc] = useState({
    service: "casting",
    basePrice: 8000,
    material: "rubber",
    materialMult: 1.0,
    qty: 10,
    urgency: "normal",
    urgencyMult: 1.0,
  });
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0-init");
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      NAV_ITEMS.forEach(({ href }) => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) setActiveNav(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = STATS.map((s) => parseInt(s.num.replace(/\D/g, "")) || 0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
          const duration = 1600;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounters(targets.map((t) => Math.round(t * ease)));
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.4 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  useEffect(() => {
    const phrase = "UNIT-2211 / ТЕХНОЛОГИЧЕСКОЕ БЮРО";
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedText(phrase.slice(0, i));
      if (i >= phrase.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent, file: File | null) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      let fileBase64 = null;
      let fileName = null;
      if (file) {
        const buf = await file.arrayBuffer();
        fileBase64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        fileName = file.name;
      }
      await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, fileBase64, fileName }),
      });
    } catch (_e) {
      /* ignore */
    }
    setFormLoading(false);
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection
        activeNav={activeNav}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        typedText={typedText}
        counters={counters}
        statsRef={statsRef}
        scrollTo={scrollTo}
      />
      <PortfolioSection
        lightbox={lightbox}
        setLightbox={setLightbox}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
        calc={calc}
        setCalc={setCalc}
      />
      <ContactsSection
        formData={formData}
        setFormData={setFormData}
        formSent={formSent}
        setFormSent={setFormSent}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        scrollTo={scrollTo}
      />
      <CallbackWidget />
    </div>
  );
}