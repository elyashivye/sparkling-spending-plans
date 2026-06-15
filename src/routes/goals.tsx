import { createFileRoute } from "@tanstack/react-router";
import { Plus, Plane, Shield, GraduationCap, Car, Home, Sparkles, type LucideIcon } from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { nf, shekel, hebrewDate } from "@/lib/hebrew-date";

export const Route = createFileRoute("/goals")({
  head: () => ({ meta: [{ title: "יעדים וחסכונות - הכיס המשפחתי" }] }),
  component: GoalsPage,
});

type Goal = {
  title: string; emoji: string; current: number; target: number;
  monthly: number; deadline: Date; Icon: LucideIcon; tone: string;
};

const goals: Goal[] = [
  { title: "חופשת קיץ ביוון", emoji: "🏝️", current: 24600, target: 40000, monthly: 1500, deadline: new Date(2026, 6, 1), Icon: Plane, tone: "from-primary to-info" },
  { title: "קרן חירום", emoji: "🛡️", current: 18000, target: 30000, monthly: 800, deadline: new Date(2026, 11, 1), Icon: Shield, tone: "from-info to-teal" },
  { title: "לימודי איתי", emoji: "🎓", current: 8000, target: 50000, monthly: 500, deadline: new Date(2029, 8, 1), Icon: GraduationCap, tone: "from-warning to-pink" },
  { title: "החלפת רכב", emoji: "🚗", current: 12000, target: 70000, monthly: 1200, deadline: new Date(2028, 0, 1), Icon: Car, tone: "from-teal to-success" },
  { title: "שיפוץ בית", emoji: "🏠", current: 5500, target: 25000, monthly: 600, deadline: new Date(2027, 3, 1), Icon: Home, tone: "from-primary to-pink" },
];

function GoalsPage() {
  const totalSaved = goals.reduce((s, g) => s + g.current, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalMonthly = goals.reduce((s, g) => s + g.monthly, 0);

  return (
    <AppShell title="יעדים וחסכונות">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="סך החסכונות" value={totalSaved} tone="text-primary" />
          <Stat label="יעד כולל" value={totalTarget} tone="text-info" />
          <Stat label="חיסכון חודשי" value={totalMonthly} tone="text-success" />
        </div>

        <Section title="היעדים שלנו" action={
          <button className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
            <Plus className="h-3 w-3" /> יעד חדש
          </button>
        }>
          <div className="grid gap-4 lg:grid-cols-2">
            {goals.map(g => {
              const pct = Math.round((g.current / g.target) * 100);
              const remaining = g.target - g.current;
              const monthsLeft = Math.ceil(remaining / g.monthly);
              return (
                <div key={g.title} className="rounded-3xl border border-border p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${g.tone} text-2xl`}>
                        {g.emoji}
                      </div>
                      <div>
                        <div className="font-bold">{g.title}</div>
                        <div className="text-xs text-muted-foreground">יעד: {hebrewDate(g.deadline)}</div>
                      </div>
                    </div>
                    <Pill tone="primary">{pct}%</Pill>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <div className="text-xl font-extrabold">{nf(g.current)} <span className="text-sm text-muted-foreground">/ {nf(g.target)} ₪</span></div>
                    <div className="text-xs text-success font-semibold">+{nf(g.monthly)} ₪/חודש</div>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full bg-gradient-to-l ${g.tone}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>נותרו {shekel(remaining)}</span>
                    <span>~{monthsLeft} חודשים</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="טיפ" action={<Sparkles className="h-4 w-4 text-primary" />}>
          <p className="text-sm text-foreground/80">
            אם תעבירו 200 ₪ נוספים בחודש ל"חופשת קיץ" — תגיעו ליעד 3 חודשים מוקדם יותר. 💜
          </p>
        </Section>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-extrabold ${tone}`}>{shekel(value)}</div>
    </div>
  );
}
