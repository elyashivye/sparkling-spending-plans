import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Menu,
  Wallet,
  Home,
  Target,
  TrendingUp,
  Plus,
  ChevronDown,
  BarChart3,
  Receipt,
  ArrowUpCircle,
  HelpCircle,
  Settings,
  WalletCards,
  ClipboardList,
  Lightbulb,
  Heart,
  Zap,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import coupleImg from "@/assets/couple-avatar.png";
import { bothDates } from "@/lib/hebrew-date";

type NavItem = { label: string; to: string; Icon: LucideIcon };

export const navItems: NavItem[] = [
  { label: "בית", to: "/", Icon: Home },
  { label: "הוצאות", to: "/expenses", Icon: Receipt },
  { label: "הכנסות", to: "/income", Icon: ArrowUpCircle },
  { label: "תקציבים", to: "/budgets", Icon: Target },
  { label: "תזרים", to: "/cashflow", Icon: TrendingUp },
  { label: "יעדים וחסכונות", to: "/goals", Icon: Heart },
  { label: "מנויים וקבועים", to: "/subscriptions", Icon: ClipboardList },
  { label: "דוחות", to: "/reports", Icon: BarChart3 },
  { label: "תובנות", to: "/insights", Icon: Lightbulb },
  { label: "הגדרות", to: "/settings", Icon: Settings },
];

const mobileNav: NavItem[] = [
  { label: "הכנסות", to: "/income", Icon: Wallet },
  { label: "הוצאות", to: "/expenses", Icon: Receipt },
  { label: "בית", to: "/", Icon: Home },
  { label: "דוחות", to: "/reports", Icon: BarChart3 },
  { label: "יעדים", to: "/goals", Icon: Target },
];

export function AppShell({
  title,
  subtitle,
  children,
  mobileChildren,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  mobileChildren?: ReactNode;
}) {
  const [quickAdd, setQuickAdd] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile */}
      <div className="lg:hidden pb-28">
        <div className="mx-auto w-full max-w-[600px] px-4 pt-6 space-y-6">
          <MobileTopBar title={title} subtitle={subtitle} />
          {mobileChildren ?? children}
        </div>
        <MobileBottomNav />
      </div>
      {/* Desktop */}
      <div className="hidden lg:flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <DesktopTopBar title={title} subtitle={subtitle} />
          <div className="px-8 py-6">{children}</div>
        </main>
      </div>
      <FloatingAdd open={quickAdd} setOpen={setQuickAdd} />
    </div>
  );
}

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 border-l border-border bg-card flex flex-col">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border shrink-0">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft">
          <WalletCards className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-extrabold">הכיס המשפחתי</h2>
      </div>
      <nav className="flex-1 min-h-0 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                active ? "bg-primary-soft text-primary" : "text-foreground/70 hover:bg-muted"
              }`}
            >
              <span>{item.label}</span>
              <item.Icon className="h-4 w-4" />
            </Link>
          );
        })}
      </nav>
      <div className="m-4 shrink-0 rounded-2xl bg-primary-soft p-4 text-center">
        <div className="text-sm font-bold text-primary">כל הכבוד! 🎉</div>
        <p className="mt-1 text-xs text-foreground/70">עמדתם בתקציב 3 חודשים ברצף</p>
      </div>
    </aside>
  );
}

export const mobileBottomTos = new Set(["/income", "/expenses", "/", "/reports", "/goals"]);

function DesktopTopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card px-8 py-4">
      <div className="flex items-center gap-3">
        <img src={coupleImg} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
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
        <h1 className="truncate text-2xl font-extrabold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle ?? bothDates()}</p>
      </div>
      <div />
    </header>
  );
}

function MobileTopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const extras = navItems.filter((n) => !mobileBottomTos.has(n.to));
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
      <button className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card shadow-[var(--shadow-card)] relative">
        <Bell className="h-5 w-5 text-foreground/70" />
        <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-destructive" />
      </button>
      <div className="min-w-0 text-center">
        <h1 className="truncate text-lg font-extrabold">{title}</h1>
        <p className="truncate text-[11px] text-muted-foreground">{subtitle ?? bothDates()}</p>
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
              עוד אפשרויות
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
            {extras.map((item) => (
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
        </SheetContent>
      </Sheet>
    </header>
  );
}

function IconBtn({ Icon, dot }: { Icon: LucideIcon; dot?: boolean }) {
  return (
    <button className="relative grid h-10 w-10 place-items-center rounded-xl text-foreground/60 hover:bg-muted">
      <Icon className="h-5 w-5" />
      {dot && <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-destructive" />}
    </button>
  );
}

function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
      <div className="mx-auto max-w-[600px] px-4 pb-3">
        <div className="rounded-t-3xl bg-card pt-3 pb-2 shadow-[0_-10px_30px_-10px_oklch(0.5_0.1_270/0.15)]">
          <div className="grid grid-cols-5 items-end">
            {mobileNav.map((it, i) => {
              const active = pathname === it.to;
              if (i === 2) {
                return (
                  <div key={it.to} className="flex flex-col items-center gap-1 text-xs">
                    <div className="h-6" />
                    <Link to={it.to} className={`mt-1 font-bold ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {it.label}
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className="flex flex-col items-center gap-1 text-xs"
                >
                  <it.Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={active ? "font-bold text-primary" : "text-muted-foreground"}>{it.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

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
              <button className="rounded-xl border border-border bg-background px-2 py-2 font-semibold">הערה</button>
              <button className="rounded-xl border border-border bg-background px-2 py-2 font-semibold">סופר וקניות</button>
              <button className="rounded-xl border border-border bg-background px-2 py-2 font-semibold">כרטיס אשראי</button>
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

/* ---------- shared UI primitives ---------- */
export function Section({ title, action, children, className = "" }: {
  title?: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section className={`rounded-3xl bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Pill({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "success" | "warning" | "info" | "destructive" | "muted" }) {
  const map = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    info: "bg-info-soft text-info",
    destructive: "bg-pink-soft text-destructive",
    muted: "bg-muted text-foreground/70",
  } as const;
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${map[tone]}`}>{children}</span>;
}
