import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/4b05eb97-3337-4fdf-8bad-fc6a58eb2515.jpg";
const BLUEPRINT_IMG = "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/9c35da5b-5afd-4a26-a89b-4c1d4bd6bab6.jpg";
const WELDING_IMG = "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/d80a6a3a-e929-4610-99fe-46b8f83f5535.jpg";

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
  { icon: "Settings2", num: "01", title: "Металлообработка", desc: "Токарные, фрезерные и шлифовальные работы с точностью до 0.01 мм. Любые партии от единичных изделий." },
  { icon: "Cpu", num: "02", title: "ЧПУ-обработка", desc: "5-осевые обрабатывающие центры, лазерная резка, листовой металл любой конфигурации." },
  { icon: "Package", num: "03", title: "Нестандартное оборудование", desc: "Разработка и изготовление промышленных механизмов, конвейеров, трубопроводов под заказ." },
  { icon: "Shield", num: "04", title: "Антикоррозийная защита", desc: "Пескоструйная обработка, порошковая покраска, горячее цинкование для максимального срока службы." },
];

const TECHNOLOGIES = [
  { name: "Лазерная резка", spec: "до 30 мм", value: 90 },
  { name: "Гидроабразивная резка", spec: "до 200 мм", value: 75 },
  { name: "3D-моделирование", spec: "SolidWorks, AutoCAD", value: 95 },
  { name: "ЧПУ-фрезеровка", spec: "5-осевая", value: 85 },
  { name: "Плазменная резка", spec: "до 60 мм", value: 80 },
  { name: "Порошковая покраска", spec: "RAL 200+ цветов", value: 70 },
];

const STATS = [
  { num: "17", suffix: "лет", label: "на рынке" },
  { num: "1200", suffix: "+", label: "завершённых проектов" },
  { num: "340", suffix: "", label: "постоянных клиентов" },
  { num: "98", suffix: "%", label: "соблюдение сроков" },
];

const PORTFOLIO = [
  { title: "Конвейерная линия", category: "Нестандартное оборудование", year: "2024", img: HERO_IMG },
  { title: "Резервуар 500 м³", category: "Антикоррозийная защита", year: "2023", img: BLUEPRINT_IMG },
  { title: "Трубопроводная обвязка", category: "Монтаж", year: "2023", img: HERO_IMG },
  { title: "Вентиляционный агрегат", category: "ЧПУ-обработка", year: "2022", img: BLUEPRINT_IMG },
  { title: "Промышленный пресс", category: "Металлообработка", year: "2022", img: HERO_IMG },
  { title: "Редуктор нестандартный", category: "Нестандартное оборудование", year: "2021", img: BLUEPRINT_IMG },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name: "", company: "", phone: "", email: "", material: "", quantity: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-orange bg-orange/10 flex items-center justify-center">
              <div className="w-4 h-4 bg-orange diagonal-stripes" />
            </div>
            <div>
              <div className="font-oswald text-lg font-semibold tracking-wider text-foreground leading-none">
                ТБ <span className="text-orange">2211</span>
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

          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden lg:flex items-center gap-2 bg-orange text-primary-foreground px-4 py-2 font-oswald text-sm tracking-wider hover:bg-orange/90 transition-colors"
          >
            <Icon name="Phone" size={14} />
            Связаться
          </button>

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
              БЮРО <span className="text-orange">2211</span>
            </h1>

            <p className="font-ibm text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed opacity-0-init reveal delay-300">
              Инженерные решения полного цикла: от технического задания до серийного производства. Точность, закреплённая в числах — <span className="text-foreground font-normal">22</span> года опыта, <span className="text-foreground font-normal">11</span> направлений компетенций.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 opacity-0-init reveal delay-400">
              <button
                onClick={() => scrollTo("#calculator")}
                className="flex items-center gap-2 bg-orange text-primary-foreground px-6 py-3 font-oswald text-sm tracking-wider hover:bg-orange/90 transition-all hover:gap-3"
              >
                <Icon name="Calculator" size={16} />
                РАССЧИТАТЬ СТОИМОСТЬ
              </button>
              <button
                onClick={() => scrollTo("#portfolio")}
                className="flex items-center gap-2 border border-border text-foreground px-6 py-3 font-oswald text-sm tracking-wider hover:border-orange hover:text-orange transition-all"
              >
                <Icon name="FolderOpen" size={16} />
                ПОРТФОЛИО
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
                <p>Технологическое бюро 2211 — это не просто название. <span className="text-foreground">22</span> — годы накопленного опыта в промышленном производстве. <span className="text-foreground">11</span> — ключевых направлений инженерных компетенций, которыми владеет наша команда.</p>
                <p>Собственный конструкторский отдел, парк высокоточного ЧПУ-оборудования и опытная производственная команда позволяют нам браться за задачи любой сложности — от опытного образца до серийного производства.</p>
              </div>
              <div className="mt-8 space-y-3 reveal opacity-0-init delay-300">
                {["ISO 9001:2015 сертифицированное производство", "Собственное КБ — полный проектный цикл", "Гарантия на изделия до 5 лет", "Поставки по всей России и СНГ"].map((item, i) => (
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
                <img src={WELDING_IMG} alt="Производство" className="w-full h-full object-cover" />
                <div className="absolute inset-0 border border-orange/30" />
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-orange" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-orange" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange text-primary-foreground p-6 w-48">
                <div className="font-oswald text-4xl font-bold">2211</div>
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
              COUNT: 04
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="tech-label mb-3 reveal opacity-0-init">// ТЕХНОЛОГИИ</div>
              <h2 className="font-oswald text-4xl md:text-5xl mb-8 reveal opacity-0-init delay-100">
                ИНЖЕНЕРНЫЕ<br /><span className="text-orange">ВОЗМОЖНОСТИ</span>
              </h2>
              <div className="space-y-5 reveal opacity-0-init delay-200">
                {TECHNOLOGIES.map((t, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-oswald text-sm tracking-wide">{t.name}</span>
                        <span className="tech-label">{t.spec}</span>
                      </div>
                      <span className="font-mono text-xs text-orange">{t.value}%</span>
                    </div>
                    <div className="h-1 bg-border relative overflow-hidden">
                      <div
                        className="h-full bg-orange transition-all duration-1000"
                        style={{ width: `${t.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal opacity-0-init delay-200">
              <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <img src={BLUEPRINT_IMG} alt="Чертёж" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Точность", val: "±0.01 мм" },
                      { label: "Площадь цехов", val: "8 200 м²" },
                      { label: "Станочный парк", val: "120+ ед." },
                      { label: "Сотрудников", val: "280 чел." },
                    ].map((item, i) => (
                      <div key={i} className="bg-background/80 backdrop-blur border border-border p-3">
                        <div className="tech-label mb-1">{item.label}</div>
                        <div className="font-oswald text-xl text-orange">{item.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
                { step: "03", title: "Производство", desc: "Изготовление в собственных цехах с контролем качества на каждой операции. Применяем современное ЧПУ-оборудование ведущих мировых производителей." },
                { step: "04", title: "Контроль качества", desc: "Ультразвуковой контроль сварных швов, метрологический контроль размеров, испытания под нагрузкой. Документирование всех результатов измерений." },
                { step: "05", title: "Доставка и монтаж", desc: "Организуем доставку собственным транспортом или ТК. По запросу — шефмонтаж и пусконаладочные работы нашей бригадой на объекте." },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 md:gap-16 items-start group reveal opacity-0-init" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex-shrink-0 flex flex-col items-center relative w-12">
                    <div className="w-12 h-12 border-2 border-orange bg-background flex items-center justify-center z-10 group-hover:bg-orange transition-colors">
                      <span className="font-mono text-xs text-orange group-hover:text-primary-foreground transition-colors">{item.step}</span>
                    </div>
                    {i < 4 && <div className="w-px flex-1 bg-border min-h-12" />}
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
                      <option>Чёрный металл (Ст3, Ст20)</option>
                      <option>Нержавеющая сталь</option>
                      <option>Алюминий</option>
                      <option>Медь / Латунь</option>
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
                    placeholder="Опишите задачу, требования к точности, сроки..."
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
                  className="w-full bg-orange text-primary-foreground py-4 font-oswald text-sm tracking-widest hover:bg-orange/90 transition-all flex items-center justify-center gap-3"
                >
                  <Icon name="Send" size={16} />
                  ОТПРАВИТЬ ЗАПРОС НА РАСЧЁТ
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: "MapPin", label: "Адрес", val: "г. Москва, ул. Промышленная, 42, стр. 1" },
              { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
              { icon: "Mail", label: "Email", val: "info@tb2211.ru" },
              { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 8:00–18:00\nСб: 9:00–14:00" },
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
                <div className="tech-label mt-2">г. Москва, ул. Промышленная, 42</div>
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
              <div className="w-6 h-6 bg-orange diagonal-stripes" />
              <span className="font-oswald tracking-wider">ТБ <span className="text-orange">2211</span></span>
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
            <div className="tech-label text-muted-foreground/50">ISO 9001:2015</div>
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