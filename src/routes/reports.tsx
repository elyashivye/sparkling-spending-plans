import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { nf, shekel, hebrewMonth, gregorianMonth } from "@/lib/hebrew-date";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "דוחות - הכיס המשפחתי" }] }),
  component: ReportsPage,
});

const months = ["דצמבר", "ינואר", "פברואר", "מרץ", "אפריל", "מאי"];
const income = [21000, 21500, 22000, 21300, 21800, 21300];
const expense = [16200, 18400, 17100, 19200, 15800, 13620];

const categories = [
  { name: "סופר וקניות", amount: 2800, pct: 27, color: "bg-success" },
  { name: "בית ומשק", amount: 2400, pct: 23, color: "bg-teal" },
  { name: "מסעדות ובילויים", amount: 1700, pct: 17, color: "bg-destructive" },
  { name: "רכב ותחבורה", amount: 1500, pct: 15, color: "bg-warning" },
  { name: "ילדים וחינוך", amount: 1100, pct: 11, color: "bg-primary" },
  { name: "אחר", amount: 720, pct: 7, color: "bg-info" },
];

function ReportsPage() {
  const [range, setRange] = useState("6 חודשים");
  const max = Math.max(...income, ...expense);

  return (
    <AppShell title="דוחות וניתוחים" subtitle={`${hebrewMonth()} • ${gregorianMonth()}`}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {["חודש", "3 חודשים", "6 חודשים", "שנה"].map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                  range === r ? "bg-primary text-primary-foreground" : "bg-card text-foreground/70"
                }`}>{r}</button>
            ))}
          </div>
          <button className="flex items-center gap-2 rounded-2xl bg-card px-4 py-2.5 text-sm font-semibold shadow-[var(--shadow-card)]">
            <Download className="h-4 w-4" /> ייצוא PDF
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <Mini label="הכנסות" value={129000} tone="text-success" delta="+4%" />
          <Mini label="הוצאות" value={100320} tone="text-warning" delta="-2%" />
          <Mini label="חיסכון" value={28680} tone="text-primary" delta="+12%" />
          <Mini label="שיעור חיסכון" value={22} suffix="%" tone="text-info" delta="+3%" />
        </div>

        <Section title="הכנסות מול הוצאות" action={
          <Pill tone="muted"><ChevronDown className="h-3 w-3" />{range}</Pill>
        }>
          <div className="mt-2 grid grid-cols-6 gap-3 sm:gap-6">
            {months.map((m, i) => (
              <div key={m} className="flex flex-col items-center gap-2">
                <div className="flex h-44 items-end gap-1.5">
                  <div className="w-4 rounded-t-md bg-success" style={{ height: `${(income[i] / max) * 100}%` }} />
                  <div className="w-4 rounded-t-md bg-primary" style={{ height: `${(expense[i] / max) * 100}%` }} />
                </div>
                <div className="text-[11px] font-semibold">{m}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-6 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-success" /> הכנסות</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-primary" /> הוצאות</span>
          </div>
        </Section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="פיצול לפי קטגוריה">
            <ul className="space-y-3">
              {categories.map(c => (
                <li key={c.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-muted-foreground">{shekel(c.amount)} • {c.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="מגמת חיסכון">
            <div className="space-y-4 text-sm">
              <Row label="חודש מוצלח" value="מאי 2024" sub={`חיסכון של ${shekel(7680)}`} tone="success" />
              <Row label="חודש חלש" value="מרץ 2024" sub={`חיסכון של ${shekel(2100)}`} tone="warning" />
              <Row label="ממוצע 6 חודשים" value={shekel(4780)} sub="לחודש" tone="primary" />
              <Row label="חיסכון שנתי צפוי" value={shekel(57360)} sub="לפי הקצב הנוכחי" tone="info" />
            </div>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}

function Mini({ label, value, tone, delta, suffix }: { label: string; value: number; tone: string; delta: string; suffix?: string }) {
  const up = delta.startsWith("+");
  return (
    <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-extrabold ${tone}`}>{nf(value)}{suffix ?? " ₪"}</div>
      <div className={`mt-1 text-xs font-bold ${up ? "text-success" : "text-destructive"}`}>{delta} מהחודש הקודם</div>
    </div>
  );
}

function Row({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: "success" | "warning" | "primary" | "info" }) {
  const map = { success: "text-success", warning: "text-warning", primary: "text-primary", info: "text-info" };
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`font-extrabold ${map[tone]}`}>{value}</div>
      </div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
