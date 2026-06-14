import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  Menu,
  Wallet,
  PiggyBank,
  CalendarDays,
  ShoppingCart,
  Car,
  Home,
  UtensilsCrossed,
  Baby,
  Target,
  TrendingUp,
  Fuel,
  Coffee,
  Plus,
  ChevronLeft,
  BarChart3,
  Receipt,
  ArrowUpCircle,
} from "lucide-react";
import houseImg from "@/assets/house-3d.png";
import suitcaseImg from "@/assets/suitcase-3d.png";
import coupleImg from "@/assets/couple-avatar.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "כיס משפחתי - ניהול כלכלת בית חכם" },
      { name: "description", content: "מערכת חכמה לניהול תקציב משפחתי, מעקב הוצאות והכנסות בכיף ובקלות." },
      { property: "og:title", content: "כיס משפחתי - ניהול כלכלת בית" },
      { property: "og:description", content: "תקציב, הוצאות, יעדים וחיסכון - הכל במקום אחד." },
    ],
  }),
  component: Index,
});

type BudgetRow = {
  label: string;
  spent: number;
  budget: number;
  color: string; // tailwind bg-class for bar
  iconBg: string;
  iconColor: string;
  Icon: typeof ShoppingCart;
};

const budgets: BudgetRow[] = [
  { label: "סופר", spent: 2800, budget: 3200, color: "bg-success", iconBg: "bg-success-soft", iconColor: "text-success", Icon: ShoppingCart },
  { label: "רכב ותחבורה", spent: 650, budget: 1200, color: "bg-warning", iconBg: "bg-warning-soft", iconColor: "text-warning", Icon: Car },
  { label: "בית", spent: 750, budget: 1800, color: "bg-teal", iconBg: "bg-teal-soft", iconColor: "text-teal", Icon: Home },
  { label: "מסעדות ובילויים", spent: 1200, budget: 1000, color: "bg-destructive", iconBg: "bg-pink-soft", iconColor: "text-destructive", Icon: UtensilsCrossed },
  { label: "ילדים", spent: 700, budget: 1000, color: "bg-primary", iconBg: "bg-primary-soft", iconColor: "text-primary", Icon: Baby },
];

const recentExpenses = [
  { title: "שופרסל דיל", category: "סופר", amount: 245, when: "היום, 08:45", Icon: ShoppingCart, iconBg: "bg-success-soft", iconColor: "text-success" },
  { title: "פז ירושלים", category: "דלק", amount: 320, when: "אתמול, 17:32", Icon: Fuel, iconBg: "bg-warning-soft", iconColor: "text-warning" },
  { title: "קפה לנדוור", category: "בילויים", amount: 48, when: "אתמול, 09:12", Icon: Coffee, iconBg: "bg-pink-soft", iconColor: "text-destructive" },
];

function nf(n: number) {
  return n.toLocaleString("he-IL");
}

function Index() {
  return (
    <div className="min-h-screen bg-background pb-28 lg:pb-10">
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-6 lg:px-8 lg:pt-8">
        <TopBar />

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Right column (in RTL, this renders on the right) */}
          <div className="space-y-6 lg:col-span-8">
            <FreeMoneyCard />
            <BudgetCard />
            <div className="grid gap-6 md:grid-cols-2">
              <GoalCard />
              <ForecastCard />
            </div>
          </div>

          {/* Left column */}
          <div className="space-y-6 lg:col-span-4">
            <RecentExpensesCard />
            <InsightsCard />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ---------- Top Bar ---------- */
function TopBar() {
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex items-center gap-2">
        <button className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card shadow-[var(--shadow-card)] relative">
          <Bell className="h-5 w-5 text-foreground/70" />
          <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <img
          src={coupleImg}
          alt="משפחת לוי"
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-card shadow-[var(--shadow-card)]"
        />
        <div className="hidden lg:flex flex-col leading-tight pr-1">
          <span className="text-xs text-muted-foreground">👋 היי</span>
          <span className="text-sm font-bold">משפחת לוי</span>
        </div>
      </div>

      <div className="min-w-0 text-center">
        <h1 className="truncate text-xl font-extrabold sm:text-2xl">
          בוקר טוב <span>☀️</span>
        </h1>
        <p className="truncate text-xs text-muted-foreground sm:text-sm">
          כיף לראות שאתם כאן שוב <span className="text-primary">💜</span>
        </p>
      </div>

      <button className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card shadow-[var(--shadow-card)]">
        <Menu className="h-5 w-5 text-foreground/70" />
      </button>
    </header>
  );
}

/* ---------- Free Money Hero Card ---------- */
function FreeMoneyCard() {
  return (
    <section className="overflow-hidden rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="grid grid-cols-[140px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
        <img
          src={houseImg}
          alt="בית"
          width={300}
          height={300}
          className="h-auto w-full select-none"
        />
        <div className="min-w-0 text-left">
          <div className="flex items-center justify-start gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <CalendarDays className="h-4 w-4" />
            <span>מצב החודש • מאי 2024</span>
          </div>
          <h2 className="mt-2 text-base font-semibold text-foreground/80 sm:text-lg">
            כסף חופשי החודש
          </h2>
          <div className="mt-1 flex items-baseline justify-start gap-2">
            <span className="text-3xl font-extrabold text-success sm:text-5xl">
              {nf(4880)}
            </span>
            <span className="text-xl font-bold text-success/70 sm:text-2xl">₪</span>
          </div>
          <div className="mx-0 mt-1 h-1.5 w-28 rounded-full bg-success/30 sm:w-40" />
          <p className="mt-3 text-xs text-muted-foreground sm:text-sm">
            מתוך {nf(18500)} ₪ הכנסות צפויות
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5 sm:gap-6">
        <Stat
          value={4180}
          label="חסכנו עד היום"
          color="text-primary"
          iconBg="bg-primary-soft"
          iconColor="text-primary"
          Icon={PiggyBank}
        />
        <Stat
          value={3200}
          label="הוצאות צפויות"
          color="text-warning"
          iconBg="bg-warning-soft"
          iconColor="text-warning"
          Icon={CalendarDays}
        />
        <Stat
          value={10420}
          label="הוצאות עד היום"
          color="text-info"
          iconBg="bg-info-soft"
          iconColor="text-info"
          Icon={Wallet}
        />
      </div>
    </section>
  );
}

function Stat({
  value, label, color, iconBg, iconColor, Icon,
}: {
  value: number; label: string; color: string; iconBg: string; iconColor: string;
  Icon: typeof Wallet;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <div className={`text-base font-extrabold sm:text-lg ${color}`}>
          {nf(value)} <span className="text-xs font-bold opacity-70">₪</span>
        </div>
        <div className="truncate text-[11px] text-muted-foreground sm:text-xs">{label}</div>
      </div>
    </div>
  );
}

/* ---------- Budget Card ---------- */
function BudgetCard() {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <SectionHeader title="התקציב שלי" />
      <div className="mt-4 divide-y divide-border">
        {budgets.map((b) => (
          <BudgetItem key={b.label} {...b} />
        ))}
      </div>
    </section>
  );
}

function BudgetItem({ label, spent, budget, color, iconBg, iconColor, Icon }: BudgetRow) {
  const over = spent > budget;
  const pct = Math.min(100, (spent / budget) * 100);
  const diff = budget - spent;
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <span className="font-semibold">{label}</span>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span className={over ? "font-bold text-destructive" : "font-bold text-success"}>
            {over ? `חריגה ${nf(Math.abs(diff))} ₪` : `נשארו ${nf(diff)} ₪`}
          </span>
          <span className="font-semibold text-foreground">
            {nf(spent)} / {nf(budget)} ₪
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Goal Card ---------- */
function GoalCard() {
  const current = 24600;
  const goal = 40000;
  const pct = Math.round((current / goal) * 100);
  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary-soft p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-primary sm:text-lg">
          יעד קרוב <Target className="inline h-4 w-4" />
        </h3>
      </div>
      <p className="mt-2 text-sm text-foreground/70">חופשה משפחתית 🏝️</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold sm:text-3xl">{nf(current)}</span>
        <span className="text-sm text-muted-foreground">/ {nf(goal)} ₪</span>
      </div>
      <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-card">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <img src={suitcaseImg} alt="" width={64} height={64} className="h-16 w-16 -mb-2" />
        <span className="rounded-full bg-card px-3 py-1 text-sm font-bold text-primary">
          {pct}%
        </span>
      </div>
    </section>
  );
}

/* ---------- Forecast Card ---------- */
function ForecastCard() {
  // simple polyline mini-chart
  const points = [20, 35, 28, 50, 42, 55, 38, 60];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const W = 280;
  const H = 100;
  const step = W / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = H - ((p - min) / (max - min || 1)) * (H - 20) - 10;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-info sm:text-lg">
          תזרים החודש <TrendingUp className="inline h-4 w-4" />
        </h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">צפי ליתרה בסוף החודש</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-success sm:text-3xl">+{nf(2340)}</span>
        <span className="text-sm text-success/80">₪</span>
      </div>
      <div className="relative mt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-24 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.65 0.15 245)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="oklch(0.65 0.15 245)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="url(#g)" />
          <path d={path} fill="none" stroke="oklch(0.55 0.18 245)" strokeWidth="2.5" strokeLinecap="round" />
          {points.map((p, i) => {
            const x = i * step;
            const y = H - ((p - min) / (max - min || 1)) * (H - 20) - 10;
            return <circle key={i} cx={x} cy={y} r={3} fill="oklch(0.55 0.18 245)" />;
          })}
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-md bg-info px-2 py-0.5 text-[10px] font-bold text-white">
          היום
        </div>
      </div>
    </section>
  );
}

/* ---------- Recent Expenses ---------- */
function RecentExpensesCard() {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <SectionHeader title="הוצאות אחרונות" />
      <ul className="mt-3 divide-y divide-border">
        {recentExpenses.map((e) => (
          <li key={e.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${e.iconBg}`}>
              <e.Icon className={`h-5 w-5 ${e.iconColor}`} />
            </div>
            <div className="min-w-0">
              <div className="truncate font-semibold">{e.title}</div>
              <div className="truncate text-xs text-muted-foreground">{e.category}</div>
            </div>
            <div className="text-left">
              <div className="font-extrabold">-{nf(e.amount)} <span className="text-xs">₪</span></div>
              <div className="text-[11px] text-muted-foreground">{e.when}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Insights Card ---------- */
function InsightsCard() {
  const items = [
    { text: "ההוצאות בסופר שלך גבוהות ב-23% מהממוצע של החודשים האחרונים", Icon: ShoppingCart, color: "text-success", bg: "bg-success-soft" },
    { text: "אם תמשיכו בקצב הנוכחי, תחרגו ב-1,700 ₪ מהתקציב החודשי", Icon: ArrowUpCircle, color: "text-destructive", bg: "bg-pink-soft" },
    { text: "חסכתם החודש 1,240 ₪ יותר מהחודש שעבר! כל הכבוד 🎉", Icon: TrendingUp, color: "text-primary", bg: "bg-primary-soft" },
  ];
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <SectionHeader title="תובנות בשבילך ✨" hideAction />
      <ul className="mt-3 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${it.bg}`}>
              <it.Icon className={`h-4 w-4 ${it.color}`} />
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">{it.text}</p>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full rounded-2xl bg-primary py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90">
        כל התובנות
      </button>
    </section>
  );
}

/* ---------- Shared ---------- */
function SectionHeader({ title, hideAction }: { title: string; hideAction?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold">{title}</h3>
      {!hideAction && (
        <button className="flex items-center gap-0.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <span>הצג הכל</span>
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

/* ---------- Bottom Nav (mobile) ---------- */
function BottomNav() {
  const items = [
    { label: "הכנסות", Icon: Wallet },
    { label: "הוצאות", Icon: Receipt },
    { label: "בית", Icon: Home, active: true },
    { label: "דוחות", Icon: BarChart3 },
    { label: "יעדים", Icon: Target },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="relative mx-auto max-w-[600px] px-4 pb-3">
        <div className="relative rounded-t-3xl bg-card pt-3 pb-2 shadow-[0_-10px_30px_-10px_oklch(0.5_0.1_270/0.15)]">
          <div className="grid grid-cols-5 items-end">
            {items.map((it, i) => (
              <div key={it.label} className="flex flex-col items-center gap-1 text-xs">
                {i === 2 ? <div className="h-6" /> : (
                  <>
                    <it.Icon className={`h-5 w-5 ${it.active ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={it.active ? "font-bold text-primary" : "text-muted-foreground"}>{it.label}</span>
                  </>
                )}
                {i === 2 && (
                  <span className="mt-1 font-bold text-primary">{it.label}</span>
                )}
              </div>
            ))}
          </div>
          <button className="absolute left-1/2 -top-7 -translate-x-1/2 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
            <Plus className="h-7 w-7" />
          </button>
        </div>
      </div>
    </nav>
  );
}
