import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bell, Shield, CreditCard, Globe, Moon, LogOut, ChevronLeft, Users, Calendar, type LucideIcon } from "lucide-react";
import { AppShell, Section } from "@/components/app-shell";
import coupleImg from "@/assets/couple-avatar.png";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "הגדרות - הכיס המשפחתי" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [notif, setNotif] = useState(true);
  const { isDark, toggle } = useTheme();
  const [hebDate, setHebDate] = useState(true);

  return (
    <AppShell title="הגדרות">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Section>
          <div className="flex flex-col items-center text-center">
            <img src={coupleImg} alt="" className="h-24 w-24 rounded-full object-cover ring-4 ring-primary-soft" />
            <div className="mt-3 text-lg font-extrabold">משפחת לוי</div>
            <div className="text-xs text-muted-foreground">דנה ויואב • 2 ילדים</div>
            <button className="mt-3 w-full rounded-2xl bg-primary-soft py-2 text-xs font-bold text-primary">ערוך פרופיל</button>
          </div>
        </Section>

        <div className="space-y-6">
          <Section title="חשבון">
            <div className="divide-y divide-border">
              <Row Icon={User} title="פרטים אישיים" sub="שם, אימייל, טלפון" />
              <Row Icon={Users} title="חברי משפחה" sub="2 משתמשים מחוברים" />
              <Row Icon={CreditCard} title="חשבונות וכרטיסים" sub="3 כרטיסים, חשבון בנק אחד" />
            </div>
          </Section>

          <Section title="העדפות">
            <div className="divide-y divide-border">
              <Toggle Icon={Bell} title="התראות חכמות" sub="קבלו תזכורות ותובנות חודשיות" value={notif} onChange={setNotif} />
              <Toggle Icon={Calendar} title="הצגת תאריך עברי" sub="הצגה כפולה של תאריך לועזי + עברי" value={hebDate} onChange={setHebDate} />
              <Toggle Icon={Moon} title="מצב כהה" sub="עיצוב נעים לעיניים בלילה" value={isDark} onChange={toggle} />
              <Row Icon={Globe} title="שפה ואזור" sub="עברית • ₪ שקל ישראלי" />
            </div>
          </Section>

          <Section title="אבטחה ופרטיות">
            <div className="divide-y divide-border">
              <Row Icon={Shield} title="קוד נעילה" sub="הגנו על הנתונים שלכם" />
              <Row Icon={Shield} title="גיבוי ענן" sub="גובה אחרון: היום" />
            </div>
          </Section>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-pink-soft px-4 py-3 font-bold text-destructive hover:bg-pink-soft/70">
            <LogOut className="h-4 w-4" /> התנתקות
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ Icon, title, sub }: { Icon: LucideIcon; title: string; sub: string }) {
  return (
    <button className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3.5 text-right hover:bg-muted/30 -mx-2 px-2 rounded-xl transition">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <ChevronLeft className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

function Toggle({ Icon, title, sub, value, onChange }: { Icon: LucideIcon; title: string; sub: string; value: boolean; onChange: (b: boolean) => void }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3.5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <button onClick={() => onChange(!value)} role="switch" aria-checked={value}
        className={`relative h-6 w-11 rounded-full transition ${value ? "bg-primary" : "bg-muted"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition ${value ? "right-0.5" : "right-[22px]"}`} />
      </button>
    </div>
  );
}
