import { createFileRoute } from "@tanstack/react-router";
import { Tv, Music, Dumbbell, Wifi, Phone, Cloud, BookOpen, Plus, AlertTriangle, type LucideIcon } from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { nf, shekel, hebrewDate } from "@/lib/hebrew-date";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({ meta: [{ title: "מנויים וקבועים - הכיס המשפחתי" }] }),
  component: SubsPage,
});

type Sub = { name: string; amount: number; cycle: "חודשי" | "שנתי"; next: Date; Icon: LucideIcon; bg: string; color: string; used?: boolean };

const t = new Date();
const fwd = (off: number) => new Date(t.getFullYear(), t.getMonth(), t.getDate() + off);

const subs: Sub[] = [
  { name: "נטפליקס", amount: 55, cycle: "חודשי", next: fwd(3), Icon: Tv, bg: "bg-destructive/10", color: "text-destructive", used: true },
  { name: "ספוטיפיי משפחתי", amount: 33, cycle: "חודשי", next: fwd(8), Icon: Music, bg: "bg-success-soft", color: "text-success", used: true },
  { name: "חדר כושר", amount: 180, cycle: "חודשי", next: fwd(12), Icon: Dumbbell, bg: "bg-warning-soft", color: "text-warning", used: false },
  { name: "סלקום אינטרנט", amount: 89, cycle: "חודשי", next: fwd(2), Icon: Wifi, bg: "bg-info-soft", color: "text-info", used: true },
  { name: "פלאפון", amount: 120, cycle: "חודשי", next: fwd(5), Icon: Phone, bg: "bg-teal-soft", color: "text-teal", used: true },
  { name: "iCloud 200GB", amount: 14, cycle: "חודשי", next: fwd(15), Icon: Cloud, bg: "bg-primary-soft", color: "text-primary", used: true },
  { name: "כתב עת מקצועי", amount: 480, cycle: "שנתי", next: fwd(60), Icon: BookOpen, bg: "bg-pink-soft", color: "text-destructive", used: false },
];

function SubsPage() {
  const monthly = subs.filter(s => s.cycle === "חודשי").reduce((s, x) => s + x.amount, 0);
  const yearly = subs.filter(s => s.cycle === "שנתי").reduce((s, x) => s + x.amount, 0);
  const total = monthly * 12 + yearly;
  const unused = subs.filter(s => !s.used);

  return (
    <AppShell title="מנויים וקבועים">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card label="חודשי" value={monthly} tone="text-primary" />
          <Card label="שנתי (סה״כ)" value={total} tone="text-info" sub={`כולל ${shekel(yearly)} שנתיים`} />
          <Card label="לא בשימוש" value={unused.reduce((s, x) => s + x.amount, 0)} tone="text-destructive" sub={`${unused.length} מנויים`} />
        </div>

        {unused.length > 0 && (
          <Section className="!bg-pink-soft border border-destructive/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
              <div>
                <div className="font-bold text-destructive">חיסכון אפשרי</div>
                <p className="mt-1 text-sm text-foreground/80">
                  זיהינו {unused.length} מנויים שלא נעשה בהם שימוש בחודש האחרון. ביטול יחסוך לכם {shekel(unused.reduce((s, x) => s + x.amount, 0))} בחודש.
                </p>
              </div>
            </div>
          </Section>
        )}

        <Section title="כל המנויים" action={
          <button className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
            <Plus className="h-3 w-3" /> חדש
          </button>
        }>
          <ul className="divide-y divide-border">
            {subs.map(s => (
              <li key={s.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-4">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${s.bg}`}>
                  <s.Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{s.name}</span>
                    {!s.used && <Pill tone="destructive">לא בשימוש</Pill>}
                  </div>
                  <div className="text-xs text-muted-foreground">חיוב הבא: {hebrewDate(s.next)}</div>
                </div>
                <div className="text-left">
                  <div className="font-extrabold">{nf(s.amount)} <span className="text-xs">₪</span></div>
                  <div className="text-[11px] text-muted-foreground">{s.cycle}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </AppShell>
  );
}

function Card({ label, value, tone, sub }: { label: string; value: number; tone: string; sub?: string }) {
  return (
    <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-extrabold ${tone}`}>{shekel(value)}</div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}
