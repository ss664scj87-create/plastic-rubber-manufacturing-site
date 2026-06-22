import Icon from "@/components/ui/icon";
import { ARTICLES } from "@/data/articles";

const PORTFOLIO = [
  { img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/9895f45f-c7fb-4f2b-ad15-cede58e4bd8b.png", dark: true },
  { img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/6749de69-14cb-44fe-b251-1e5d1db98bd5.jpg", dark: false },
  { img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/0147085a-c188-4f6e-a6b7-0876f54daa76.jpg", dark: false },
  { img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/355903a1-91cd-4c9a-b0ff-823b2fa86226.jpg", dark: true },
  { img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/7d6e0cfe-e8be-4a90-8c5c-31fd72efdbb6.jpg", dark: false },
  { img: "https://cdn.poehali.dev/projects/a73a8764-8411-4f05-9d1a-f8f2ffd3216b/bucket/af03dfab-734c-42a9-a82c-c83050b486fb.jpg", dark: true },
];

interface CalcState {
  service: string;
  basePrice: number;
  material: string;
  materialMult: number;
  qty: number;
  urgency: string;
  urgencyMult: number;
}

interface PortfolioSectionProps {
  lightbox: number | null;
  setLightbox: (v: number | null) => void;
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
  calc: CalcState;
  setCalc: React.Dispatch<React.SetStateAction<CalcState>>;
}

export default function PortfolioSection({
  lightbox,
  setLightbox,
  openFaq,
  setOpenFaq,
  calc,
  setCalc,
}: PortfolioSectionProps) {
  return (
    <>
      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 relative bg-card/30">
        <div className="absolute inset-0 bg-blueprint-sm" />
        <div className="container relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="tech-label mb-3 reveal opacity-0-init">// ПОРТФОЛИО</div>
              <h2 className="font-oswald text-4xl md:text-5xl reveal opacity-0-init delay-100">
                РЕАЛИЗОВАННЫЕ<br />
                <span className="text-orange">ПРОЕКТЫ</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {PORTFOLIO.map((p, i) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-pointer reveal opacity-0-init bg-card"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setLightbox(i)}
              >
                <div className={`aspect-[4/3] overflow-hidden flex items-center justify-center ${p.dark ? "bg-[#111416]" : "bg-card"}`}>
                  <img
                    src={p.img}
                    alt=""
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-normal"
                    style={{ filter: p.dark ? "none" : "none" }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border border-orange/0 group-hover:border-orange/40 transition-colors duration-300" />
                <div className="absolute top-0 left-0 w-8 h-px bg-orange/0 group-hover:bg-orange transition-all duration-300" />
                <div className="absolute top-0 left-0 w-px h-8 bg-orange/0 group-hover:bg-orange transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-px bg-orange/0 group-hover:bg-orange transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-px h-8 bg-orange/0 group-hover:bg-orange transition-all duration-300" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 bg-orange flex items-center justify-center">
                    <Icon name="ZoomIn" size={13} className="text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАЛЬКУЛЯТОР СТОИМОСТИ */}
      <section id="calculator" className="py-24 relative">
        <div className="container relative z-10">
          <div className="tech-label mb-3 reveal opacity-0-init">// БЫСТРЫЙ РАСЧЁТ</div>
          <h2 className="font-oswald text-4xl md:text-5xl mb-4 reveal opacity-0-init delay-100">
            КАЛЬКУЛЯТОР<br />
            <span className="text-orange">СТОИМОСТИ</span>
          </h2>
          <p className="font-ibm text-muted-foreground mb-12 reveal opacity-0-init delay-200">
            Получите предварительную оценку стоимости заказа. Точный расчёт — после заявки.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6 reveal opacity-0-init">
              <div>
                <label className="tech-label block mb-3 text-orange">ТИП УСЛУГИ</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "casting", label: "Литьё в силикон", base: 8000 },
                    { id: "cnc", label: "ЧПУ-обработка", base: 5000 },
                    { id: "print3d", label: "3D-печать", base: 3000 },
                    { id: "vulcan", label: "Вулканизация РТИ", base: 6000 },
                    { id: "plastic", label: "Литьё пластмасс", base: 12000 },
                    { id: "polyurethan", label: "Полиуретан", base: 7000 },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCalc((c) => ({ ...c, service: s.id, basePrice: s.base }))}
                      className={`border px-3 py-2 font-ibm text-xs text-left transition-all ${calc.service === s.id ? "border-orange text-orange bg-orange/10" : "border-border hover:border-orange/50"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="tech-label block mb-3 text-orange">МАТЕРИАЛ</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "rubber", label: "Резина", mult: 1.0 },
                    { id: "silicone", label: "Силикон", mult: 1.3 },
                    { id: "polyurethane", label: "Полиуретан", mult: 1.5 },
                    { id: "plastic", label: "Пластик", mult: 1.1 },
                    { id: "metal", label: "Металл", mult: 2.0 },
                    { id: "other", label: "Другое", mult: 1.2 },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setCalc((c) => ({ ...c, material: m.id, materialMult: m.mult }))}
                      className={`border px-3 py-2 font-ibm text-xs transition-all ${calc.material === m.id ? "border-orange text-orange bg-orange/10" : "border-border hover:border-orange/50"}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="tech-label block mb-3 text-orange">
                  КОЛИЧЕСТВО: <span className="text-foreground">{calc.qty} шт.</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={calc.qty}
                  onChange={(e) => setCalc((c) => ({ ...c, qty: Number(e.target.value) }))}
                  className="w-full accent-orange"
                />
                <div className="flex justify-between font-ibm text-xs text-muted-foreground mt-1">
                  <span>1 шт.</span>
                  <span>500 шт.</span>
                </div>
              </div>

              <div>
                <label className="tech-label block mb-3 text-orange">СРОЧНОСТЬ</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "normal", label: "Стандарт", sub: "10–20 дней", mult: 1.0 },
                    { id: "fast", label: "Ускоренно", sub: "5–9 дней", mult: 1.3 },
                    { id: "urgent", label: "Срочно", sub: "1–4 дня", mult: 1.7 },
                  ].map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setCalc((c) => ({ ...c, urgency: u.id, urgencyMult: u.mult }))}
                      className={`border px-3 py-3 font-ibm text-xs text-left transition-all ${calc.urgency === u.id ? "border-orange text-orange bg-orange/10" : "border-border hover:border-orange/50"}`}
                    >
                      <div className="font-medium">{u.label}</div>
                      <div className="text-muted-foreground">{u.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal opacity-0-init delay-200">
              <div className="border border-orange/30 bg-card p-8 h-full flex flex-col">
                <div className="tech-label mb-6 text-orange">// ПРЕДВАРИТЕЛЬНАЯ ОЦЕНКА</div>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border font-ibm text-sm">
                    <span className="text-muted-foreground">Базовая стоимость</span>
                    <span>{calc.basePrice.toLocaleString("ru")} ₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border font-ibm text-sm">
                    <span className="text-muted-foreground">Материал ×{calc.materialMult.toFixed(1)}</span>
                    <span>{Math.round(calc.basePrice * calc.materialMult).toLocaleString("ru")} ₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border font-ibm text-sm">
                    <span className="text-muted-foreground">Количество: {calc.qty} шт.</span>
                    <span>{Math.round(calc.basePrice * calc.materialMult * (1 + (calc.qty - 1) * 0.3)).toLocaleString("ru")} ₽</span>
                  </div>
                  {calc.urgencyMult > 1 && (
                    <div className="flex justify-between items-center py-3 border-b border-border font-ibm text-sm">
                      <span className="text-muted-foreground">Срочность ×{calc.urgencyMult.toFixed(1)}</span>
                      <span className="text-orange">+{Math.round(calc.basePrice * calc.materialMult * (1 + (calc.qty - 1) * 0.3) * (calc.urgencyMult - 1)).toLocaleString("ru")} ₽</span>
                    </div>
                  )}
                  <div className="pt-4">
                    <div className="font-ibm text-xs text-muted-foreground mb-2">ИТОГО ОТ</div>
                    <div className="font-oswald text-5xl text-orange">
                      {Math.round(calc.basePrice * calc.materialMult * (1 + (calc.qty - 1) * 0.3) * calc.urgencyMult).toLocaleString("ru")}
                      <span className="text-3xl ml-2">₽</span>
                    </div>
                    <p className="font-ibm text-xs text-muted-foreground mt-3">
                      Цена ориентировочная. Точный расчёт — после изучения чертежей и ТЗ.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <a
                    href="#contacts"
                    className="w-full flex items-center justify-center gap-3 py-4 font-oswald text-sm tracking-widest text-primary-foreground transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #e85d04, #f59e0b)", boxShadow: "0 0 24px rgba(232,93,4,0.35)" }}
                  >
                    <Icon name="Calculator" size={16} />
                    ПОЛУЧИТЬ ТОЧНЫЙ РАСЧЁТ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 relative bg-card/30">
        <div className="absolute inset-0 bg-blueprint-sm" />
        <div className="container relative z-10">
          <div className="tech-label mb-3 reveal opacity-0-init">// ВОПРОСЫ И ОТВЕТЫ</div>
          <h2 className="font-oswald text-4xl md:text-5xl mb-12 reveal opacity-0-init delay-100">
            ЧАСТО<br />
            <span className="text-orange">СПРАШИВАЮТ</span>
          </h2>

          <div className="max-w-3xl space-y-2">
            {[
              { q: "Какая минимальная партия для заказа?", a: "Принимаем заказы от 1 штуки. Производим как единичные изделия для прототипирования, так и серийные партии до тысяч единиц." },
              { q: "Сколько времени занимает изготовление?", a: "Стандартные сроки — 10–20 рабочих дней. Возможно ускоренное производство за 5–9 дней и срочное — за 1–4 дня (стоимость выше). Точные сроки зависят от сложности изделия." },
              { q: "Нужно ли предоставлять чертежи?", a: "Чертежи желательны, но не обязательны. Мы работаем по эскизам, образцам и даже устному описанию. Есть 3D-сканирование для обратного инжиниринга деталей без документации." },
              { q: "Какие материалы вы используете?", a: "Резина и РТИ, силикон (пищевой, медицинский, технический), полиуретан (Shore 10A–90D), пластмассы, металлы. Подберём оптимальный материал под ваши условия эксплуатации." },
              { q: "Как рассчитывается стоимость?", a: "Цена зависит от типа услуги, материала, количества изделий и сроков. Используйте наш калькулятор для предварительной оценки, а точный расчёт — после изучения чертежей." },
              { q: "Вы работаете с юридическими лицами?", a: "Да, работаем как с физическими, так и с юридическими лицами. Предоставляем все закрывающие документы: счёт, договор, акты. Работаем с НДС и без." },
              { q: "Есть ли доставка по России?", a: "Да, отправляем заказы по всей России транспортными компаниями (СДЭК, Деловые линии и др.). Крупные партии — грузовыми перевозчиками." },
            ].map((item, i) => (
              <div key={i} className="border border-border bg-card reveal opacity-0-init" style={{ animationDelay: `${i * 0.07}s` }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-oswald text-lg group-hover:text-orange transition-colors">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="flex-shrink-0 text-orange" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 font-ibm text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БАЗА ЗНАНИЙ */}
      <section id="knowledge" className="py-24 relative">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="tech-label mb-3 reveal opacity-0-init text-orange">// БАЗА ЗНАНИЙ</div>
              <h2 className="font-oswald text-4xl md:text-5xl reveal opacity-0-init delay-100">
                СТАТЬИ О<br />
                <span className="text-orange">ТЕХНОЛОГИЯХ</span>
              </h2>
              <p className="font-ibm text-sm text-muted-foreground mt-3 max-w-lg reveal opacity-0-init delay-200">
                Экспертные материалы о производстве РТИ, литье, 3D-печати и металлообработке от инженеров ТБ №2211.
              </p>
            </div>
            <a
              href="/blog"
              className="flex-shrink-0 flex items-center gap-2 border border-border px-6 py-3 font-oswald text-sm tracking-wider hover:border-orange hover:text-orange transition-all reveal opacity-0-init"
            >
              ВСЕ СТАТЬИ
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARTICLES.slice(0, 6).map((article, i) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group border border-border bg-card hover:border-orange/50 transition-all duration-300 flex flex-col reveal opacity-0-init"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="h-0.5 bg-orange/0 group-hover:bg-orange transition-all duration-300" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-ibm text-xs text-orange border border-orange/30 bg-orange/10 px-2 py-0.5">{article.category}</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Clock" size={11} />
                      <span className="font-ibm text-xs">{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-oswald text-base leading-snug mb-2 group-hover:text-orange transition-colors flex-1">{article.title}</h3>
                  <div className="flex items-center gap-1 mt-3 font-ibm text-xs text-muted-foreground group-hover:text-orange transition-colors">
                    <span>Читать</span>
                    <Icon name="ArrowRight" size={11} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-background/97 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button
            className="absolute top-6 right-6 w-10 h-10 border border-border flex items-center justify-center hover:border-orange transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={18} />
          </button>
          <button
            className="absolute left-4 md:left-8 w-12 h-12 border border-border flex items-center justify-center hover:border-orange hover:text-orange transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + PORTFOLIO.length) % PORTFOLIO.length); }}
          >
            <Icon name="ChevronLeft" size={22} />
          </button>
          <div className="px-20 py-12 max-w-5xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={PORTFOLIO[lightbox].img} alt="Галерея" className="max-w-full max-h-[80vh] object-contain border border-border/40" />
          </div>
          <button
            className="absolute right-4 md:right-8 w-12 h-12 border border-border flex items-center justify-center hover:border-orange hover:text-orange transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % PORTFOLIO.length); }}
          >
            <Icon name="ChevronRight" size={22} />
          </button>
          <div className="absolute bottom-6 flex gap-2">
            {PORTFOLIO.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 transition-colors ${i === lightbox ? "bg-orange" : "bg-border hover:bg-steel"}`}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}