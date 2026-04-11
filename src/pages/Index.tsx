import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/4b05eb97-3337-4fdf-8bad-fc6a58eb2515.jpg";
const BLUEPRINT_IMG = "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/9c35da5b-5afd-4a26-a89b-4c1d4bd6bab6.jpg";
const RUBBER_PARTS_IMG = "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/5fb1980b-7d0f-485a-a569-bcb6af4b18cc.jpg";
const CASTING_IMG = "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/7b456b49-208a-4626-8607-bf5e013546be.jpg";

const SEND_ORDER_URL = "https://functions.poehali.dev/85f005a0-449a-4c18-ab87-11e17bfd6b08";

const PHONE = "+7 (961) 800-22-11";
const PHONE_CLEAN = "+79618002211";
const EMAIL = "Up8002211@yandex.ru";

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Технологии", href: "#technologies" },
  { label: "Производство", href: "#production" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Settings2", num: "01", title: "Металлообработка", desc: "Токарные, фрезерные и шлифовальные работы. Любые партии от единичных изделий." },
  { icon: "Cpu", num: "02", title: "ЧПУ-обработка", desc: "3-осевые обрабатывающие центры, листовой металл любой конфигурации." },
  { icon: "FlaskConical", num: "03", title: "Литьё в силиконовые формы", desc: "Изготовление опытных партий и серийных изделий методом литья в силиконовые формы." },
  { icon: "Printer", num: "04", title: "3D-печать и сканирование", desc: "Прототипирование, 3D-сканирование деталей, обратный инжиниринг для любых задач." },
  { icon: "Zap", num: "05", title: "Вулканизация РТИ и литьё пластмасс", desc: "Производство резинотехнических изделий, литьё пластмасс под давлением." },
  { icon: "Layers", num: "06", title: "Прессформы и литьё полиуретана", desc: "Проектирование и изготовление прессформ, литьё полиуретановых изделий любой сложности." },
];

const TECHNOLOGIES = [
  {
    name: "Литьё в силиконовые формы",
    spec: "мелкосерийное производство",
    desc: "Позволяет быстро получить точные копии деталей из полиуретана, эпоксидных смол и других материалов. Идеально для опытных образцов и мелких серий — от 1 до 500 штук.",
    img: CASTING_IMG,
  },
  {
    name: "3D-печать и сканирование",
    spec: "FDM, SLA, SLS",
    desc: "Создание прототипов за 1–3 дня. 3D-сканирование позволяет точно воспроизвести любую деталь без чертежей — достаточно принести образец.",
    img: BLUEPRINT_IMG,
  },
  {
    name: "Вулканизация РТИ",
    spec: "резинотехнические изделия",
    desc: "Производство уплотнителей, прокладок, манжет, муфт и других резинотехнических изделий. Работаем с любыми марками резины под конкретные условия эксплуатации.",
    img: RUBBER_PARTS_IMG,
  },
  {
    name: "Литьё пластмасс под давлением",
    spec: "серийное производство",
    desc: "Изготовление пластиковых деталей на термопластавтоматах. Собственный инструментальный цех — делаем пресс-формы и сразу запускаем серию.",
    img: CASTING_IMG,
  },
  {
    name: "Проектирование и изготовление прессформ",
    spec: "сталь, алюминий",
    desc: "Полный цикл: от разработки конструкции в CAD до изготовления и испытания пресс-формы. Собственное КБ и ЧПУ-оборудование.",
    img: BLUEPRINT_IMG,
  },
  {
    name: "Литьё полиуретановых изделий",
    spec: "твёрдость Shore 10A–90D",
    desc: "Колёса, ролики, буферы, накладки, прокладки из полиуретана. Стойкость к износу в 5–10 раз выше, чем у резины.",
    img: RUBBER_PARTS_IMG,
  },
];

const STATS = [
  { num: "17", suffix: "лет", label: "на рынке" },
  { num: "1200", suffix: "+", label: "завершённых проектов" },
  { num: "340", suffix: "", label: "постоянных клиентов" },
  { num: "98", suffix: "%", label: "соблюдение сроков" },
];

const PORTFOLIO = [
  { title: "Силиконовые уплотнители", category: "Литьё в силиконовые формы", year: "2024", img: RUBBER_PARTS_IMG },
  { title: "Прессформа для крышки", category: "Изготовление прессформ", year: "2023", img: BLUEPRINT_IMG },
  { title: "Полиуретановые ролики", category: "Литьё полиуретана", year: "2023", img: CASTING_IMG },
  { title: "Прототип корпуса", category: "3D-печать", year: "2022", img: BLUEPRINT_IMG },
  { title: "Резиновые прокладки РТИ", category: "Вулканизация РТИ", year: "2022", img: RUBBER_PARTS_IMG },
  { title: "Пластиковые детали серия", category: "Литьё пластмасс", year: "2021", img: CASTING_IMG },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name: "", company: "", phone: "", email: "", material: "", quantity: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      { threshold: 0.15 }
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

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) setUploadedFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (_e) { /* ignore network errors */ }
    setFormLoading(false);
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange flex items-center justify-center flex-shrink-0">
              <span className="font-oswald font-bold text-primary-foreground text-sm leading-none">ТБ</span>
            </div>
            <div>
              <div className="font-oswald text-lg font-semibold tracking-wider text-foreground leading-none">
                ТБ <span className="text-orange">№2211</span>
              </div>
              <div className="tech-label" style={{ fontSize: "0.55rem" }}>технологическое бюро</div>
            </div>
          </div>

          <ul className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className={`font-ibm text-xs tracking-widest uppercase transition-colors duration-200 ${activeNav === href.replace("#", "") ? "text-orange" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <a
            href={`tel:${PHONE_CLEAN}`}
            className="hidden lg:flex items-center gap-2 bg-orange text-primary-foreground px-4 py-2 font-oswald text-sm tracking-wider hover:bg-orange/90 transition-colors"
          >
            <Icon name="Phone" size={14} />
            {PHONE}
          </a>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="w-full text-left px-6 py-3 text-sm border-b border-border hover:text-orange transition-colors font-ibm tracking-wider"
              >
                {label}
              </button>
            ))}
            <div className="flex gap-3 px-6 py-4">
              <a href={`tel:${PHONE_CLEAN}`} className="flex-1 bg-orange text-primary-foreground py-3 text-center font-oswald text-sm tracking-wider">
                {PHONE}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-14">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-blueprint opacity-60" />

        <div className="absolute top-20 left-6 w-12 h-12 border-t-2 border-l-2 border-orange/50" />
        <div className="absolute top-20 right-6 w-12 h-12 border-t-2 border-r-2 border-orange/50" />
        <div className="absolute bottom-8 left-6 w-12 h-12 border-b-2 border-l-2 border-orange/50" />
        <div className="absolute bottom-8 right-6 w-12 h-12 border-b-2 border-r-2 border-orange/50" />

        <div className="absolute left-[52%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange/20 to-transparent hidden lg:block" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="tech-label mb-4 opacity-0-init reveal delay-100">// UNIT-2211 / ТЕХНОЛОГИЧЕСКОЕ БЮРО</div>

            <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6 opacity-0-init reveal delay-200">
              ТЕХНО
              <br />
              <span className="text-orange">ЛОГИ</span>ЧЕСКОЕ
              <br />
              БЮРО <span className="text-orange">№2211</span>
            </h1>

            <p className="font-ibm text-xl text-foreground/90 mb-8 max-w-xl leading-relaxed opacity-0-init reveal delay-300">
              Инженерные решения полного цикла: от технического задания до серийного производства. Изготовление любой серии — от 1 штуки. Помогаем выбрать оптимальную технологию производства под вашу задачу.
            </p>

            {/* Контакты на герое — максимально заметные */}
            <div className="flex flex-wrap gap-3 mb-8 opacity-0-init reveal delay-350">
              <a
                href={`tel:${PHONE_CLEAN}`}
                className="flex items-center gap-2 bg-orange text-primary-foreground px-5 py-3 font-oswald text-xl tracking-wider hover:bg-orange/90 transition-all"
              >
                <Icon name="Phone" size={20} />
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 border border-orange text-orange px-5 py-3 font-ibm text-base hover:bg-orange hover:text-primary-foreground transition-all"
              >
                <Icon name="Mail" size={18} />
                {EMAIL}
              </a>
            </div>

            {/* Мессенджеры */}
            <div className="flex gap-3 mb-10 opacity-0-init reveal delay-400">
              <a
                href={`https://t.me/${PHONE_CLEAN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#229ED9] text-white px-4 py-2 font-oswald text-sm tracking-wider hover:bg-[#1a8bbf] transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
                Telegram
              </a>
              <a
                href={`https://wa.me/${PHONE_CLEAN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 font-oswald text-sm tracking-wider hover:bg-[#1eab52] transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-4 mb-12 opacity-0-init reveal delay-450">
              <button
                onClick={() => scrollTo("#calculator")}
                className="flex items-center gap-2 border border-border px-6 py-3 font-oswald text-sm tracking-wider hover:border-orange hover:text-orange transition-all hover:gap-3"
              >
                <Icon name="Calculator" size={16} />
                РАССЧИТАТЬ СТОИМОСТЬ
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0-init reveal delay-500">
              {STATS.map((s, i) => (
                <div key={i} className="border border-border bg-card/60 backdrop-blur p-4">
                  <div className="font-oswald text-3xl font-bold text-orange leading-none">
                    {s.num}<span className="text-xl">{s.suffix}</span>
                  </div>
                  <div className="tech-label mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="tech-label">SCROLL</div>
          <div className="w-px h-12 bg-gradient-to-b from-orange to-transparent" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative bg-card/30">
        <div className="absolute inset-0 bg-blueprint-sm" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tech-label mb-3 reveal opacity-0-init">// О КОМПАНИИ</div>
              <h2 className="font-oswald text-4xl md:text-5xl mb-6 reveal opacity-0-init delay-100">
                ЗА ЧИСЛАМИ —<br /><span className="text-orange">ИНЖЕНЕРНАЯ</span><br />ФИЛОСОФИЯ
              </h2>
              <div className="space-y-4 font-ibm text-muted-foreground leading-relaxed reveal opacity-0-init delay-200">
                <p>Технологическое Бюро №2211 — берёмся за самые сложные проекты и любую серию. Для нас нет слишком маленьких или слишком нестандартных задач.</p>
                <p>Собственный конструкторский отдел, парк высокоточного оборудования и опытная производственная команда позволяют нам выполнять заказы любой сложности — от опытного образца до серийного производства.</p>
              </div>
              <div className="mt-8 space-y-3 reveal opacity-0-init delay-300">
                {[
                  "Производство от 1 штуки до крупной серии",
                  "Собственное КБ — полный проектный цикл",
                  "Работаем с любыми материалами",
                  "Поставки по всей России и СНГ",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-orange flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={12} className="text-orange" />
                    </div>
                    <span className="font-ibm text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative reveal opacity-0-init delay-200">
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src={RUBBER_PARTS_IMG} alt="Изделия из резины и пластмассы" className="w-full h-full object-cover" />
                <div className="absolute inset-0 border border-orange/30" />
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-orange" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-orange" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange text-primary-foreground p-6 w-48">
                <div className="font-oswald text-4xl font-bold">№2211</div>
                <div className="font-ibm text-xs mt-1 font-light">технологическое<br />бюро</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative">
        <div className="container relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="tech-label mb-3 reveal opacity-0-init">// УСЛУГИ</div>
              <h2 className="font-oswald text-4xl md:text-5xl reveal opacity-0-init delay-100">
                ЧТО МЫ<br /><span className="text-orange">ПРОИЗВОДИМ</span>
              </h2>
            </div>
            <div className="hidden lg:block font-mono text-muted-foreground/30 text-xs text-right reveal opacity-0-init delay-200">
              SERVICES_LIST<br />
              VERSION: 2024.1<br />
              COUNT: 06
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="bg-background p-8 card-hover border border-transparent relative group cursor-default"
              >
                <div className="absolute top-4 right-4 font-mono text-muted-foreground/20 text-xs">{s.num}</div>
                <div className="w-12 h-12 border border-border group-hover:border-orange transition-colors mb-5 flex items-center justify-center">
                  <Icon name={s.icon} size={22} className="text-orange" />
                </div>
                <h3 className="font-oswald text-xl mb-3 group-hover:text-orange transition-colors tracking-wide">{s.title}</h3>
                <p className="font-ibm text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-orange opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="tech-label">ПОДРОБНЕЕ</span>
                  <Icon name="ArrowRight" size={12} className="text-orange" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section id="technologies" className="py-24 relative bg-card/30">
        <div className="absolute inset-0 bg-blueprint-sm" />
        <div className="container relative z-10">
          <div className="tech-label mb-3 reveal opacity-0-init">// ТЕХНОЛОГИИ</div>
          <h2 className="font-oswald text-4xl md:text-5xl mb-4 reveal opacity-0-init delay-100">
            ИНЖЕНЕРНЫЕ<br /><span className="text-orange">ВОЗМОЖНОСТИ</span>
          </h2>
          <p className="font-ibm text-base text-muted-foreground mb-12 max-w-xl reveal opacity-0-init delay-200">
            Полный спектр технологий для производства резиновых, пластиковых и полиуретановых изделий — от единичного прототипа до серии.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNOLOGIES.map((t, i) => (
              <div key={i} className="border border-border bg-background card-hover group reveal opacity-0-init" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="tech-label text-orange">{t.spec}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-oswald text-lg mb-2 group-hover:text-orange transition-colors">{t.name}</h3>
                  <p className="font-ibm text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTION */}
      <section id="production" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint" />
        <div className="container relative z-10">
          <div className="tech-label mb-3 reveal opacity-0-init">// ПРОИЗВОДСТВО</div>
          <h2 className="font-oswald text-4xl md:text-5xl mb-12 reveal opacity-0-init delay-100">
            КАК МЫ<br /><span className="text-orange">РАБОТАЕМ</span>
          </h2>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange via-orange/50 to-transparent hidden md:block" />
            <div className="space-y-0">
              {[
                { step: "01", title: "Получение задания", desc: "Принимаем техническое задание, чертежи или описание — в любом формате. Наши инженеры изучают задачу и готовят коммерческое предложение в течение 24 часов." },
                { step: "02", title: "Проектирование и КМД", desc: "Конструкторский отдел разрабатывает рабочую документацию, 3D-модели и технологические карты. Согласование с заказчиком на каждом этапе." },
                { step: "03", title: "Производство", desc: "Изготовление в собственных цехах с контролем качества на каждой операции. Применяем современное оборудование ведущих мировых производителей." },
                { step: "04", title: "Контроль качества", desc: "Метрологический контроль размеров, испытания изделий, документирование результатов. Каждая партия проверяется перед отгрузкой." },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 md:gap-16 items-start group reveal opacity-0-init" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex-shrink-0 flex flex-col items-center relative w-12">
                    <div className="w-12 h-12 border-2 border-orange bg-background flex items-center justify-center z-10 group-hover:bg-orange transition-colors">
                      <span className="font-mono text-xs text-orange group-hover:text-primary-foreground transition-colors">{item.step}</span>
                    </div>
                    {i < 3 && <div className="w-px flex-1 bg-border min-h-12" />}
                  </div>
                  <div className="pb-12 pt-2 flex-1">
                    <h3 className="font-oswald text-2xl mb-2 group-hover:text-orange transition-colors">{item.title}</h3>
                    <p className="font-ibm text-sm text-muted-foreground leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 relative bg-card/30">
        <div className="absolute inset-0 bg-blueprint-sm" />
        <div className="container relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="tech-label mb-3 reveal opacity-0-init">// ПОРТФОЛИО</div>
              <h2 className="font-oswald text-4xl md:text-5xl reveal opacity-0-init delay-100">
                РЕАЛИЗОВАННЫЕ<br /><span className="text-orange">ПРОЕКТЫ</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.map((p, i) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-pointer reveal opacity-0-init"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setLightbox(p.img)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="tech-label mb-1">{p.category} · {p.year}</div>
                  <h3 className="font-oswald text-lg text-foreground">{p.title}</h3>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-orange flex items-center justify-center">
                    <Icon name="ZoomIn" size={14} className="text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-orange/0 group-hover:border-orange/60 transition-colors duration-300" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-orange/0 group-hover:border-orange/60 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 relative bg-card/50">
        <div className="absolute inset-0 bg-blueprint" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="tech-label mb-3 text-center reveal opacity-0-init">// РАСЧЁТ СТОИМОСТИ</div>
            <h2 className="font-oswald text-4xl md:text-5xl text-center mb-3 reveal opacity-0-init delay-100">
              КАЛЬКУЛЯТОР<br /><span className="text-orange">ПРОИЗВОДСТВА</span>
            </h2>
            <p className="font-ibm text-sm text-muted-foreground text-center mb-12 reveal opacity-0-init delay-200">
              Заполните форму и прикрепите чертежи — мы рассчитаем стоимость в течение 24 часов
            </p>

            {!formSent ? (
              <form onSubmit={handleSubmit} className="space-y-4 reveal opacity-0-init delay-200">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="tech-label block mb-2">ИМЯ</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Петров"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="tech-label block mb-2">КОМПАНИЯ</label>
                    <input
                      type="text"
                      placeholder="ООО «Название»"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="tech-label block mb-2">ТЕЛЕФОН</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (000) 000-00-00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="tech-label block mb-2">EMAIL</label>
                    <input
                      type="email"
                      placeholder="email@company.ru"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="tech-label block mb-2">МАТЕРИАЛ</label>
                    <select
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors text-foreground"
                    >
                      <option value="">Выберите материал</option>
                      <option>Резина / РТИ</option>
                      <option>Силикон</option>
                      <option>Полиуретан</option>
                      <option>Пластик</option>
                      <option>Металл</option>
                      <option>Другой материал</option>
                    </select>
                  </div>
                  <div>
                    <label className="tech-label block mb-2">КОЛИЧЕСТВО</label>
                    <input
                      type="text"
                      placeholder="Кол-во штук / тонн / м²"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="tech-label block mb-2">ОПИСАНИЕ ЗАДАЧИ</label>
                  <textarea
                    placeholder="Опишите задачу, требования, сроки..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                    className="w-full bg-background border border-border px-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="tech-label block mb-2">ЧЕРТЕЖИ / ТЕХЗАДАНИЕ</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border border-dashed border-border hover:border-orange transition-colors p-8 text-center cursor-pointer group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.jpg,.png,.zip"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {uploadedFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 border border-orange flex items-center justify-center">
                          <Icon name="FileCheck" size={16} className="text-orange" />
                        </div>
                        <div>
                          <div className="font-ibm text-sm text-orange">{uploadedFile.name}</div>
                          <div className="tech-label">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} МБ
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                          className="ml-4 text-muted-foreground hover:text-foreground"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="w-12 h-12 border border-border group-hover:border-orange transition-colors flex items-center justify-center mx-auto mb-4">
                          <Icon name="Upload" size={22} className="text-muted-foreground group-hover:text-orange transition-colors" />
                        </div>
                        <div className="font-ibm text-sm text-muted-foreground mb-2">
                          Перетащите файл или нажмите для выбора
                        </div>
                        <div className="tech-label">PDF, DWG, DXF, STEP, STP, IGS, JPG, ZIP</div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-orange text-primary-foreground py-4 font-oswald text-sm tracking-widest hover:bg-orange/90 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  <Icon name={formLoading ? "Loader" : "Send"} size={16} />
                  {formLoading ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ ЗАПРОС НА РАСЧЁТ"}
                </button>

                <p className="font-ibm text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            ) : (
              <div className="text-center py-16 reveal opacity-0-init">
                <div className="w-20 h-20 border-2 border-orange flex items-center justify-center mx-auto mb-6 pulse-orange">
                  <Icon name="CheckCheck" size={36} className="text-orange" />
                </div>
                <h3 className="font-oswald text-3xl mb-3">ЗАПРОС ПРИНЯТ</h3>
                <p className="font-ibm text-muted-foreground mb-8">
                  Наш инженер свяжется с вами в течение 24 часов для уточнения деталей и расчёта стоимости.
                </p>
                <button
                  onClick={() => { setFormSent(false); setFormData({ name: "", company: "", phone: "", email: "", material: "", quantity: "", comment: "" }); setUploadedFile(null); }}
                  className="border border-border px-8 py-3 font-oswald text-sm tracking-wider hover:border-orange hover:text-orange transition-all"
                >
                  НОВЫЙ ЗАПРОС
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative">
        <div className="absolute inset-0 bg-blueprint-sm" />
        <div className="container relative z-10">
          <div className="tech-label mb-3 reveal opacity-0-init">// КОНТАКТЫ</div>
          <h2 className="font-oswald text-4xl md:text-5xl mb-12 reveal opacity-0-init delay-100">
            СВЯЖИТЕСЬ<br /><span className="text-orange">С НАМИ</span>
          </h2>

          {/* Телефон и Email — максимально заметно */}
          <div className="grid md:grid-cols-2 gap-4 mb-8 reveal opacity-0-init">
            <a
              href={`tel:${PHONE_CLEAN}`}
              className="flex items-center gap-4 bg-orange p-6 hover:bg-orange/90 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Phone" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <div className="tech-label text-primary-foreground/70 mb-1">ПОЗВОНИТЬ</div>
                <div className="font-oswald text-3xl font-bold text-primary-foreground group-hover:tracking-wider transition-all">{PHONE}</div>
                <div className="font-ibm text-xs text-primary-foreground/70 mt-1">Принимаем заявки 24 часа в сутки</div>
              </div>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 border-2 border-orange p-6 hover:bg-orange/10 transition-colors group"
            >
              <div className="w-14 h-14 border border-orange flex items-center justify-center flex-shrink-0">
                <Icon name="Mail" size={28} className="text-orange" />
              </div>
              <div>
                <div className="tech-label text-muted-foreground mb-1">НАПИСАТЬ</div>
                <div className="font-oswald text-2xl font-bold text-orange group-hover:tracking-wider transition-all">{EMAIL}</div>
                <div className="font-ibm text-xs text-muted-foreground mt-1">Ответим в течение 24 часов</div>
              </div>
            </a>
          </div>

          {/* Мессенджеры */}
          <div className="flex gap-3 mb-8 reveal opacity-0-init delay-100">
            <a
              href={`https://t.me/${PHONE_CLEAN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#229ED9] text-white px-5 py-3 font-oswald text-sm tracking-wider hover:bg-[#1a8bbf] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
              Написать в Telegram
            </a>
            <a
              href={`https://wa.me/${PHONE_CLEAN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 font-oswald text-sm tracking-wider hover:bg-[#1eab52] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Написать в WhatsApp
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mb-12">
            {[
              { icon: "MapPin", label: "Адрес", val: "г. Санкт-Петербург, ул. 1-й Верхний переулок, стр. 11" },
              { icon: "Clock", label: "Режим работы", val: "Заявки принимаем 24 часа\nОбработка Пн–Пт: 8:00–18:00" },
            ].map((item, i) => (
              <div key={i} className="border border-border bg-card p-6 card-hover reveal opacity-0-init" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-10 h-10 border border-border flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={18} className="text-orange" />
                </div>
                <div className="tech-label mb-2">{item.label}</div>
                <div className="font-ibm text-sm leading-relaxed whitespace-pre-line">{item.val}</div>
              </div>
            ))}
          </div>

          <div className="relative h-64 border border-border bg-card overflow-hidden reveal opacity-0-init">
            <div className="absolute inset-0 bg-blueprint flex items-center justify-center">
              <div className="text-center">
                <Icon name="MapPin" size={32} className="text-orange mx-auto mb-3" />
                <div className="font-oswald text-lg text-muted-foreground">КАРТА ПРОИЗВОДСТВА</div>
                <div className="tech-label mt-2">г. Санкт-Петербург, ул. 1-й Верхний переулок, стр. 11</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-blueprint opacity-40" />
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-orange/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-orange/30" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-orange flex items-center justify-center">
                <span className="font-oswald font-bold text-primary-foreground text-xs">ТБ</span>
              </div>
              <span className="font-oswald tracking-wider">ТЕХНОЛОГИЧЕСКОЕ БЮРО <span className="text-orange">№2211</span></span>
              <span className="text-muted-foreground font-ibm text-xs">© 2002–2024</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_ITEMS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="font-ibm text-xs text-muted-foreground hover:text-orange transition-colors tracking-wider"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a href={`https://t.me/${PHONE_CLEAN}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#229ED9] flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
              </a>
              <a href={`https://wa.me/${PHONE_CLEAN}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#25D366] flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-8"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 w-10 h-10 border border-border flex items-center justify-center hover:border-orange transition-colors">
            <Icon name="X" size={18} />
          </button>
          <img
            src={lightbox}
            alt="Галерея"
            className="max-w-full max-h-full object-contain border border-border"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}