import { useEffect, useState } from "react";
import { Bell, X, AlertTriangle, Trophy, PiggyBank, Sparkles, CheckCheck, type LucideIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Notif = {
  id: number;
  title: string;
  body: string;
  when: string;
  unread?: boolean;
  Icon: LucideIcon;
  tone: "primary" | "warning" | "success" | "info";
};

const initial: Notif[] = [
  { id: 1, title: "חריגה בתקציב מסעדות", body: "חרגתם החודש ב-200 ₪ מהתקציב.", when: "לפני 10 דק׳", unread: true, Icon: AlertTriangle, tone: "warning" },
  { id: 2, title: "הישג חדש! 🎉", body: "עמדתם בתקציב 3 חודשים ברצף.", when: "אתמול", unread: true, Icon: Trophy, tone: "primary" },
  { id: 3, title: "הפקדה אוטומטית", body: "1,200 ₪ הופקדו ליעד 'חופשת קיץ'.", when: "12.06", Icon: PiggyBank, tone: "success" },
  { id: 4, title: "תובנה שבועית מוכנה", body: "סיכום ההוצאות שלכם לשבוע האחרון.", when: "11.06", Icon: Sparkles, tone: "info" },
];

const toneMap = {
  primary: "bg-primary-soft text-primary",
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
  info: "bg-info-soft text-info",
};

export function NotificationsBell({ triggerClass }: { triggerClass?: string }) {
  const [items, setItems] = useState(initial);
  const [mobileOpen, setMobileOpen] = useState(false);
  const unread = items.filter((i) => i.unread).length;

  const markAll = () => setItems((arr) => arr.map((i) => ({ ...i, unread: false })));

  // lock body scroll on mobile overlay
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  const bellInner = (
    <>
      <Bell className="h-5 w-5 text-foreground/70" />
      {unread > 0 && <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-destructive" />}
    </>
  );

  const list = (
    <ul className="space-y-2">
      {items.map((n) => (
        <li
          key={n.id}
          className={`relative flex gap-3 rounded-2xl p-3 transition ${
            n.unread ? "bg-primary-soft/40" : "bg-muted/40"
          }`}
        >
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${toneMap[n.tone]}`}>
            <n.Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate text-sm font-bold">{n.title}</div>
              <div className="shrink-0 text-[10px] text-muted-foreground">{n.when}</div>
            </div>
            <p className="mt-0.5 text-xs text-foreground/70">{n.body}</p>
          </div>
          {n.unread && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />}
        </li>
      ))}
    </ul>
  );

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-primary-soft">
          <Bell className="h-4 w-4 text-primary" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-extrabold">התראות</div>
          <div className="text-[11px] text-muted-foreground">
            {unread > 0 ? `${unread} חדשות` : "הכל קרוא"}
          </div>
        </div>
      </div>
      <button
        onClick={markAll}
        className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold text-foreground/70 hover:bg-primary-soft hover:text-primary"
      >
        <CheckCheck className="h-3 w-3" /> סמן הכל
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile trigger — opens fullscreen glass overlay */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`lg:hidden relative ${triggerClass ?? "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card shadow-[var(--shadow-card)]"}`}
        aria-label="התראות"
      >
        {bellInner}
      </button>

      {/* Mobile fullscreen glass overlay */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-foreground/30 backdrop-blur-xl"
        />
        <div
          className={`relative h-full flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-y-0" : "translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between px-5 pt-12 pb-4">
            <div className="text-2xl font-extrabold">התראות</div>
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-2xl bg-card/80 backdrop-blur shadow-[var(--shadow-card)]"
              aria-label="סגור"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-5">
            <div className="rounded-3xl bg-card/80 backdrop-blur-xl p-4 shadow-[var(--shadow-card)]">
              {header}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
            <div className="rounded-3xl bg-card/70 backdrop-blur-xl p-3 shadow-[var(--shadow-card)]">
              {list}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop popover */}
      <div className="hidden lg:block">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`relative grid h-10 w-10 place-items-center rounded-xl text-foreground/60 hover:bg-muted`}
              aria-label="התראות"
            >
              {bellInner}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[380px] p-0 rounded-2xl border-border shadow-xl">
            <div className="border-b border-border px-4 py-3">{header}</div>
            <div className="max-h-[420px] overflow-y-auto p-3">{list}</div>
            <div className="border-t border-border px-4 py-2 text-center">
              <button className="text-xs font-bold text-primary hover:underline">צפה בכל ההתראות</button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
