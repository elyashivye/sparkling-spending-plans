import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Gift, TrendingUp, Repeat, Plus, ArrowUpCircle, type LucideIcon } from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { nf, shekel, hebrewMonth, gregorianMonth, hebrewDate } from "@/lib/hebrew-date";

export const Route = createFileRoute("/income")({
  head: () => ({ meta: [{ title: "הכנסות - הכיס המשפחתי" }] }),
  component: IncomePage,
});

type Income = {
  id: number; title: string; source: string; amount: number; date: Date;
  recurring: boolean; Icon: LucideIcon; bg: string; color: string;
};

const t = new Date();
const d = (off: number) => new Date(t.getFullYear(), t.getMonth(), t.getDate() - off);

const incomes: Income[] = [
  { id: 1, title: "משכורת - דנה", source: "חברת היי טק", amount: 12500, date: d(2), recurring: true, Icon: Briefcase, bg: "bg-success-soft", color: "text-success" },
  { id: 2, title: "משכורת - יואב", source: "עצמאי", amount: 8800, date: d(4), recurring: true, Icon: Briefcase, bg: "bg-success-soft", color: "text-success" },
  { id: 3, title: "החזר ביטוח", source: "כלל ביטוח", amount: 320, date: d(7), recurring: false, Icon: Repeat, bg: "bg-info-soft", color: "text-info" },
  { id: 4, title: "מתנת יום הולדת", source: "סבא וסבתא", amount: 500, date: d(10), recurring: false, Icon: Gift, bg: "bg-primary-soft", color: "text-primary" },
  { id: 5, title: "דיבידנד תיק השקעות", source: "מיטב", amount: 410, date: d(14), recurring: false, Icon: TrendingUp, bg: "bg-warning-soft", color: "text-warning" },
];

function IncomePage() {
  const total = incomes.reduce((s, i) => s + i.amount, 0);
  const recurring = incomes.filter(i => i.recurring).reduce((s, i) => s + i.amount, 0);
  return (
    <AppShell title="הכנסות" subtitle={`${hebrewMonth()} • ${gregorianMonth()}`}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Tile title="סה״כ החודש" value={total} accent="from-success to-teal" Icon={ArrowUpCircle} />
          <Tile title="קבועות" value={recurring} accent="from-primary to-info" Icon={Repeat} />
          <Tile title="חד-פעמיות" value={total - recurring} accent="from-warning to-pink" Icon={Gift} />
        </div>

        <Section title="הכנסות החודש" action={
          <button className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
            <Plus className="h-3 w-3" /> הוספה
          </button>
        }>
          <ul className="divide-y divide-border">
            {incomes.map(i => (
              <li key={i.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-4">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${i.bg}`}>
                  <i.Icon className={`h-5 w-5 ${i.color}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold">{i.title}</span>
                    {i.recurring && <Pill tone="success">חוזרת</Pill>}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{i.source} • {hebrewDate(i.date)}</div>
                </div>
                <div className="text-left text-base font-extrabold text-success">+{nf(i.amount)} <span className="text-xs opacity-70">₪</span></div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="מקורות הכנסה">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "משכורת", pct: 92, color: "bg-success" },
              { label: "צד שלישי", pct: 4, color: "bg-info" },
              { label: "השקעות", pct: 2, color: "bg-warning" },
              { label: "מתנות", pct: 2, color: "bg-primary" },
            ].map(s => (
              <div key={s.label}>
                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                  <span>{s.label}</span><span className="text-muted-foreground">{s.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </AppShell>
  );
}

function Tile({ title, value, accent, Icon }: { title: string; value: number; accent: string; Icon: LucideIcon }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${accent} p-5 text-white shadow-[var(--shadow-card)]`}>
      <Icon className="absolute -top-2 -left-2 h-24 w-24 opacity-10" />
      <div className="text-xs opacity-90">{title}</div>
      <div className="mt-1 text-2xl font-extrabold">{shekel(value)}</div>
    </div>
  );
}
