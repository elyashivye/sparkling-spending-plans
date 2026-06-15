import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart, Car, Home, UtensilsCrossed, Baby, Plus, Sparkles, type LucideIcon } from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { nf, shekel, hebrewMonth, gregorianMonth } from "@/lib/hebrew-date";

export const Route = createFileRoute("/budgets")({
  head: () => ({ meta: [{ title: "תקציבים - הכיס המשפחתי" }] }),
  component: BudgetsPage,
});

type B = { label: string; spent: number; budget: number; color: string; bg: string; ic: string; Icon: LucideIcon };

const budgets: B[] = [
  { label: "סופר וקניות", spent: 2800, budget: 3200, color: "bg-success", bg: "bg-success-soft", ic: "text-success", Icon: ShoppingCart },
  { label: "רכב ותחבורה", spent: 650, budget: 1200, color: "bg-warning", bg: "bg-warning-soft", ic: "text-warning", Icon: Car },
  { label: "בית ומשק", spent: 750, budget: 1800, color: "bg-teal", bg: "bg-teal-soft", ic: "text-teal", Icon: Home },
  { label: "מסעדות ובילויים", spent: 1200, budget: 1000, color: "bg-destructive", bg: "bg-pink-soft", ic: "text-destructive", Icon: UtensilsCrossed },
  { label: "ילדים וחינוך", spent: 700, budget: 1000, color: "bg-primary", bg: "bg-primary-soft", ic: "text-primary", Icon: Baby },
];

function BudgetsPage() {
  const total = budgets.reduce((s, b) => s + b.budget, 0);
  const spent = budgets.reduce((s, b) => s + b.spent, 0);
  const pct = Math.round((spent / total) * 100);

  return (
    <AppShell title="תקציבים" subtitle={`${hebrewMonth()} • ${gregorianMonth()}`}>
      <div className="space-y-6">
        <Section>
          <div className="grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">תקציב חודשי</div>
              <div className="mt-1 text-3xl font-extrabold text-primary">{shekel(total)}</div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs font-semibold">
                <span>נוצל</span><span>{pct}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-l from-primary to-info" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{shekel(spent)} הוצאה</span><span>נשארו {shekel(total - spent)}</span>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">
              <Plus className="h-4 w-4" /> קטגוריה
            </button>
          </div>
        </Section>

        <div className="grid gap-4 lg:grid-cols-2">
          {budgets.map(b => {
            const p = Math.min(100, Math.round((b.spent / b.budget) * 100));
            const over = b.spent > b.budget;
            const diff = b.budget - b.spent;
            return (
              <Section key={b.label} className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl ${b.bg}`}>
                      <b.Icon className={`h-6 w-6 ${b.ic}`} />
                    </div>
                    <div>
                      <div className="font-bold">{b.label}</div>
                      <div className="text-xs text-muted-foreground">{shekel(b.spent)} מתוך {shekel(b.budget)}</div>
                    </div>
                  </div>
                  {over ? <Pill tone="destructive">חריגה {shekel(Math.abs(diff))}</Pill> : <Pill tone="success">נשארו {shekel(diff)}</Pill>}
                </div>
                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${b.color}`} style={{ width: `${p}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-muted-foreground">{p}% מהתקציב</span>
                  <button className="font-semibold text-primary">פירוט →</button>
                </div>
              </Section>
            );
          })}
        </div>

        <Section title="המלצות חכמות" action={<Sparkles className="h-4 w-4 text-primary" />}>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li className="flex gap-2"><span className="text-primary">•</span> מומלץ להעלות תקציב "מסעדות ובילויים" ב-200 ₪ — חרגתם 3 חודשים ברציפות.</li>
            <li className="flex gap-2"><span className="text-primary">•</span> חסכתם 450 ₪ בקטגוריית "רכב" — אפשר להעביר ליעד "חופשת קיץ".</li>
          </ul>
        </Section>
      </div>
    </AppShell>
  );
}
