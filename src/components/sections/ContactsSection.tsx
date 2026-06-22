import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "+7 (961) 800-22-11";
const PHONE_CLEAN = "+79618002211";
const EMAIL = "Tb-2211@yandex.ru";
const MAX_URL =
  "https://max.ru/u/f9LHodD0cOIIhqhIv1XvLpodjLhjyW4qJcwP5PvKvcUjnHMXcHuZNqoeYoA";

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Технологии", href: "#technologies" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

interface FormData {
  email: string;
  comment: string;
  name?: string;
  phone?: string;
}

interface ContactsSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formSent: boolean;
  setFormSent: (v: boolean) => void;
  formLoading: boolean;
  handleSubmit: (e: React.FormEvent, file: File | null) => void;
  scrollTo: (href: string) => void;
}

export default function ContactsSection({
  formData,
  setFormData,
  formSent,
  setFormSent,
  formLoading,
  handleSubmit,
  scrollTo,
}: ContactsSectionProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setUploadedFile(file);
  };

  return (
    <>
      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative">
        <div className="absolute inset-0 bg-blueprint-sm" />
        <div className="container relative z-10">
          <div className="tech-label mb-3 reveal opacity-0-init">// КОНТАКТЫ</div>
          <h2 className="font-oswald text-4xl md:text-5xl mb-12 reveal opacity-0-init delay-100">
            СВЯЖИТЕСЬ<br />
            <span className="text-orange">С НАМИ</span>
          </h2>

          {/* Телефон и Email */}
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
                <div className="font-oswald text-3xl font-bold text-primary-foreground group-hover:tracking-wider transition-all">
                  {PHONE}
                </div>
                <div className="font-ibm text-xs text-primary-foreground/70 mt-1">
                  Принимаем заявки 24 часа в сутки
                </div>
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
                <div className="font-oswald text-2xl font-bold text-orange group-hover:tracking-wider transition-all">
                  {EMAIL}
                </div>
                <div className="font-ibm text-xs text-muted-foreground mt-1">
                  Ответим в течение 24 часов
                </div>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
              </svg>
              Написать в Telegram
            </a>
            <a
              href={MAX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FF6B35] text-white px-5 py-3 font-oswald text-sm tracking-wider hover:bg-[#e05a28] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5h-3v6h-3v-6h-3V7h9v2.5z" />
              </svg>
              Написать в Макс
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

          {/* ФОРМА ЗАЯВКИ */}
          <div className="relative mb-8 reveal opacity-0-init overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange" />
            <div className="bg-card border border-border border-l-0 p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-orange flex items-center justify-center flex-shrink-0">
                  <Icon name="ClipboardList" size={26} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="tech-label text-orange mb-1">// БЫСТРЫЙ РАСЧЁТ</div>
                  <h3 className="font-oswald text-3xl md:text-4xl">
                    ОСТАВИТЬ <span className="text-orange">ЗАЯВКУ</span>
                  </h3>
                </div>
              </div>

              {!formSent ? (
                <form onSubmit={(e) => handleSubmit(e, uploadedFile)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="tech-label block mb-2 text-orange">ИМЯ *</label>
                      <div className="relative">
                        <Icon name="User" size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          placeholder="Как к вам обращаться?"
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value } as typeof formData & { name: string })
                          }
                          className="w-full bg-background border border-border pl-10 pr-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="tech-label block mb-2 text-orange">ТЕЛЕФОН *</label>
                      <div className="relative">
                        <Icon name="Phone" size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="tel"
                          required
                          placeholder="+7 (___) ___-__-__"
                          value={formData.phone || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value } as typeof formData & { phone: string })
                          }
                          className="w-full bg-background border border-border pl-10 pr-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="tech-label block mb-2 text-orange">EMAIL</label>
                    <div className="relative">
                      <Icon name="Mail" size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="email@company.ru"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-background border border-border pl-10 pr-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="tech-label block mb-2 text-orange">ОПИСАНИЕ ЗАДАЧИ *</label>
                    <textarea
                      required
                      placeholder="Опишите задачу, материал, количество, сроки..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows={4}
                      className="w-full bg-background border border-border px-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Загрузка файла */}
                  <div>
                    <label className="tech-label block mb-2 text-orange">ЧЕРТЁЖ / ФАЙЛ</label>
                    <div
                      className={`border border-dashed p-4 flex items-center gap-4 cursor-pointer transition-colors ${uploadedFile ? "border-orange/60 bg-orange/5" : "border-border hover:border-orange/40"}`}
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${uploadedFile ? "bg-orange/20" : "bg-card"}`}>
                        <Icon name={uploadedFile ? "FileCheck" : "Paperclip"} size={18} className="text-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {uploadedFile ? (
                          <>
                            <div className="font-ibm text-sm truncate">{uploadedFile.name}</div>
                            <div className="font-ibm text-xs text-muted-foreground">{(uploadedFile.size / 1024).toFixed(0)} КБ</div>
                          </>
                        ) : (
                          <>
                            <div className="font-ibm text-sm text-muted-foreground">Перетащите файл или нажмите для выбора</div>
                            <div className="font-ibm text-xs text-muted-foreground/60">DWG, DXF, PDF, STEP, STL, JPG — до 10 МБ</div>
                          </>
                        )}
                      </div>
                      {uploadedFile && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                          className="flex-shrink-0 w-7 h-7 border border-border flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".dwg,.dxf,.pdf,.step,.stp,.stl,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => { if (e.target.files?.[0]) setUploadedFile(e.target.files[0]); }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 font-oswald text-base tracking-widest text-primary-foreground transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 overflow-hidden group"
                      style={{ background: "linear-gradient(135deg, #e85d04, #f59e0b)", boxShadow: "0 0 24px rgba(232,93,4,0.4)" }}
                    >
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon name={formLoading ? "Loader" : "Send"} size={16} />
                      {formLoading ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ ЗАЯВКУ"}
                    </button>
                    <p className="font-ibm text-xs text-muted-foreground">
                      Нажимая кнопку, вы соглашаетесь с<br />обработкой персональных данных
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 border-2 border-orange flex items-center justify-center mx-auto mb-5 pulse-orange">
                    <Icon name="CheckCheck" size={36} className="text-orange" />
                  </div>
                  <h3 className="font-oswald text-3xl mb-3">ЗАЯВКА ПРИНЯТА</h3>
                  <p className="font-ibm text-muted-foreground mb-8">
                    Свяжемся с вами в течение рабочего дня
                  </p>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setFormData({ email: "", comment: "" });
                    }}
                    className="border border-border px-8 py-3 font-oswald text-sm tracking-wider hover:border-orange hover:text-orange transition-all"
                  >
                    НОВАЯ ЗАЯВКА
                  </button>
                </div>
              )}
            </div>
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
              <span className="font-oswald tracking-wider">
                ТЕХНОЛОГИЧЕСКОЕ БЮРО <span className="text-orange">№2211</span>
              </span>
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
              <a
                href={`https://t.me/${PHONE_CLEAN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#229ED9] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${PHONE_CLEAN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#25D366] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ЗАЯВКА BUTTON */}
      <a
        href="#contacts"
        onClick={(e) => { e.preventDefault(); document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }); }}
        className="fixed bottom-6 left-6 z-[90] group flex items-center gap-3 pl-4 pr-5 py-3 transition-all duration-300 hover:-translate-y-1 animate-pulse-orange"
        style={{
          background: "linear-gradient(135deg, #e85d04, #f59e0b)",
          boxShadow: "0 0 24px rgba(232,93,4,0.5), 0 4px 20px rgba(0,0,0,0.4)",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}
      >
        <span className="relative flex-shrink-0 w-9 h-9">
          <span className="animate-radar-ping absolute inset-0 rounded-full bg-orange-400 opacity-40" />
          <span className="relative flex h-9 w-9 items-center justify-center bg-white/20">
            <Icon name="ClipboardList" size={18} className="text-white" />
          </span>
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-oswald text-[10px] tracking-widest text-orange-100 uppercase">Бесплатный расчёт</span>
          <span className="font-oswald text-base tracking-wider text-white font-semibold">Оставить заявку</span>
        </div>
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />
      </a>

      {/* FLOATING MAX BUTTON */}
      <a
        href={MAX_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] group flex items-center gap-3 pl-3 pr-5 py-3 transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "linear-gradient(135deg, #16a34a, #15803d)",
          boxShadow: "0 0 24px rgba(22,163,74,0.5), 0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <span className="relative flex-shrink-0 w-9 h-9">
          <span className="animate-radar-ping absolute inset-0 rounded-full bg-green-400 opacity-40" />
          <span className="relative flex h-9 w-9 items-center justify-center bg-white/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5h-3v6h-3v-6h-3V7h9v2.5z" />
            </svg>
          </span>
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-oswald text-[10px] tracking-widest text-green-200 uppercase">Консультация по изготовлению</span>
          <span className="font-oswald text-base tracking-wider text-white font-semibold">Написать в MAX</span>
        </div>
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />
      </a>
    </>
  );
}