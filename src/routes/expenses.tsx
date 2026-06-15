import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search, Filter, ShoppingCart, Car, Home, UtensilsCrossed, Baby, Fuel, Coffee, Heart,
  Plus, ChevronDown, Calendar, type LucideIcon,
} from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { nf, shekel, hebrewDate } from "@/lib/hebrew-date";

export const Route = createFileRoute("/expenses")({
  head: () => ({ meta: [{ title: "הוצאות - הכיס המשפחתי" }] }),
  component: ExpensesPage,
});

type Category = "סופר" | "רכב" | "בית" | "בילויים" | "ילדים" | "בריאות";

type Expense = {
  id: number; title: string; category: Category; amount: number; date: Date;
  Icon: LucideIcon; iconBg: string; iconColor: string;
};

const today = new Date();
const day = (d: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - d);

const all: Expense[] = [
  { id: 1, title: "שופרסל דיל", category: "סופר", amount: 245, date: day(0), Icon: ShoppingCart, iconBg: "bg-success-soft", iconColor: "text-success" },
  { id: 2, title: "פז דלק", category: "רכב", amount: 320, date: day(1), Icon: Fuel, iconBg: "bg-warning-soft", iconColor: "text-warning" },
  { id: 3, title: "קפה לנדוור", category: "בילויים", amount: 48, date: day(1), Icon: Coffee, iconBg: "bg-pink-soft", iconColor: "text-destructive" },
  { id: 4, title: "סופר פארם", category: "בריאות", amount: 120, date: day(3), Icon: Heart, iconBg: "bg-info-soft", iconColor: "text-info" },
  { id: 5, title: "חוג ג'ודו - איתי", category: "ילדים", amount: 280, date: day(4), Icon: Baby, iconBg: "bg-primary-soft", iconColor: "text-primary" },
  { id: 6, title: "ארנונה", category: "בית", amount: 540, date: day(5), Icon: Home, iconBg: "bg-teal-soft", iconColor: "text-teal" },
  { id: 7, title: "מסעדת קלאודיוס", category: "בילויים", amount: 380, date: day(6), Icon: UtensilsCrossed, iconBg: "bg-pink-soft", iconColor: "text-destructive" },
  { id: 8, title: "ביטוח רכב", category: "רכב", amount: 450, date: day(8), Icon: Car, iconBg: "bg-warning-soft", iconColor: "text-warning" },
  { id: 9, title: "ויקטורי", category: "סופר", amount: 412, date: day(10), Icon: ShoppingCart, iconBg: "bg-success-soft", iconColor: "text-success" },
  { id: 10, title: "אייס קופי", category: "בילויים", amount: 38, date: day(11), Icon: Coffee, iconBg: "bg-pink-soft", iconColor: "text-destructive" },
];

const categories: Array<Category | "הכל"> = ["הכל", "סופר", "רכב", "בית", "בילויים", "ילדים", "בריאות"];

function ExpensesPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("הכל");
  const [q, setQ] = useState("");

  const filtered = useMemo(() =>
    all.filter(e => (active === "הכל" || e.category === active) && (q === "" || e.title.includes(q))),
    [active, q]
  );
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const grouped = useMemo(() => {
    const m = new Map<string, Expense[]>();
    filtered.forEach(e => {
      const k = e.date.toDateString();
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(e);
    });
    return Array.from(m.entries());
  }, [filtered]);

  return (
    <AppShell title="הוצאות" subtitle={`${filtered.length} הוצאות • ${shekel(total)}`}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryTile label="סה״כ החודש" value={10420} tone="info" />
          <SummaryTile label="ממוצע יומי" value={Math.round(10420 / 14)} tone="primary" />
          <SummaryTile label="הוצאה גדולה" value={540} tone="warning" sub="ארנונה" />
        </div>

        <Section>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="חיפוש הוצאה..."
                className="w-full rounded-2xl border border-border bg-background py-2.5 pr-10 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold">
              <Filter className="h-4 w-4" /> סינון
            </button>
            <button className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">
              <Plus className="h-4 w-4" /> הוצאה חדשה
            </button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  active === c ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70 hover:bg-primary-soft"
                }`}>{c}</button>
            ))}
          </div>
        </Section>

        <div className="space-y-5">
          {grouped.map(([k, items]) => {
            const d = new Date(k);
            const dayTotal = items.reduce((s, e) => s + e.amount, 0);
            return (
              <Section key={k}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Calendar className="h-4 w-4 text-primary" />
                    {d.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" })}
                  </div>
                  <Pill tone="muted">{hebrewDate(d)} • {shekel(dayTotal)}</Pill>
                </div>
                <ul className="divide-y divide-border">
                  {items.map(e => (
                    <li key={e.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
                      <div className={`grid h-11 w-11 place-items-center rounded-2xl ${e.iconBg}`}>
                        <e.Icon className={`h-5 w-5 ${e.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{e.title}</div>
                        <div className="truncate text-xs text-muted-foreground">{e.category}</div>
                      </div>
                      <div className="text-left text-sm font-extrabold">-{nf(e.amount)} <span className="text-[10px] opacity-70">₪</span></div>
                    </li>
                  ))}
                </ul>
              </Section>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function SummaryTile({ label, value, tone, sub }: { label: string; value: number; tone: "info" | "primary" | "warning"; sub?: string }) {
  const map = { info: "text-info", primary: "text-primary", warning: "text-warning" };
  return (
    <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-extrabold ${map[tone]}`}>{nf(value)} <span className="text-sm">₪</span></div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
