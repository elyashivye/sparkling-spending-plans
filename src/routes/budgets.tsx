import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShoppingCart, Car, Home, UtensilsCrossed, Baby, Plus, Sparkles, Pencil, Trash2, ChevronLeft, Fuel, Coffee, Receipt, type LucideIcon } from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { shekel, hebrewMonth, gregorianMonth, hebrewDate } from "@/lib/hebrew-date";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type CatExpense = { id: number; title: string; amount: number; date: Date; Icon: LucideIcon };
const dAgo = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };

const expensesByCategory: Record<string, CatExpense[]> = {
  "סופר וקניות": [
    { id: 1, title: "שופרסל דיל", amount: 412, date: dAgo(0), Icon: ShoppingCart },
    { id: 2, title: "ויקטורי", amount: 318, date: dAgo(3), Icon: ShoppingCart },
    { id: 3, title: "רמי לוי", amount: 560, date: dAgo(7), Icon: ShoppingCart },
    { id: 4, title: "אושר עד", amount: 240, date: dAgo(11), Icon: ShoppingCart },
    { id: 5, title: "מחסני השוק", amount: 1270, date: dAgo(15), Icon: ShoppingCart },
  ],
  "רכב ותחבורה": [
    { id: 1, title: "פז דלק", amount: 320, date: dAgo(1), Icon: Fuel },
    { id: 2, title: "חניון רכבת", amount: 30, date: dAgo(4), Icon: Car },
    { id: 3, title: "ביטוח רכב", amount: 300, date: dAgo(12), Icon: Car },
  ],
  "בית ומשק": [
    { id: 1, title: "ארנונה", amount: 540, date: dAgo(5), Icon: Home },
    { id: 2, title: "חשמל", amount: 210, date: dAgo(9), Icon: Home },
  ],
  "מסעדות ובילויים": [
    { id: 1, title: "מסעדת קלאודיוס", amount: 380, date: dAgo(2), Icon: UtensilsCrossed },
    { id: 2, title: "קפה לנדוור", amount: 48, date: dAgo(4), Icon: Coffee },
    { id: 3, title: "ארומה", amount: 62, date: dAgo(6), Icon: Coffee },
    { id: 4, title: "פיצה דומינו", amount: 110, date: dAgo(8), Icon: UtensilsCrossed },
    { id: 5, title: "בר עומק", amount: 600, date: dAgo(14), Icon: UtensilsCrossed },
  ],
  "ילדים וחינוך": [
    { id: 1, title: "חוג ג'ודו - איתי", amount: 280, date: dAgo(4), Icon: Baby },
    { id: 2, title: "צהרון - נועה", amount: 420, date: dAgo(10), Icon: Baby },
  ],
};

export const Route = createFileRoute("/budgets")({
  head: () => ({ meta: [{ title: "תקציבים - הכיס המשפחתי" }] }),
  component: BudgetsPage,
});

type B = { label: string; spent: number; budget: number; color: string; bg: string; ic: string; Icon: LucideIcon };

const initialBudgets: B[] = [
  { label: "סופר וקניות", spent: 2800, budget: 3200, color: "bg-success", bg: "bg-success-soft", ic: "text-success", Icon: ShoppingCart },
  { label: "רכב ותחבורה", spent: 650, budget: 1200, color: "bg-warning", bg: "bg-warning-soft", ic: "text-warning", Icon: Car },
  { label: "בית ומשק", spent: 750, budget: 1800, color: "bg-teal", bg: "bg-teal-soft", ic: "text-teal", Icon: Home },
  { label: "מסעדות ובילויים", spent: 1200, budget: 1000, color: "bg-destructive", bg: "bg-pink-soft", ic: "text-destructive", Icon: UtensilsCrossed },
  { label: "ילדים וחינוך", spent: 700, budget: 1000, color: "bg-primary", bg: "bg-primary-soft", ic: "text-primary", Icon: Baby },
];

const palette = [
  { color: "bg-success", bg: "bg-success-soft", ic: "text-success" },
  { color: "bg-warning", bg: "bg-warning-soft", ic: "text-warning" },
  { color: "bg-teal", bg: "bg-teal-soft", ic: "text-teal" },
  { color: "bg-destructive", bg: "bg-pink-soft", ic: "text-destructive" },
  { color: "bg-primary", bg: "bg-primary-soft", ic: "text-primary" },
  { color: "bg-info", bg: "bg-info-soft", ic: "text-info" },
];

const iconChoices: { key: string; Icon: LucideIcon }[] = [
  { key: "super", Icon: ShoppingCart },
  { key: "car", Icon: Car },
  { key: "home", Icon: Home },
  { key: "rest", Icon: UtensilsCrossed },
  { key: "kids", Icon: Baby },
];

function BudgetsPage() {
  const [budgets, setBudgets] = useState<B[]>(initialBudgets);
  const [active, setActive] = useState<B | null>(null);
  const [creating, setCreating] = useState(false);

  const total = budgets.reduce((s, b) => s + b.budget, 0);
  const spent = budgets.reduce((s, b) => s + b.spent, 0);
  const pct = total ? Math.round((spent / total) * 100) : 0;

  const update = (label: string, newBudget: number) => {
    setBudgets((arr) => arr.map((b) => (b.label === label ? { ...b, budget: newBudget } : b)));
    toast.success("התקציב עודכן בהצלחה");
  };

  const remove = (label: string) => {
    setBudgets((arr) => arr.filter((b) => b.label !== label));
    toast.success("הקטגוריה נמחקה");
  };

  const create = (b: B) => {
    setBudgets((arr) => [...arr, b]);
    toast.success("הקטגוריה נוספה");
  };

  if (active) {
    return (
      <AppShell title={active.label} subtitle={`פירוט קטגוריה • ${hebrewMonth()}`}>
        <CategoryDetailView
          category={active}
          onBack={() => setActive(null)}
          onUpdate={(label, n) => { update(label, n); }}
          onDelete={(label) => { remove(label); setActive(null); }}
        />
      </AppShell>
    );
  }

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
                <div className="h-full rounded-full bg-gradient-to-l from-primary to-info" style={{ width: `${Math.min(100, pct)}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{shekel(spent)} הוצאה</span><span>נשארו {shekel(Math.max(0, total - spent))}</span>
              </div>
            </div>
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
            >
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
                <button
                  onClick={() => setActive(b)}
                  className="absolute inset-0 z-10 rounded-3xl"
                  aria-label={`פתח פירוט ${b.label}`}
                />
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
                  <span className="font-semibold text-primary">פירוט →</span>
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

      <NewCategoryDialog
        open={creating}
        onClose={() => setCreating(false)}
        onCreate={create}
        existing={budgets.map((b) => b.label)}
      />
    </AppShell>
  );
}


/* ===== Category detail with double-confirm edit ===== */
function CategoryDetailDialog({
  category, onClose, onUpdate, onDelete,
}: {
  category: B | null;
  onClose: () => void;
  onUpdate: (label: string, n: number) => void;
  onDelete: (label: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [confirmingEdit, setConfirmingEdit] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const open = !!category;
  const b = category;

  const stop = () => {
    setEditing(false);
    setDraft("");
    onClose();
  };

  const startEdit = () => {
    if (!b) return;
    setDraft(String(b.budget));
    setEditing(true);
  };

  const parsedDraft = Number(draft);
  const draftValid = Number.isFinite(parsedDraft) && parsedDraft > 0;

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => !o && stop()}>
        <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col" dir="rtl">
          {b && (
            <>
              <div className={`${b.bg} px-6 pt-8 pb-6 text-center relative shrink-0`}>
                <button
                  onClick={stop}
                  className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-xl text-foreground/60 hover:bg-card/60"
                  aria-label="חזור"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className={`mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-card shadow-[var(--shadow-card)]`}>
                  <b.Icon className={`h-8 w-8 ${b.ic}`} />
                </div>
                <DialogTitle className="mt-3 text-xl font-extrabold">{b.label}</DialogTitle>
                <DialogDescription className="text-xs text-foreground/70">
                  פירוט תקציב הקטגוריה לחודש {hebrewMonth()}
                </DialogDescription>
              </div>

              <div className="space-y-4 px-6 py-5 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <Stat label="תקציב" value={shekel(b.budget)} />
                  <Stat label="הוצאה" value={shekel(b.spent)} />
                  <Stat label={b.spent > b.budget ? "חריגה" : "נשאר"} value={shekel(Math.abs(b.budget - b.spent))} tone={b.spent > b.budget ? "destructive" : "success"} />
                </div>

                {!editing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={startEdit}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
                    >
                      <Pencil className="h-4 w-4" /> שינוי תקציב
                    </button>
                    <button
                      onClick={() => setConfirmingDelete(true)}
                      className="grid h-11 w-11 place-items-center rounded-2xl bg-pink-soft text-destructive hover:opacity-90"
                      aria-label="מחק קטגוריה"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 rounded-2xl border border-border bg-muted/30 p-3">
                    <label className="text-xs font-semibold text-foreground/70">תקציב חודשי חדש (₪)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value.replace(/[^\d.]/g, ""))}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-right text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setEditing(false)}
                        className="flex-1 rounded-xl border border-border bg-card py-2 text-xs font-bold"
                      >
                        ביטול
                      </button>
                      <button
                        disabled={!draftValid || parsedDraft === b.budget}
                        onClick={() => setConfirmingEdit(true)}
                        className="flex-1 rounded-xl bg-primary py-2 text-xs font-bold text-primary-foreground disabled:opacity-40"
                      >
                        שמור
                      </button>
                    </div>
                  </div>
                )}

                <CategoryExpenses category={b} />
              </div>
            </>
          )}
          <DialogFooter className="hidden" />
        </DialogContent>
      </Dialog>



      {/* Double confirmation - edit */}
      <AlertDialog open={confirmingEdit} onOpenChange={setConfirmingEdit}>
        <AlertDialogContent dir="rtl" className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>לאשר עדכון תקציב?</AlertDialogTitle>
            <AlertDialogDescription>
              התקציב של "{b?.label}" ישתנה מ-{b && shekel(b.budget)} ל-{shekel(parsedDraft || 0)}.
              פעולה זו תשפיע על החישובים החודשיים.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (b && draftValid) onUpdate(b.label, parsedDraft);
                setConfirmingEdit(false);
                setEditing(false);
                onClose();
              }}
            >
              אשר עדכון
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Double confirmation - delete */}
      <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <AlertDialogContent dir="rtl" className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>למחוק את "{b?.label}"?</AlertDialogTitle>
            <AlertDialogDescription>
              הקטגוריה תוסר מהרשימה. ההוצאות הקיימות יישמרו בהיסטוריה ללא שיוך לקטגוריה.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (b) onDelete(b.label);
                setConfirmingDelete(false);
                onClose();
              }}
            >
              מחק
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function Stat({ label, value, tone = "muted" }: { label: string; value: string; tone?: "muted" | "success" | "destructive" }) {
  const toneCls = tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "text-foreground";
  return (
    <div className="rounded-2xl bg-muted/40 px-3 py-2.5">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-sm font-extrabold ${toneCls}`}>{value}</div>
    </div>
  );
}

function CategoryExpenses({ category }: { category: B }) {
  const items = expensesByCategory[category.label] ?? [];
  const total = items.reduce((s, e) => s + e.amount, 0);
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
        <div className="flex items-center gap-2">
          <Receipt className="h-4 w-4 text-foreground/60" />
          <h4 className="text-sm font-bold">הוצאות הקטגוריה</h4>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {items.length} פעולות • {shekel(total)}
        </span>
      </div>
      {items.length === 0 ? (
        <div className="px-4 pb-4 pt-1 text-center text-xs text-muted-foreground">
          אין עדיין הוצאות בקטגוריה זו החודש
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((e) => (
            <li key={e.id} className="flex items-center gap-3 px-4 py-2.5">
              <div className={`grid h-9 w-9 place-items-center rounded-xl ${category.bg}`}>
                <e.Icon className={`h-4 w-4 ${category.ic}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{e.title}</div>
                <div className="text-[11px] text-muted-foreground">{hebrewDate(e.date)}</div>
              </div>
              <div className="text-sm font-extrabold">{shekel(e.amount)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ===== Create new category ===== */
function NewCategoryDialog({
  open, onClose, onCreate, existing,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (b: B) => void;
  existing: string[];
}) {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [iconIdx, setIconIdx] = useState(0);
  const [confirming, setConfirming] = useState(false);

  const reset = () => {
    setLabel(""); setAmount(""); setPaletteIdx(0); setIconIdx(0);
  };
  const close = () => { reset(); onClose(); };

  const parsed = Number(amount);
  const dup = useMemo(() => existing.includes(label.trim()), [existing, label]);
  const valid = label.trim().length >= 2 && Number.isFinite(parsed) && parsed > 0 && !dup;

  const submit = () => {
    const p = palette[paletteIdx];
    const Icon = iconChoices[iconIdx].Icon;
    onCreate({ label: label.trim(), spent: 0, budget: parsed, ...p, Icon });
    setConfirming(false);
    close();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-md rounded-3xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>קטגוריה חדשה</DialogTitle>
            <DialogDescription>הגדירו שם, תקציב חודשי, צבע ואייקון.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground/70">שם הקטגוריה</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="לדוגמה: ספורט"
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {dup && <p className="mt-1 text-[11px] text-destructive">כבר קיימת קטגוריה בשם זה</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/70">תקציב חודשי (₪)</label>
              <input
                value={amount}
                inputMode="decimal"
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                placeholder="0"
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-right text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/70">צבע</label>
              <div className="mt-2 flex gap-2">
                {palette.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPaletteIdx(i)}
                    className={`h-9 w-9 rounded-2xl ${p.color} transition ${i === paletteIdx ? "ring-2 ring-offset-2 ring-foreground/40" : "opacity-70"}`}
                    aria-label={`צבע ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/70">אייקון</label>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {iconChoices.map((c, i) => (
                  <button
                    key={c.key}
                    onClick={() => setIconIdx(i)}
                    className={`grid h-11 place-items-center rounded-2xl border transition ${
                      i === iconIdx ? `${palette[paletteIdx].bg} border-primary` : "border-border bg-background"
                    }`}
                  >
                    <c.Icon className={`h-5 w-5 ${i === iconIdx ? palette[paletteIdx].ic : "text-foreground/60"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <button onClick={close} className="flex-1 rounded-xl border border-border bg-card py-2.5 text-sm font-bold">
              ביטול
            </button>
            <button
              disabled={!valid}
              onClick={() => setConfirming(true)}
              className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-40"
            >
              צור
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent dir="rtl" className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>לאשר יצירת קטגוריה?</AlertDialogTitle>
            <AlertDialogDescription>
              קטגוריה "{label}" עם תקציב חודשי של {shekel(parsed || 0)} תיווסף לרשימה.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>חזור</AlertDialogCancel>
            <AlertDialogAction onClick={submit}>צור קטגוריה</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
