import { Link } from "react-router-dom";
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

export default function Blog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Шапка */}
      <header className="border-b border-border bg-card/80 sticky top-0 z-50 backdrop-blur">
        <div className="container flex items-center gap-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-orange transition-colors">
            <Icon name="ArrowLeft" size={16} />
            <span className="font-ibm text-sm">На главную</span>
          </Link>
          <div className="w-px h-4 bg-border" />
          <span className="font-oswald text-sm tracking-wider">БАЗА ЗНАНИЙ</span>
        </div>
      </header>

      <div className="container py-16">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="tech-label mb-3 text-orange">// БАЗА ЗНАНИЙ</div>
          <h1 className="font-oswald text-4xl md:text-6xl mb-4">
            ТЕХНОЛОГИИ
            <br />
            <span className="text-orange">ПРОИЗВОДСТВА</span>
          </h1>
          <p className="font-ibm text-muted-foreground max-w-xl">
            Экспертные статьи о технологиях изготовления резинотехнических и пластиковых изделий от инженеров ТБ №2211.
          </p>
        </div>

        {/* Сетка статей */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group border border-border bg-card hover:border-orange/50 transition-all duration-300 flex flex-col"
            >
              {/* Верхняя оранжевая полоса */}
              <div className="h-0.5 bg-orange/0 group-hover:bg-orange transition-all duration-300" />

              <div className="p-6 flex flex-col flex-1">
                {/* Категория и время */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-ibm text-xs px-2 py-0.5 border ${CATEGORY_COLORS[article.category] ?? "text-muted-foreground border-border"}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span className="font-ibm text-xs">{article.readTime}</span>
                  </div>
                </div>

                {/* Заголовок */}
                <h2 className="font-oswald text-lg leading-snug mb-3 group-hover:text-orange transition-colors">
                  {article.title}
                </h2>

                {/* Описание */}
                <p className="font-ibm text-sm text-muted-foreground leading-relaxed flex-1">
                  {article.description}
                </p>

                {/* Читать далее */}
                <div className="flex items-center gap-2 mt-5 font-ibm text-xs text-orange">
                  <span>Читать статью</span>
                  <Icon name="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 border border-orange/30 bg-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="tech-label mb-2 text-orange">// НУЖНА КОНСУЛЬТАЦИЯ?</div>
            <h3 className="font-oswald text-2xl">Обсудим вашу задачу с инженером</h3>
            <p className="font-ibm text-sm text-muted-foreground mt-1">Ответим на вопросы и поможем выбрать оптимальную технологию</p>
          </div>
          <Link
            to="/#contacts"
            className="flex-shrink-0 flex items-center gap-3 px-8 py-4 font-oswald text-sm tracking-widest text-primary-foreground hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg, #e85d04, #f59e0b)", boxShadow: "0 0 24px rgba(232,93,4,0.35)" }}
          >
            <Icon name="Phone" size={16} />
            СВЯЗАТЬСЯ С НАМИ
          </Link>
        </div>
      </div>
    </div>
  );
}
