import { useParams, Link } from "react-router-dom";
import { ARTICLES } from "@/data/articles";
import Icon from "@/components/ui/icon";

const CATEGORY_COLORS: Record<string, string> = {
  "Технологии": "text-orange border-orange/40 bg-orange/10",
  "Производство": "text-blue-400 border-blue-400/40 bg-blue-400/10",
  "Прототипирование": "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  "Материалы": "text-violet-400 border-violet-400/40 bg-violet-400/10",
  "Металлообработка": "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
  "Оснастка": "text-rose-400 border-rose-400/40 bg-rose-400/10",
};

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find((a) => a.slug === slug);
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="font-oswald text-6xl text-orange mb-4">404</div>
          <p className="font-ibm text-muted-foreground mb-6">Статья не найдена</p>
          <Link to="/blog" className="border border-border px-6 py-3 font-oswald text-sm tracking-wider hover:border-orange hover:text-orange transition-all">
            ВЕРНУТЬСЯ В БАЗУ ЗНАНИЙ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO */}
      {typeof document !== "undefined" && (() => {
        document.title = `${article.title} — ТБ №2211`;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute("content", article.description);
        return null;
      })()}

      {/* Шапка */}
      <header className="border-b border-border bg-card/80 sticky top-0 z-50 backdrop-blur">
        <div className="container flex items-center gap-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-orange transition-colors">
            <Icon name="Home" size={14} />
            <span className="font-ibm text-sm">Главная</span>
          </Link>
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          <Link to="/blog" className="font-ibm text-sm text-muted-foreground hover:text-orange transition-colors">
            База знаний
          </Link>
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          <span className="font-ibm text-sm truncate max-w-xs">{article.title}</span>
        </div>
      </header>

      <div className="container py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Основной контент */}
          <div>
            {/* Мета */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`font-ibm text-xs px-2 py-0.5 border ${CATEGORY_COLORS[article.category] ?? "text-muted-foreground border-border"}`}>
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span className="font-ibm text-xs">{article.readTime} чтения</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon name="Calendar" size={12} />
                <span className="font-ibm text-xs">
                  {new Date(article.date).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
            </div>

            {/* Заголовок */}
            <h1 className="font-oswald text-3xl md:text-5xl leading-tight mb-6">
              {article.title}
            </h1>

            {/* Лид */}
            <div className="border-l-2 border-orange pl-5 mb-10">
              <p className="font-ibm text-base text-muted-foreground leading-relaxed">
                {article.description}
              </p>
            </div>

            {/* Контент */}
            <div className="space-y-6">
              {article.content.map((section, i) => {
                if (section.type === "heading") {
                  return (
                    <h2 key={i} className="font-oswald text-2xl mt-10 mb-2">
                      {section.text}
                    </h2>
                  );
                }
                if (section.type === "paragraph") {
                  return (
                    <p key={i} className="font-ibm text-base leading-relaxed text-foreground/90">
                      {section.text}
                    </p>
                  );
                }
                if (section.type === "highlight") {
                  return (
                    <div key={i} className="border border-orange/40 bg-orange/5 px-6 py-5 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange" />
                      <Icon name="Lightbulb" size={16} className="text-orange mb-2" />
                      <p className="font-ibm text-sm leading-relaxed text-foreground font-medium">
                        {section.text}
                      </p>
                    </div>
                  );
                }
                if (section.type === "list" && section.items) {
                  return (
                    <ul key={i} className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 font-ibm text-sm leading-relaxed text-foreground/90">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>

            {/* CTA в конце статьи */}
            <div className="mt-14 border border-orange/30 bg-card p-8">
              <div className="tech-label mb-2 text-orange">// ЕСТЬ ПОХОЖАЯ ЗАДАЧА?</div>
              <h3 className="font-oswald text-2xl mb-3">Обсудим ваш проект</h3>
              <p className="font-ibm text-sm text-muted-foreground mb-6">
                Инженеры ТБ №2211 помогут выбрать оптимальную технологию и рассчитают стоимость изготовления.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/#contacts"
                  className="flex items-center gap-2 px-6 py-3 font-oswald text-sm tracking-wider text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, #e85d04, #f59e0b)" }}
                >
                  <Icon name="Send" size={14} />
                  ОСТАВИТЬ ЗАЯВКУ
                </Link>
                <a
                  href="tel:+79618002211"
                  className="flex items-center gap-2 px-6 py-3 border border-border font-oswald text-sm tracking-wider hover:border-orange hover:text-orange transition-all"
                >
                  <Icon name="Phone" size={14} />
                  +7 (961) 800-22-11
                </a>
              </div>
            </div>
          </div>

          {/* Сайдбар */}
          <aside className="space-y-6">
            {/* Другие статьи */}
            <div className="border border-border bg-card p-6 sticky top-20">
              <div className="tech-label mb-4 text-orange">// ДРУГИЕ СТАТЬИ</div>
              <div className="space-y-4">
                {others.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-12 bg-border group-hover:bg-orange transition-colors flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-oswald text-sm leading-snug group-hover:text-orange transition-colors">
                          {a.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                          <Icon name="Clock" size={11} />
                          <span className="font-ibm text-xs">{a.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  to="/blog"
                  className="flex items-center gap-2 font-ibm text-xs text-orange mt-2 hover:gap-3 transition-all"
                >
                  <span>Все статьи</span>
                  <Icon name="ArrowRight" size={12} />
                </Link>
              </div>
            </div>

            {/* Контакты в сайдбаре */}
            <div className="border border-border bg-card p-6">
              <div className="tech-label mb-3 text-orange">// КОНТАКТЫ</div>
              <p className="font-ibm text-sm text-muted-foreground mb-4 leading-relaxed">
                Нужна деталь или консультация инженера?
              </p>
              <a href="tel:+79618002211" className="flex items-center gap-2 font-oswald text-base hover:text-orange transition-colors mb-2">
                <Icon name="Phone" size={14} className="text-orange" />
                +7 (961) 800-22-11
              </a>
              <a href="mailto:Tb-2211@yandex.ru" className="flex items-center gap-2 font-ibm text-xs text-muted-foreground hover:text-orange transition-colors">
                <Icon name="Mail" size={12} className="text-orange" />
                Tb-2211@yandex.ru
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
