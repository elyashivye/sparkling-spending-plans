import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { nf, shekel, hebrewMonth, gregorianMonth, hebrewDate } from "@/lib/hebrew-date";

export const Route = createFileRoute("/cashflow")({
  head: () => ({ meta: [{ title: "תזרים - הכיס המשפחתי" }] }),
  component: CashflowPage,
});

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const balance = days.map(d => 18500 - d * 320 + Math.sin(d / 3) * 600 + (d > 25 ? 2000 : 0));

function CashflowPage() {
  const W = 720, H = 220;
  const max = Math.max(...balance), min = Math.min(...balance);
  const step = W / (balance.length - 1);
  const points = balance.map((v, i) => {
    const x = i * step;
    const y = H - ((v - min) / (max - min || 1)) * (H - 30) - 15;
    return { x, y, v };
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  const upcoming = [
    { d: 18, label: "ארנונה", amt: -540 },
    { d: 22, label: "משכורת דנה", amt: 12500 },
    { d: 25, label: "ביטוח רכב", amt: -450 },
    { d: 28, label: "חוג ג'ודו", amt: -280 },
  ];

  return (
    <AppShell title="תזרים מזומנים" subtitle={`תחזית • ${hebrewMonth()} • ${gregorianMonth()}`}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <KPI Icon={Wallet} label="יתרה נוכחית" value={8420} tone="primary" />
          <KPI Icon={TrendingUp} label="צפי הכנסות נותרות" value={5700} tone="success" />
          <KPI Icon={TrendingDown} label="צפי הוצאות נותרות" value={3200} tone="warning" />
        </div>

        <Section title="תחזית תזרים" action={<Pill tone="info">סוף החודש: {shekel(2120)}</Pill>}>
          <svg viewBox={`0 0 ${W} ${H}`} className="h-56 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cf" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.62 0.21 295)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="oklch(0.62 0.21 295)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="url(#cf)" />
            <path d={path} fill="none" stroke="oklch(0.62 0.21 295)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" x2={W} y1={H - 15} y2={H - 15} stroke="oklch(0.93 0.008 270)" strokeDasharray="4 4" />
          </svg>
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            <span>תחילת חודש</span><span>אמצע</span><span>סוף חודש</span>
          </div>
        </Section>

        <Section title="אירועים עתידיים">
          <ul className="divide-y divide-border">
            {upcoming.map(u => {
              const date = new Date(new Date().getFullYear(), new Date().getMonth(), u.d);
              const pos = u.amt > 0;
              return (
                <li key={u.d} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-muted text-center text-xs font-bold leading-none">
                    <span>{u.d}<br/><span className="text-[9px] text-muted-foreground font-normal">{date.toLocaleDateString("he-IL", { month: "short" })}</span></span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{u.label}</div>
                    <div className="text-[11px] text-muted-foreground">{hebrewDate(date)}</div>
                  </div>
                  <div className={`text-left font-extrabold ${pos ? "text-success" : "text-destructive"}`}>
                    {pos ? "+" : ""}{nf(u.amt)} <span className="text-xs">₪</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      </div>
    </AppShell>
  );
}

function KPI({ Icon, label, value, tone }: { Icon: typeof Wallet; label: string; value: number; tone: "primary" | "success" | "warning" }) {
  const map = { primary: ["text-primary", "bg-primary-soft"], success: ["text-success", "bg-success-soft"], warning: ["text-warning", "bg-warning-soft"] } as const;
  return (
    <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <div className={`grid h-10 w-10 place-items-center rounded-2xl ${map[tone][1]}`}>
        <Icon className={`h-5 w-5 ${map[tone][0]}`} />
      </div>
      <div className="mt-3 text-xs text-muted-foreground">{label}</div>
      <div className={`text-2xl font-extrabold ${map[tone][0]}`}>{shekel(value)}</div>
    </div>
  );
}
