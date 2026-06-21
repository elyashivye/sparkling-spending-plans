import { createFileRoute, Link } from "@tanstack/react-router";
import { hebrewMonth, gregorianMonth } from "@/lib/hebrew-date";
import {
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
  ChevronLeft,
  ChevronDown,
  CalendarCheck,
  WalletCards,
  Trophy,
  Heart,
  Sparkles,
  Zap,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import houseImg from "@/assets/house-3d.png";
import suitcaseImg from "@/assets/suitcase-3d.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "הכיס המשפחתי - ניהול כלכלת בית חכם" },
      { name: "description", content: "מערכת חכמה לניהול תקציב משפחתי, מעקב הוצאות והכנסות בכיף ובקלות." },
      { property: "og:title", content: "הכיס המשפחתי" },
      { property: "og:description", content: "תקציב, הוצאות, יעדים וחיסכון - הכל במקום אחד." },
    ],
  }),
  component: Index,
});

type BudgetRow = {
  label: string;
  spent: number;
  budget: number;
  color: string;
  iconBg: string;
  iconColor: string;
  Icon: typeof ShoppingCart;
};

const budgets: BudgetRow[] = [
  { label: "סופר וקניות", spent: 2800, budget: 3200, color: "bg-success", iconBg: "bg-success-soft", iconColor: "text-success", Icon: ShoppingCart },
  { label: "רכב ותחבורה", spent: 650, budget: 1200, color: "bg-warning", iconBg: "bg-warning-soft", iconColor: "text-warning", Icon: Car },
  { label: "בית ומשק", spent: 750, budget: 1800, color: "bg-teal", iconBg: "bg-teal-soft", iconColor: "text-teal", Icon: Home },
  { label: "מסעדות ובילויים", spent: 1200, budget: 1000, color: "bg-destructive", iconBg: "bg-pink-soft", iconColor: "text-destructive", Icon: UtensilsCrossed },
  { label: "ילדים וחינוך", spent: 700, budget: 1000, color: "bg-primary", iconBg: "bg-primary-soft", iconColor: "text-primary", Icon: Baby },
];

const recentExpenses = [
  { title: "שופרסל דיל", category: "סופר", amount: 245, when: "היום, 08:45", Icon: ShoppingCart, iconBg: "bg-success-soft", iconColor: "text-success" },
  { title: "פז ירושלים", category: "דלק", amount: 320, when: "אתמול, 17:32", Icon: Fuel, iconBg: "bg-warning-soft", iconColor: "text-warning" },
  { title: "קפה לנדוור", category: "בילויים", amount: 48, when: "אתמול, 09:12", Icon: Coffee, iconBg: "bg-pink-soft", iconColor: "text-destructive" },
  { title: "פארם לאופר", category: "בריאות", amount: 120, when: "12.05, 14:21", Icon: Heart, iconBg: "bg-info-soft", iconColor: "text-info" },
];

const goals = [
  { label: "חופשת קיץ 🏝️", current: 24600, goal: 40000, color: "from-primary to-info" },
  { label: "קרן חירום 🛡️", current: 18000, goal: 30000, color: "from-info to-primary" },
];

const insights = [
  { text: "ההוצאות בסופר שלך גבוהות ב-23% מהממוצע של החודשים האחרונים", Icon: ShoppingCart, color: "text-success", bg: "bg-success-soft" },
  { text: "אם תמשיכו בקצב הנוכחי, תחרגו ב-1,700 ₪ מהתקציב החודשי", Icon: Zap, color: "text-destructive", bg: "bg-pink-soft" },
  { text: "חסכתם החודש 1,240 ₪ יותר מהחודש שעבר! כל הכבוד 🏆", Icon: Trophy, color: "text-warning", bg: "bg-warning-soft" },
];

function nf(n: number) {
  return n.toLocaleString("he-IL");
}

function Index() {
  return (
    <AppShell
      title="ברוך שובך, משפחת לוי ☀️"
      mobileChildren={
        <div className="space-y-6">
          <FreeMoneyCard />
          <BudgetCard />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GoalCard goal={goals[0]} withImage />
            <ForecastCard />
          </div>
          <RecentExpensesCard limit={3} />
        </div>
      }
    >
      <DesktopGrid />
    </AppShell>
  );
}

function DesktopGrid() {
  return (
    <div className="grid gap-6 grid-cols-12">
      <div className="col-span-4"><HealthCard /></div>
      <div className="col-span-8"><FreeMoneyDesktop /></div>
      <div className="col-span-4"><ForecastCard /></div>
      <div className="col-span-8"><BudgetCard /></div>
      <div className="col-span-4"><GoalsListCard /></div>
      <div className="col-span-4"><RecentExpensesCard limit={4} /></div>
      <div className="col-span-4"><InsightsCard /></div>
    </div>
  );
}

function HealthCard() {
  const score = 82;
  const pct = score / 100;
  const C = 2 * Math.PI * 60;
  return (
    <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-primary">בריאות כלכלית</h3>
        <Sparkles className="h-4 w-4 text-primary" />
      </div>
      <div className="mt-4 grid place-items-center">
        <div className="relative h-36 w-36">
          <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
            <circle cx="70" cy="70" r="60" stroke="var(--color-muted)" strokeWidth="12" fill="none" />
            <circle cx="70" cy="70" r="60" stroke="var(--color-primary)" strokeWidth="12" fill="none"
              strokeDasharray={C} strokeDashoffset={C * (1 - pct)} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="text-4xl font-extrabold">{score}</div>
              <div className="text-xs text-muted-foreground">מצב מעולה</div>
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">
          +7 מהחודש שעבר
        </div>
      </div>
    </section>
  );
}

function FreeMoneyDesktop() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] h-full">
      <CuteBg />
      <div className="relative grid grid-cols-[160px_minmax(0,1fr)_auto] items-center gap-4">
        <img src={houseImg} alt="בית" width={300} height={300} className="h-32 w-auto drop-shadow-lg" />
        <div className="text-center">
          <h2 className="text-sm font-semibold text-foreground/70">כסף חופשי החודש</h2>
          <div className="mt-1 flex items-baseline justify-center gap-1.5">
            <span className="text-5xl font-extrabold text-success">{nf(4880)}</span>
            <span className="text-lg font-bold text-success/70">₪</span>
          </div>
          <div className="mx-auto mt-2 h-1.5 w-32 rounded-full bg-success/30" />
          <p className="mt-2 text-xs text-muted-foreground">מתוך {nf(18500)} ₪ הכנסות צפויות</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-success-soft">
          <Wallet className="h-6 w-6 text-success" />
        </div>
      </div>
      <div className="relative mt-6 grid grid-cols-4 gap-3 border-t border-border pt-5">
        <StatTile value={18500} label="הכנסות צפויות" color="text-success" Icon={PiggyBank} iconBg="bg-success-soft" iconColor="text-success" />
        <StatTile value={3200} label="הוצאות צפויות" color="text-warning" Icon={CalendarCheck} iconBg="bg-warning-soft" iconColor="text-warning" />
        <StatTile value={10420} label="הוצאות עד כה" color="text-info" Icon={WalletCards} iconBg="bg-info-soft" iconColor="text-info" />
        <StatTile value={4180} label="חסכון עד כה" color="text-primary" Icon={PiggyBank} iconBg="bg-primary-soft" iconColor="text-primary" />
      </div>
    </section>
  );
}

function CuteBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-primary-soft opacity-70 blur-2xl" />
      <div className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-info-soft opacity-60 blur-2xl" />
      <div className="absolute top-6 left-10 h-16 w-16 rounded-full bg-warning-soft opacity-60 blur-xl" />
    </div>
  );
}

function StatTile({ value, label, color, Icon, iconBg, iconColor }: {
  value: number; label: string; color: string; Icon: typeof Wallet; iconBg: string; iconColor: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className={`grid h-9 w-9 place-items-center rounded-xl ${iconBg}`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`text-lg font-extrabold ${color}`}>{nf(value)} <span className="text-xs">₪</span></div>
    </div>
  );
}

function FreeMoneyCard() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <CuteBg />
      <div className="relative grid grid-cols-[140px_minmax(0,1fr)] items-center gap-4">
        <img src={houseImg} alt="בית" width={300} height={300} className="h-auto w-full" />
        <div className="min-w-0 text-left">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-4 w-4" /><span>מצב החודש • {gregorianMonth()} • {hebrewMonth()}</span>
          </div>
          <h2 className="mt-2 text-base font-semibold text-foreground/80">כסף חופשי החודש</h2>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-success">{nf(4880)}</span>
            <span className="text-xl font-bold text-success/70">₪</span>
          </div>
          <div className="mt-1 h-1.5 w-28 rounded-full bg-success/30" />
          <p className="mt-3 text-xs text-muted-foreground">מתוך {nf(18500)} ₪ הכנסות צפויות</p>
        </div>
      </div>
      <div className="relative mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
        <Stat value={4180} label="חסכנו עד היום" color="text-primary" iconBg="bg-primary-soft" iconColor="text-primary" Icon={PiggyBank} />
        <Stat value={3200} label="הוצאות צפויות" color="text-warning" iconBg="bg-warning-soft" iconColor="text-warning" Icon={CalendarDays} />
        <Stat value={10420} label="הוצאות עד היום" color="text-info" iconBg="bg-info-soft" iconColor="text-info" Icon={Wallet} />
      </div>
    </section>
  );
}

function Stat({ value, label, color, iconBg, iconColor, Icon }: {
  value: number; label: string; color: string; iconBg: string; iconColor: string; Icon: typeof Wallet;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <div className={`text-sm font-extrabold ${color}`}>{nf(value)} <span className="text-[10px] opacity-70">₪</span></div>
        <div className="truncate text-[11px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function BudgetCard() {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 h-full">
      <SectionHeader title="תקציב לפי קטגוריות" to="/budgets" />
      <div className="hidden lg:grid mt-3 grid-cols-[1fr_1.2fr_2fr_auto] gap-4 px-1 text-xs font-semibold text-muted-foreground">
        <div>קטגוריה</div>
        <div className="text-center">הוצאתי</div>
        <div className="text-center">מה נשאר</div>
        <div className="text-center min-w-[80px]">תקציב</div>
      </div>
      <div className="mt-2 divide-y divide-border">
        {budgets.map((b) => <BudgetItem key={b.label} {...b} />)}
      </div>
    </section>
  );
}

function BudgetItem({ label, spent, budget, color, iconBg, iconColor, Icon }: BudgetRow) {
  const over = spent > budget;
  const pct = Math.min(100, (spent / budget) * 100);
  const diff = budget - spent;
  return (
    <>
      <div className="lg:hidden grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 py-4">
        <div className="flex items-center gap-3">
          <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <span className="font-semibold">{label}</span>
        </div>
        <div className="col-span-2">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className={over ? "font-bold text-destructive" : "font-bold text-success"}>
              {over ? `חריגה ${nf(Math.abs(diff))} ₪` : `נשארו ${nf(diff)} ₪`}
            </span>
            <span className="font-semibold text-foreground">{nf(spent)} / {nf(budget)} ₪</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-[1fr_1.2fr_2fr_auto] items-center gap-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${iconBg}`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
          <span className="text-sm font-semibold">{label}</span>
        </div>
        <div className="text-center text-sm font-semibold">{nf(spent)} ₪</div>
        <div className="flex items-center gap-3">
          {over ? (
            <span className="rounded-full bg-pink-soft px-2 py-0.5 text-[11px] font-bold text-destructive">חריגה</span>
          ) : <span className="w-12" />}
          <div className="flex-1 h-2 overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
          </div>
          <span className={`text-sm font-bold ${over ? "text-destructive" : "text-success"} min-w-[60px] text-left`}>
            {over ? `-${nf(Math.abs(diff))}` : nf(diff)} ₪
          </span>
        </div>
        <div className="text-center text-sm font-semibold min-w-[80px]">{nf(budget)} ₪</div>
      </div>
    </>
  );
}

function GoalCard({ goal, withImage }: { goal: typeof goals[number]; withImage?: boolean }) {
  const pct = Math.round((goal.current / goal.goal) * 100);
  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary-soft p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-primary">יעד קרוב <Target className="inline h-4 w-4" /></h3>
      </div>
      <p className="mt-2 text-sm text-foreground/70">{goal.label}</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold">{nf(goal.current)}</span>
        <span className="text-sm text-muted-foreground">/ {nf(goal.goal)} ₪</span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-card">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        {withImage && <img src={suitcaseImg} alt="" width={56} height={56} className="h-14 w-14 -mb-2" />}
        <span className="rounded-full bg-card px-3 py-1 text-sm font-bold text-primary">{pct}%</span>
      </div>
    </section>
  );
}

function GoalsListCard() {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] h-full">
      <SectionHeader title="יעדים וחסכונות" to="/goals" />
      <div className="mt-4 space-y-5">
        {goals.map((g) => {
          const pct = Math.round((g.current / g.goal) * 100);
          return (
            <div key={g.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{g.label}</span>
                <span className="text-xs text-muted-foreground">{nf(g.current)} / {nf(g.goal)} ₪</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full bg-gradient-to-l ${g.color}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-1 text-left text-xs font-bold text-primary">{pct}%</div>
            </div>
          );
        })}
      </div>
      <Link to="/goals" className="mt-5 block w-full rounded-2xl border border-border py-2.5 text-center text-sm font-bold text-foreground/70 hover:bg-muted">
        כל היעדים
      </Link>
    </section>
  );
}

function ForecastCard() {
  const points = [20, 35, 28, 50, 42, 55, 38, 60, 52, 64];
  const max = Math.max(...points), min = Math.min(...points);
  const W = 280, H = 110;
  const step = W / (points.length - 1);
  const path = points.map((p, i) => {
    const x = i * step;
    const y = H - ((p - min) / (max - min || 1)) * (H - 20) - 10;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-primary">תזרים החודש <TrendingUp className="inline h-4 w-4" /></h3>
        <button className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-foreground/70">
          {gregorianMonth()} <ChevronDown className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-success">+{nf(2340)} ₪</span>
        <span className="text-xs text-muted-foreground">צפי ליתרה בסוף החודש</span>
      </div>
      <div className="relative mt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-28 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="url(#g)" />
          <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
          {points.map((p, i) => {
            const x = i * step;
            const y = H - ((p - min) / (max - min || 1)) * (H - 20) - 10;
            return <circle key={i} cx={x} cy={y} r={3} fill="var(--color-primary)" />;
          })}
        </svg>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">תחזית לסוף 18.05.2024 — <span className="font-bold text-foreground">{nf(2120)} ₪</span></p>
    </section>
  );
}

function RecentExpensesCard({ limit = 4 }: { limit?: number }) {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 h-full">
      <SectionHeader title="הוצאות אחרונות" to="/expenses" />
      <ul className="mt-3 divide-y divide-border">
        {recentExpenses.slice(0, limit).map((e) => (
          <li key={e.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${e.iconBg}`}>
              <e.Icon className={`h-5 w-5 ${e.iconColor}`} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{e.title}</div>
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

function InsightsCard() {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 h-full">
      <SectionHeader title="תובנות בשבילך ✨" hideAction />
      <ul className="mt-3 space-y-3">
        {insights.map((it, i) => (
          <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${it.bg}`}>
              <it.Icon className={`h-4 w-4 ${it.color}`} />
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">{it.text}</p>
          </li>
        ))}
      </ul>
      <Link to="/insights" className="mt-4 block w-full rounded-2xl bg-primary py-2.5 text-center text-sm font-bold text-primary-foreground hover:opacity-90">
        כל התובנות
      </Link>
    </section>
  );
}

function SectionHeader({ title, hideAction, to }: { title: string; hideAction?: boolean; to?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-bold sm:text-lg">{title}</h3>
      {!hideAction && to && (
        <Link to={to} className="flex items-center gap-0.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <span>הצג הכל</span><ChevronLeft className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
