// Hebrew date utilities using Intl with the Hebrew calendar.

const hebFmt = new Intl.DateTimeFormat("he-IL-u-ca-hebrew", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const gregFmt = new Intl.DateTimeFormat("he-IL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const monthFmt = new Intl.DateTimeFormat("he-IL", { month: "long", year: "numeric" });
const hebMonthFmt = new Intl.DateTimeFormat("he-IL-u-ca-hebrew", { month: "long", year: "numeric" });

export function hebrewDate(d: Date = new Date()): string {
  return hebFmt.format(d);
}

export function gregorianFull(d: Date = new Date()): string {
  return gregFmt.format(d);
}

export function bothDates(d: Date = new Date()): string {
  return `${gregorianFull(d)} • ${hebrewDate(d)}`;
}

export function hebrewMonth(d: Date = new Date()): string {
  return hebMonthFmt.format(d);
}

export function gregorianMonth(d: Date = new Date()): string {
  return monthFmt.format(d);
}

export function nf(n: number): string {
  return n.toLocaleString("he-IL");
}

export function shekel(n: number): string {
  return `${nf(n)} ₪`;
}
