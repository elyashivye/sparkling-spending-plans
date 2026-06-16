import { createFileRoute, Link } from "@tanstack/react-router";
import { bothDates, hebrewMonth, gregorianMonth } from "@/lib/hebrew-date";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  ChevronDown,
  BarChart3,
  Receipt,
  ArrowUpCircle,
  HelpCircle,
  Settings,
  WalletCards,
  CalendarCheck,
  ClipboardList,
  Lightbulb,
  Trophy,
  Heart,
  Sparkles,
  Zap,
  X,
} from "lucide-react";
import { useState } from "react";
import { FloatingAdd } from "@/components/quick-add";
import houseImg from "@/assets/house-3d.png";
import suitcaseImg from "@/assets/suitcase-3d.png";
import coupleImg from "@/assets/couple-avatar.png";

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

const navItems = [
  { label: "בית", to: "/", Icon: Home, active: true },
  { label: "הוצאות", to: "/expenses", Icon: Receipt },
  { label: "הכנסות", to: "/income", Icon: ArrowUpCircle },
  { label: "תקציבים", to: "/budgets", Icon: Target },
  { label: "תזרים", to: "/cashflow", Icon: TrendingUp },
  { label: "יעדים וחסכונות", to: "/goals", Icon: Heart },
  { label: "מנויים וקבועים", to: "/subscriptions", Icon: ClipboardList },
  { label: "דוחות", to: "/reports", Icon: BarChart3 },
  { label: "תובנות", to: "/insights", Icon: Lightbulb },
  { label: "הגדרות", to: "/settings", Icon: Settings },
] as const;

function nf(n: number) {
  return n.toLocaleString("he-IL");
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile layout */}
      <div className="lg:hidden pb-28">
        <MobileLayout />
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <DesktopTopBar />
          <div className="px-8 py-6">
            <DesktopGrid />
          </div>
        </main>
      </div>

      {/* Floating + button - both layouts */}
      <FloatingAdd />
    </div>
  );
}

/* =================== MOBILE =================== */
function MobileLayout() {
  return (
    <div className="mx-auto w-full max-w-[600px] px-4 pt-6 space-y-6">
      <MobileTopBar />
      <FreeMoneyCard />
      <BudgetCard />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <GoalCard goal={goals[0]} withImage />
        <ForecastCard />
      </div>
      <RecentExpensesCard limit={3} />
      <MobileBottomNav />
    </div>
  );
}

function MobileTopBar() {
  const bottomTos = new Set(["/income", "/expenses", "/", "/reports", "/goals"]);
  const extras = navItems.filter((n) => !bottomTos.has(n.to));
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex items-center gap-2">
        <button className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card shadow-[var(--shadow-card)] relative">
          <Bell className="h-5 w-5 text-foreground/70" />
          <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <img src={coupleImg} alt="משפחת לוי" width={44} height={44}
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-card shadow-[var(--shadow-card)]" />
      </div>
      <div className="min-w-0 text-center">
        <h1 className="truncate text-xl font-extrabold">בוקר טוב ☀️</h1>
        <p className="truncate text-xs text-muted-foreground">
          כיף לראות שאתם כאן שוב <span className="text-primary">💜</span>
        </p>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card shadow-[var(--shadow-card)]">
            <Menu className="h-5 w-5 text-foreground/70" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[88%] max-w-[360px] p-0 flex flex-col">
          <SheetHeader className="border-b border-border px-5 py-4 text-right">
            <SheetTitle className="flex items-center gap-2 text-base font-extrabold">
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-primary-soft">
                <WalletCards className="h-4 w-4 text-primary" />
              </div>
              הכיס המשפחתי
            </SheetTitle>
          </SheetHeader>
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <img src={coupleImg} alt="" className="h-11 w-11 rounded-full object-cover" />
            <div className="leading-tight">
              <div className="text-[11px] text-muted-foreground">משפחת</div>
              <div className="text-sm font-bold">משפחת לוי</div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}
                activeOptions={{ exact: true }}
                className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-foreground/75 hover:bg-muted data-[status=active]:bg-primary-soft data-[status=active]:text-primary">
                <span>{item.label}</span>
                <item.Icon className="h-4 w-4" />
              </Link>
            ))}
          </nav>
          <div className="m-4 rounded-2xl bg-primary-soft p-4 text-center">
            <div className="text-sm font-bold text-primary">כל הכבוד! 🎉</div>
            <p className="mt-1 text-xs text-foreground/70">עמדתם בתקציב 3 חודשים ברצף</p>
          </div>
          {/* keep extras referenced for future use */}
          <span className="sr-only">{extras.length}</span>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MobileBottomNav() {
  const items = [
    { label: "הכנסות", to: "/income", Icon: Wallet },
    { label: "הוצאות", to: "/expenses", Icon: Receipt },
    { label: "בית", to: "/", Icon: Home, active: true },
    { label: "דוחות", to: "/reports", Icon: BarChart3 },
    { label: "יעדים", to: "/goals", Icon: Target },
  ] as const;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
      <div className="mx-auto max-w-[600px] px-4 pb-3">
        <div className="rounded-t-3xl bg-card pt-3 pb-2 shadow-[0_-10px_30px_-10px_oklch(0.5_0.1_270/0.15)]">
          <div className="grid grid-cols-5 items-end">
            {items.map((it, i) => (
              <Link key={it.to} to={it.to} className="flex flex-col items-center gap-1 text-xs">
                {i === 2 ? (
                  <>
                    <div className="h-6" />
                    <span className="mt-1 font-bold text-primary">{it.label}</span>
                  </>
                ) : (
                  <>
                    <it.Icon className={`h-5 w-5 ${"active" in it ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={"active" in it ? "font-bold text-primary" : "text-muted-foreground"}>{it.label}</span>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* =================== DESKTOP =================== */
function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-l border-border bg-card flex flex-col">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft">
          <WalletCards className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-extrabold">הכיס המשפחתי</h2>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}
            activeOptions={{ exact: true }}
            className="flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition text-foreground/70 hover:bg-muted data-[status=active]:bg-primary-soft data-[status=active]:text-primary">
            <span>{item.label}</span>
            <item.Icon className="h-4 w-4" />
          </Link>
        ))}
      </nav>
      <div className="m-4 rounded-2xl bg-primary-soft p-4 text-center">
        <div className="text-sm font-bold text-primary">כל הכבוד! 🎉</div>
        <p className="mt-1 text-xs text-foreground/70">עמדתם בתקציב 3 חודשים ברצף</p>
        <button className="mt-3 w-full rounded-xl bg-primary py-2 text-xs font-bold text-primary-foreground">
          ראה הישגים
        </button>
      </div>
    </aside>
  );
}

function DesktopTopBar() {
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card px-8 py-4">
      <div className="flex items-center gap-3">
        <img src={coupleImg} alt="משפחת לוי" width={44} height={44}
          className="h-11 w-11 rounded-full object-cover" />
        <div className="leading-tight">
          <div className="text-xs text-muted-foreground">👋 היי</div>
          <button className="flex items-center gap-1 text-sm font-bold">
            משפחת לוי <ChevronDown className="h-3 w-3" />
          </button>
        </div>
        <div className="mr-4 flex items-center gap-2">
          <IconBtn Icon={Bell} dot />
          <IconBtn Icon={HelpCircle} />
          <IconBtn Icon={Settings} />
        </div>
      </div>
      <div className="min-w-0 text-center">
        <h1 className="truncate text-2xl font-extrabold">ברוך שובך, משפחת לוי ☀️</h1>
        <p className="text-sm text-muted-foreground">{bothDates()}</p>
      </div>
      <div />
    </header>
  );
}

function IconBtn({ Icon, dot }: { Icon: typeof Bell; dot?: boolean }) {
  return (
    <button className="relative grid h-10 w-10 place-items-center rounded-xl text-foreground/60 hover:bg-muted">
      <Icon className="h-5 w-5" />
      {dot && <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-destructive" />}
    </button>
  );
}

function DesktopGrid() {
  return (
    <div className="grid gap-6 grid-cols-12">
      {/* Row 1 */}
      <div className="col-span-4">
        <HealthCard />
      </div>
      <div className="col-span-8">
        <FreeMoneyDesktop />
      </div>

      {/* Row 2 */}
      <div className="col-span-4">
        <ForecastCard />
      </div>
      <div className="col-span-8">
        <BudgetCard />
      </div>

      {/* Row 3 */}
      <div className="col-span-4">
        <GoalsListCard />
      </div>
      <div className="col-span-4">
        <RecentExpensesCard limit={4} />
      </div>
      <div className="col-span-4">
        <InsightsCard />
      </div>
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
            <circle cx="70" cy="70" r="60" stroke="oklch(0.93 0.02 295)" strokeWidth="12" fill="none" />
            <circle cx="70" cy="70" r="60" stroke="oklch(0.62 0.21 295)" strokeWidth="12" fill="none"
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

/* Cute pastel decorative background for hero cards */
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

/* ---------- Free money mobile card ---------- */
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

/* ---------- Budget Card (works for both) ---------- */
function BudgetCard() {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 h-full">
      <SectionHeader title="תקציב לפי קטגוריות" />
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
      {/* Mobile */}
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

      {/* Desktop */}
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

/* ---------- Goal Cards ---------- */
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
      <SectionHeader title="יעדים וחסכונות" />
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
      <button className="mt-5 w-full rounded-2xl border border-border py-2.5 text-sm font-bold text-foreground/70 hover:bg-muted">
        כל היעדים
      </button>
    </section>
  );
}

/* ---------- Forecast ---------- */
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
              <stop offset="0%" stopColor="oklch(0.62 0.21 295)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="oklch(0.62 0.21 295)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="url(#g)" />
          <path d={path} fill="none" stroke="oklch(0.62 0.21 295)" strokeWidth="2.5" strokeLinecap="round" />
          {points.map((p, i) => {
            const x = i * step;
            const y = H - ((p - min) / (max - min || 1)) * (H - 20) - 10;
            return <circle key={i} cx={x} cy={y} r={3} fill="oklch(0.62 0.21 295)" />;
          })}
        </svg>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">תחזית לסוף 18.05.2024 — <span className="font-bold text-foreground">{nf(2120)} ₪</span></p>
    </section>
  );
}

/* ---------- Recent Expenses ---------- */
function RecentExpensesCard({ limit = 4 }: { limit?: number }) {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 h-full">
      <SectionHeader title="הוצאות אחרונות" />
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

/* ---------- Insights ---------- */
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
      <button className="mt-4 w-full rounded-2xl bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90">
        כל התובנות
      </button>
    </section>
  );
}

function SectionHeader({ title, hideAction }: { title: string; hideAction?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-bold sm:text-lg">{title}</h3>
      {!hideAction && (
        <button className="flex items-center gap-0.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <span>הצג הכל</span><ChevronLeft className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

/* ---------- Floating + Button (both layouts) ---------- */
function FloatingAdd({ open, setOpen }: { open: boolean; setOpen: (b: boolean) => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}
      <div className="fixed left-1/2 bottom-6 z-50 -translate-x-1/2 lg:bottom-8">
        {open && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[320px] rounded-3xl bg-card p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-bold flex items-center gap-1">
                <Zap className="h-4 w-4 text-primary" /> הוספת הוצאה מהירה
              </h4>
            </div>
            <input
              type="text"
              placeholder="0"
              defaultValue="120"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-right text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <button className="flex items-center justify-center gap-1 rounded-xl border border-border bg-background px-2 py-2 font-semibold">
                <span>הערה</span>
              </button>
              <button className="flex items-center justify-center gap-1 rounded-xl border border-border bg-background px-2 py-2 font-semibold">
                <span>סופר וקניות</span>
              </button>
              <button className="flex items-center justify-center gap-1 rounded-xl border border-border bg-background px-2 py-2 font-semibold">
                <span>כרטיס אשראי</span>
              </button>
            </div>
            <button className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground">
              שמור הוצאה
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl ring-4 ring-background transition hover:scale-105"
          aria-label="הוסף הוצאה"
        >
          {open ? <X className="h-7 w-7" /> : <Plus className="h-8 w-8" />}
        </button>
      </div>
    </>
  );
}
