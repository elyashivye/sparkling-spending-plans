import { useState } from "react";
import {
  Plus, X, Zap, ShoppingCart, Car, Home, UtensilsCrossed, Baby, Heart,
  Fuel, Coffee, CreditCard, Gift, Plane, Smartphone, ChevronRight,
  type LucideIcon,
} from "lucide-react";

type Cat = { key: string; label: string; Icon: LucideIcon; bg: string; color: string };

const categories: Cat[] = [
  { key: "super", label: "סופר וקניות", Icon: ShoppingCart, bg: "bg-success-soft", color: "text-success" },
  { key: "car", label: "רכב", Icon: Car, bg: "bg-warning-soft", color: "text-warning" },
  { key: "fuel", label: "דלק", Icon: Fuel, bg: "bg-warning-soft", color: "text-warning" },
  { key: "home", label: "בית ומשק", Icon: Home, bg: "bg-teal-soft", color: "text-teal" },
  { key: "rest", label: "מסעדות", Icon: UtensilsCrossed, bg: "bg-pink-soft", color: "text-destructive" },
  { key: "coffee", label: "בתי קפה", Icon: Coffee, bg: "bg-pink-soft", color: "text-destructive" },
  { key: "kids", label: "ילדים", Icon: Baby, bg: "bg-primary-soft", color: "text-primary" },
  { key: "health", label: "בריאות", Icon: Heart, bg: "bg-info-soft", color: "text-info" },
  { key: "card", label: "כרטיס אשראי", Icon: CreditCard, bg: "bg-info-soft", color: "text-info" },
  { key: "gifts", label: "מתנות", Icon: Gift, bg: "bg-pink-soft", color: "text-destructive" },
  { key: "travel", label: "נסיעות", Icon: Plane, bg: "bg-info-soft", color: "text-info" },
  { key: "phone", label: "טלפון וגאדג'טים", Icon: Smartphone, bg: "bg-muted", color: "text-foreground/70" },
];

export function FloatingAdd() {
  const [open, setOpen] = useState(false);
  const [pickCat, setPickCat] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [cat, setCat] = useState<Cat>(categories[0]);
  const [amount, setAmount] = useState("120");

  const close = () => {
    setOpen(false);
    setPickCat(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Category picker overlay */}
      {open && pickCat && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-card p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-base font-bold">בחר קטגוריה</h4>
              <button
                onClick={() => setPickCat(false)}
                className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted"
                aria-label="סגור"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {categories.map((c) => {
                const active = c.key === cat.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => {
                      setCat(c);
                      setPickCat(false);
                    }}
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition ${
                      active ? "border-primary bg-primary-soft" : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <div className={`grid h-11 w-11 place-items-center rounded-2xl ${c.bg}`}>
                      <c.Icon className={`h-5 w-5 ${c.color}`} />
                    </div>
                    <span className="text-xs font-semibold leading-tight">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="fixed left-1/2 bottom-6 z-50 -translate-x-1/2 lg:bottom-8">
        {open && !pickCat && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[340px] rounded-3xl bg-card p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold flex items-center gap-1">
                <Zap className="h-4 w-4 text-primary" /> הוספת הוצאה מהירה
              </h4>
            </div>

            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-right text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setShowNote((v) => !v)}
                className={`flex items-center justify-between gap-1 rounded-xl border px-3 py-2 font-semibold transition ${
                  showNote || note ? "border-primary bg-primary-soft text-primary" : "border-border bg-background"
                }`}
              >
                <span>הערה{note ? ` • ${note.slice(0, 8)}${note.length > 8 ? "…" : ""}` : ""}</span>
                <ChevronRight className={`h-3.5 w-3.5 transition ${showNote ? "rotate-90" : ""}`} />
              </button>
              <button
                onClick={() => setPickCat(true)}
                className="flex items-center justify-between gap-1 rounded-xl border border-border bg-background px-3 py-2 font-semibold hover:border-primary/40"
              >
                <span className="flex items-center gap-1.5">
                  <span className={`grid h-5 w-5 place-items-center rounded-md ${cat.bg}`}>
                    <cat.Icon className={`h-3 w-3 ${cat.color}`} />
                  </span>
                  {cat.label}
                </span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {showNote && (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="הוסף הערה להוצאה..."
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            )}

            <button
              onClick={() => {
                // TODO: persist
                close();
                setNote("");
                setShowNote(false);
              }}
              className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground"
            >
              שמור הוצאה
            </button>
          </div>
        )}

        <button
          onClick={() => (open ? close() : setOpen(true))}
          className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl ring-4 ring-background transition hover:scale-105"
          aria-label="הוסף הוצאה"
        >
          {open ? <X className="h-7 w-7" /> : <Plus className="h-8 w-8" />}
        </button>
      </div>
    </>
  );
}
