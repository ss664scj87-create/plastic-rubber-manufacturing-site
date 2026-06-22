import { useRef } from "react";
import Icon from "@/components/ui/icon";
import AnimatedNumber from "@/components/AnimatedNumber";
import EngineeringDiagram from "@/components/EngineeringDiagram";

const HERO_IMG =
  "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/4b05eb97-3337-4fdf-8bad-fc6a58eb2515.jpg";
const RUBBER_PARTS_IMG =
  "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/files/5fb1980b-7d0f-485a-a569-bcb6af4b18cc.jpg";

export const PHONE = "+7 (961) 800-22-11";
export const PHONE_CLEAN = "+79618002211";
export const EMAIL = "Tb-2211@yandex.ru";
export const MAX_URL =
  "https://max.ru/u/f9LHodD0cOIIhqhIv1XvLpodjLhjyW4qJcwP5PvKvcUjnHMXcHuZNqoeYoA";

export const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Технологии", href: "#technologies" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Settings2", num: "01", title: "Металлообработка", desc: "Токарные, фрезерные работы. Любые партии от единичных изделий." },
  { icon: "Cpu", num: "02", title: "ЧПУ-обработка", desc: "3-осевые обрабатывающие центры, лазерная резка резиновых прокладок, пластиков и других материалов." },
  { icon: "FlaskConical", num: "03", title: "Литьё в силиконовые формы", desc: "Изготовление опытных партий и серийных изделий методом литья в силиконовые формы." },
  { icon: "Printer", num: "04", title: "3D-печать и сканирование", desc: "Прототипирование, 3D-сканирование деталей, обратный инжиниринг для любых задач." },
  { icon: "Zap", num: "05", title: "Вулканизация РТИ и литьё пластмасс", desc: "Производство резинотехнических изделий, литьё пластмасс под давлением." },
  { icon: "Layers", num: "06", title: "Прессформы и литьё полиуретана", desc: "Проектирование и изготовление прессформ, литьё полиуретановых изделий любой сложности." },
];

const TECHNOLOGIES = [
  { name: "Литьё в силиконовые формы", spec: "мелкосерийное производство", desc: "Позволяет быстро получить точные копии деталей из полиуретана, эпоксидных смол и других материалов. Идеально для опытных образцов и мелких серий — от 1 до 500 штук.", img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/ec2e65ef-768b-4c28-912d-cc7b391e0be5.png" },
  { name: "3D-печать и сканирование", spec: "FDM, SLA, SLS", desc: "Создание прототипов за 1–3 дня. 3D-сканирование позволяет точно воспроизвести любую деталь без чертежей — достаточно принести образец.", img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/a2702d2e-c61b-4005-9e45-47f7650a3fda.jpg" },
  { name: "Вулканизация РТИ", spec: "резинотехнические изделия", desc: "Производство уплотнителей, прокладок, манжет, муфт и других резинотехнических изделий. Работаем с любыми марками резины под конкретные условия эксплуатации.", img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/0add236a-cb72-4037-abd3-d148fbc7cf84.jpg", fit: "cover" },
  { name: "Литьё пластмасс под давлением", spec: "серийное производство", desc: "Изготовление пластиковых деталей на термопластавтоматах. Собственный инструментальный цех — делаем пресс-формы и сразу запускаем серию.", img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/fafcfc17-8e14-4420-b51a-8d1570a02d9d.jpg", fit: "contain" },
  { name: "Проектирование и изготовление прессформ", spec: "сталь, алюминий", desc: "Полный цикл: от разработки конструкции в CAD до изготовления и испытания пресс-формы. Собственное КБ и ЧПУ-оборудование.", img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/c17f2117-ee68-439d-9886-1572106ec9f7.jpg", fit: "contain" },
  { name: "Литьё полиуретановых изделий", spec: "твёрдость Shore 10A–90D", desc: "Колёса, ролики, буферы, накладки, прокладки из полиуретана. Стойкость к износу в 5–10 раз выше, чем у резины.", img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/dfd2cbc5-770e-4da3-8859-07c5a2f57428.jpg", fit: "contain" },
];

const STATS = [
  { num: "17", suffix: "лет", label: "на рынке" },
  { num: "1200", suffix: "+", label: "завершённых проектов" },
  { num: "340", suffix: "", label: "постоянных клиентов" },
  { num: "98", suffix: "%", label: "соблюдение сроков" },
];

interface HeroSectionProps {
  activeNav: string;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  typedText: string;
  counters: number[];
  statsRef: React.RefObject<HTMLDivElement>;
  scrollTo: (href: string) => void;
}

export default function HeroSection({
  activeNav,
  mobileOpen,
  setMobileOpen,
  typedText,
  counters,
  statsRef,
  scrollTo,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange flex items-center justify-center flex-shrink-0">
              <span className="font-oswald font-bold text-primary-foreground text-sm leading-none">ТБ</span>
            </div>
            <div>
              <div className="font-oswald text-lg font-semibold tracking-wider text-foreground leading-none">
                ТБ{" "}
                <AnimatedNumber value="№2211" className="text-orange" baseDelay={0.2} />
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-blueprint opacity-60" />

        <div className="absolute top-20 left-6 w-12 h-12 border-t-2 border-l-2 border-orange/50" />
        <div className="absolute top-20 right-6 w-12 h-12 border-t-2 border-r-2 border-orange/50" />
        <div className="absolute bottom-8 left-6 w-12 h-12 border-b-2 border-l-2 border-orange/50" />
        <div className="absolute bottom-8 right-6 w-12 h-12 border-b-2 border-r-2 border-orange/50" />

        <div className="absolute left-[52%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange/20 to-transparent hidden lg:block" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent animate-scan-h" style={{ animationDuration: "7s" }} />
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 text-right pointer-events-none">
          {["LAT: 55.7558° N", "LON: 37.6173° E", "ALT: 156 m", "SYS: ONLINE", "PWR: 100%"].map((line, i) => (
            <div key={i} className="font-mono text-[10px] text-orange/50 opacity-0-init reveal" style={{ animationDelay: `${1 + i * 0.2}s` }}>
              {line}
            </div>
          ))}
          <div className="mt-2 flex flex-col items-end gap-1">
            {[80, 95, 60].map((w, i) => (
              <div key={i} className="h-px bg-orange/20 w-16 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-orange/60 animate-bar-fill"
                  style={{ "--fill-width": `${w}%`, animationDelay: `${1.5 + i * 0.3}s` } as React.CSSProperties}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-20 left-6 hidden lg:block pointer-events-none">
          <div className="font-mono text-[9px] text-orange/40 leading-5">
            <div className="opacity-0-init reveal delay-700">X: 000.00 mm</div>
            <div className="opacity-0-init reveal delay-800">Y: 000.00 mm</div>
            <div className="opacity-0-init reveal delay-900">Z: 000.00 mm</div>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="tech-label mb-4 opacity-0-init reveal delay-100">
              // <span>{typedText}</span>
              <span className="cursor-pulse inline-block w-[2px] h-[0.7em] bg-orange ml-0.5 align-middle" />
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6 opacity-0-init reveal delay-200">
              ТЕХНО<br />
              <span className="text-orange">ЛОГИ</span>ЧЕСКОЕ<br />
              БЮРО{" "}
              <AnimatedNumber value="№2211" className="text-orange" baseDelay={0.4} />
            </h1>

            <p className="font-ibm text-xl text-foreground/90 mb-8 max-w-xl leading-relaxed opacity-0-init reveal delay-300">
              Инженерные решения полного цикла: от технического задания до серийного производства. Изготовление любой серии — от 1 штуки. Помогаем выбрать оптимальную технологию производства под вашу задачу.
            </p>

            <div className="flex flex-wrap gap-3 mb-8 opacity-0-init reveal delay-350">
              <a href={`tel:${PHONE_CLEAN}`} className="flex items-center gap-2 bg-orange text-primary-foreground px-5 py-3 font-oswald text-xl tracking-wider hover:bg-orange/90 transition-all">
                <Icon name="Phone" size={20} />
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 border border-orange text-orange px-5 py-3 font-ibm text-base hover:bg-orange hover:text-primary-foreground transition-all">
                <Icon name="Mail" size={18} />
                {EMAIL}
              </a>
            </div>

            <div className="flex gap-3 mb-10 opacity-0-init reveal delay-400">
              <a href={`https://t.me/${PHONE_CLEAN}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#229ED9] text-white px-4 py-2 font-oswald text-sm tracking-wider hover:bg-[#1a8bbf] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
                </svg>
                Telegram
              </a>
              <a href={MAX_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 font-oswald text-sm tracking-wider hover:bg-[#e05a28] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5h-3v6h-3v-6h-3V7h9v2.5z" />
                </svg>
                Макс
              </a>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0-init reveal delay-500">
              {STATS.map((s, i) => (
                <div key={i} className="border border-border bg-card/60 backdrop-blur p-4 hud-corner relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-orange/0 via-orange/40 to-orange/0" />
                  <div className="font-oswald text-3xl font-bold text-orange leading-none odometer">
                    {counters[i]}
                    {s.suffix && <span className="text-xl">{s.suffix}</span>}
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
                ЗА ЧИСЛАМИ —<br />
                <span className="text-orange">ИНЖЕНЕРНАЯ</span><br />
                ФИЛОСОФИЯ
              </h2>
              <div className="space-y-4 font-ibm text-muted-foreground leading-relaxed reveal opacity-0-init delay-200">
                <p>Технологическое Бюро №2211 — берёмся за самые сложные проекты и любую серию. Для нас нет слишком маленьких или слишком нестандартных задач.</p>
                <p>Собственный конструкторский отдел, парк высокоточного оборудования и опытная производственная команда позволяют нам выполнять заказы любой сложности — от опытного образца до серийного производства.</p>
              </div>
              <div className="mt-8 space-y-3 reveal opacity-0-init delay-300">
                {["Производство от 1 штуки до крупной серии", "Собственное КБ — полный проектный цикл", "Работаем с любыми материалами", "Поставки по всей России и СНГ"].map((item, i) => (
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
                ЧТО МЫ<br />
                <span className="text-orange">ПРОИЗВОДИМ</span>
              </h2>
            </div>
            <div className="hidden lg:block font-mono text-muted-foreground/30 text-xs text-right reveal opacity-0-init delay-200">
              SERVICES_LIST<br />VERSION: 2024.1<br />COUNT: 06
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-background p-8 card-hover border border-transparent relative group cursor-default">
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
            ИНЖЕНЕРНЫЕ<br />
            <span className="text-orange">ВОЗМОЖНОСТИ</span>
          </h2>
          <p className="font-ibm text-base text-muted-foreground mb-12 max-w-xl reveal opacity-0-init delay-200">
            Полный спектр технологий для производства резиновых, пластиковых и полиуретановых изделий — от единичного прототипа до серии.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNOLOGIES.map((t, i) => (
              <div key={i} className="border border-border bg-background card-hover group reveal opacity-0-init" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`relative overflow-hidden flex items-center justify-center ${"fit" in t && t.fit === "contain" ? "bg-[#0d0f11]" : ""}`} style={{ aspectRatio: "16/9" }}>
                  <img
                    src={t.img}
                    alt={t.name}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${"fit" in t && t.fit === "contain" ? "object-contain p-4" : "object-cover"}`}
                  />
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
            КАК МЫ<br />
            <span className="text-orange">РАБОТАЕМ</span>
          </h2>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange via-orange/50 to-transparent hidden md:block" />
            <div className="space-y-0">
              {[
                { step: "01", title: "Получение задания", desc: "Принимаем техническое задание, чертежи или описание — в любом формате. Наши инженеры изучают задачу и готовят коммерческое предложение в течение 24 часов." },
                { step: "02", title: "Проектирование и КМД", desc: "Конструкторский отдел разрабатывает рабочую документацию, 3D-модели и технологические карты. Согласование с заказчиком на каждом этапе." },
                { step: "03", title: "Производство", desc: "Изготовление в собственных цехах с контролем качества на каждой операции. Применяем современное оборудование ведущих мировых производителей." },
                { step: "04", title: "Контроль качества", desc: "Метрологический контроль размеров, испытания изделий, документирование результатов. Каждая партия проверяется перед отгрузкой." },
                { step: "05", title: "Доставка по РФ и СНГ", desc: "Организуем доставку по всей России и странам СНГ — собственным транспортом или транспортными компаниями. Надёжная упаковка и сопроводительная документация." },
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

          <div className="mt-16 border border-border bg-background/60 backdrop-blur reveal opacity-0-init delay-300">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
              <div className="glow-dot" />
              <span className="tech-label">// СХЕМА ПРОИЗВОДСТВЕННОГО ЦИКЛА</span>
              <span className="ml-auto font-mono text-[9px] text-muted-foreground">SYS: ACTIVE</span>
            </div>
            <div className="p-4">
              <EngineeringDiagram />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
