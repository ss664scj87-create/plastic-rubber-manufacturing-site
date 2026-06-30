import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_ORDER_URL =
  "https://functions.poehali.dev/85f005a0-449a-4c18-ab87-11e17bfd6b08";

export default function CallbackWidget() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          comment: "Запрос обратного звонка",
          email: "",
        }),
      });
    } catch (_e) { /* ignore network errors */ }
    setLoading(false);
    setSent(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSent(false);
      setPhone("");
      setName("");
    }, 300);
  };

  return (
    <>
      {/* Кнопка */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[89] flex items-center gap-2 px-4 py-2.5 font-oswald text-sm tracking-wider transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #e85d04, #f59e0b)",
          boxShadow: "0 0 20px rgba(232,93,4,0.5), 0 4px 16px rgba(0,0,0,0.4)",
          color: "#0d0d0d",
        }}
      >
        <span className="relative flex-shrink-0 w-5 h-5">
          <span className="animate-ping absolute inset-0 rounded-full bg-orange opacity-50" />
          <Icon name="Phone" size={14} className="relative" style={{ color: "#0d0d0d" }} />
        </span>
        <span className="hidden sm:inline">Обратный звонок</span>
      </button>

      {/* Оверлей */}
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-md bg-card border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Оранжевая полоса */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #e85d04, #f59e0b)" }} />

            <div className="p-8">
              {/* Закрыть */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 border border-border flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
              >
                <Icon name="X" size={14} />
              </button>

              {!sent ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #e85d04, #f59e0b)" }}
                    >
                      <Icon name="PhoneCall" size={22} style={{ color: "#0d0d0d" }} />
                    </div>
                    <div>
                      <div className="tech-label text-orange mb-0.5">// ОБРАТНЫЙ ЗВОНОК</div>
                      <h3 className="font-oswald text-2xl">Перезвоним за 15 минут</h3>
                    </div>
                  </div>

                  <p className="font-ibm text-sm text-muted-foreground mb-6 leading-relaxed">
                    Оставьте номер — наш инженер свяжется с вами в рабочее время (Пн–Пт, 8:00–18:00).
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Icon name="User" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-background border border-border pl-9 pr-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Icon name="Phone" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="tel"
                        required
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-background border border-border pl-9 pr-4 py-3 font-ibm text-sm focus:border-orange focus:outline-none transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 font-oswald text-sm tracking-widest disabled:opacity-60 transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #e85d04, #f59e0b)", color: "#0d0d0d" }}
                    >
                      <Icon name={loading ? "Loader" : "PhoneCall"} size={15} />
                      {loading ? "ОТПРАВЛЯЕМ..." : "ПЕРЕЗВОНИТЕ МНЕ"}
                    </button>
                    <p className="font-ibm text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-2 border-orange flex items-center justify-center mx-auto mb-5">
                    <Icon name="CheckCheck" size={30} className="text-orange" />
                  </div>
                  <h3 className="font-oswald text-2xl mb-2">ЗАЯВКА ПРИНЯТА</h3>
                  <p className="font-ibm text-sm text-muted-foreground mb-6">
                    Перезвоним вам в течение рабочего дня
                  </p>
                  <button
                    onClick={handleClose}
                    className="border border-border px-6 py-2 font-oswald text-sm tracking-wider hover:border-orange hover:text-orange transition-all"
                  >
                    ЗАКРЫТЬ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
