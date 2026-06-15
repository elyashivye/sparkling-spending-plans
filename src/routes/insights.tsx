import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, TrendingUp, AlertTriangle, Trophy, Lightbulb, ShoppingCart, Zap, Heart, type LucideIcon } from "lucide-react";
import { AppShell, Section, Pill } from "@/components/app-shell";
import { shekel } from "@/lib/hebrew-date";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "תובנות - הכיס המשפחתי" }] }),
  component: InsightsPage,
});

type Insight = {
  title: string; body: string; impact?: string; tag: "אזהרה" | "הצלחה" | "המלצה" | "הזדמנות";
  Icon: LucideIcon; tone: "destructive" | "success" | "primary" | "info" | "warning";
};

const insights: Insight[] = [
  { title: "חריגה צפויה בתקציב מסעדות", body: "בקצב הנוכחי תחרגו ב-{} מתקציב 'מסעדות ובילויים' לחודש הזה.", impact: "300 ₪", tag: "אזהרה", Icon: AlertTriangle, tone: "destructive" },
  { title: "כל הכבוד! עמדתם בתקציב סופר", body: "חסכתם {} בקטגוריית הסופר לעומת החודש שעבר. שווה להמשיך באותו קצב.", impact: "420 ₪", tag: "הצלחה", Icon: Trophy, tone: "success" },
  { title: "מנויים לא בשימוש", body: "זיהינו 2 מנויים שלא נעשה בהם שימוש החודש. ביטול יחסוך {} בשנה.", impact: "7,920 ₪", tag: "הזדמנות", Icon: Zap, tone: "warning" },
  { title: "מגמה - הוצאות סופר", body: "ההוצאות בסופר עלו ב-23% בשלושת החודשים האחרונים. מומלץ לעדכן את התקציב.", tag: "המלצה", Icon: ShoppingCart, tone: "info" },
  { title: "יעד 'חופשת קיץ' בקצב מצוין", body: "אם תמשיכו בקצב הנוכחי, תגיעו ליעד 6 שבועות לפני המועד שתכננתם.", tag: "הצלחה", Icon: Heart, tone: "success" },
  { title: "תזכורת לקרן חירום", body: "מומלץ שלקרן החירום יהיו 3-6 משכורות. כרגע יש לכם 0.8 משכורת.", tag: "המלצה", Icon: Lightbulb, tone: "primary" },
];

function InsightsPage() {
  return (
    <AppShell title="תובנות חכמות ✨" subtitle="ניתוח חודשי בעזרת בינה מלאכותית">
      <div className="space-y-6">
        <Section className="!bg-gradient-to-br !from-primary-soft !to-info-soft">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-card">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <div>
              <div className="text-lg font-extrabold">החודש שלכם בקצרה</div>
              <p className="mt-1 text-sm text-foreground/70">
                חודש חזק! חסכתם <b className="text-success">{shekel(4180)}</b>, עמדתם ב-4 מתוך 5 קטגוריות תקציב, והתקדמתם ב-2 יעדים.
              </p>
            </div>
            <div className="ml-auto hidden sm:flex flex-col items-center">
              <div className="text-3xl font-extrabold text-primary">82</div>
              <div className="text-xs text-muted-foreground">ציון</div>
            </div>
          </div>
        </Section>

        <div className="grid gap-4 lg:grid-cols-2">
          {insights.map((i, idx) => {
            const map = {
              destructive: ["bg-pink-soft", "text-destructive"],
              success: ["bg-success-soft", "text-success"],
              primary: ["bg-primary-soft", "text-primary"],
              info: ["bg-info-soft", "text-info"],
              warning: ["bg-warning-soft", "text-warning"],
            } as const;
            return (
              <Section key={idx}>
                <div className="flex items-start gap-3">
                  <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${map[i.tone][0]}`}>
                    <i.Icon className={`h-5 w-5 ${map[i.tone][1]}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">{i.title}</h4>
                      <Pill tone={i.tone}>{i.tag}</Pill>
                    </div>
                    <p className="mt-2 text-sm text-foreground/80">
                      {i.body.split("{}").map((p, k, arr) => (
                        <span key={k}>{p}{k < arr.length - 1 && <b className={map[i.tone][1]}>{i.impact}</b>}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </Section>
            );
          })}
        </div>

        <Section title="טיפים לחודש הבא" action={<TrendingUp className="h-4 w-4 text-primary" />}>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li className="flex gap-2"><span className="text-primary font-bold">1.</span> תכננו ארוחות בית מראש — חיסכון פוטנציאלי של 600 ₪ בחודש.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">2.</span> העבירו 200 ₪ נוספים לקרן החירום — תגיעו ליעד מהר יותר.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">3.</span> בדקו השוואת מחירים לביטוח הרכב — חיסכון ממוצע 15%.</li>
          </ul>
        </Section>
      </div>
    </AppShell>
  );
}
