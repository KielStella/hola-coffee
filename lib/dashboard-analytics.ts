export type SalesPeriod = "weekly" | "monthly" | "yearly";
export type RevenuePeriod = "today" | "week" | "month" | "year";

export const salesPeriods: { value: SalesPeriod; label: string }[] = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const revenuePeriods: { value: RevenuePeriod; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Monday-based start of week, matching "current week" in the common (non-US) sense. */
function startOfWeek(date: Date): Date {
  const d = startOfDay(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // shift back to Monday
  d.setDate(d.getDate() + diff);
  return d;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

export function getRevenueDateRange(period: RevenuePeriod, now: Date = new Date()): { start: Date; end: Date } {
  const end = now;
  switch (period) {
    case "today":
      return { start: startOfDay(now), end };
    case "week":
      return { start: startOfWeek(now), end };
    case "month":
      return { start: startOfMonth(now), end };
    case "year":
      return { start: startOfYear(now), end };
  }
}

export type SalesBucket = { label: string; start: Date; end: Date };

/** Splits the selected sales period into chart buckets (daily for weekly, weekly for monthly, monthly for yearly). */
export function getSalesBuckets(period: SalesPeriod, now: Date = new Date()): SalesBucket[] {
  if (period === "weekly") {
    const weekStart = startOfWeek(now);
    return Array.from({ length: 7 }).map((_, i) => {
      const start = new Date(weekStart);
      start.setDate(start.getDate() + i);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      return { label: start.toLocaleDateString("en-US", { weekday: "short" }), start, end };
    });
  }

  if (period === "monthly") {
    const monthStart = startOfMonth(now);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const buckets: SalesBucket[] = [];
    let cursor = new Date(monthStart);
    let weekIndex = 1;
    while (cursor < monthEnd) {
      const start = new Date(cursor);
      const end = new Date(cursor);
      end.setDate(end.getDate() + 7);
      buckets.push({ label: `Week ${weekIndex}`, start, end: end > monthEnd ? monthEnd : end });
      cursor = end;
      weekIndex += 1;
    }
    return buckets;
  }

  // yearly — 12 calendar months
  const yearStart = startOfYear(now);
  return Array.from({ length: 12 }).map((_, i) => {
    const start = new Date(yearStart.getFullYear(), i, 1);
    const end = new Date(yearStart.getFullYear(), i + 1, 1);
    return { label: start.toLocaleDateString("en-US", { month: "short" }), start, end };
  });
}

export function getSalesOverallRange(period: SalesPeriod, now: Date = new Date()): { start: Date; end: Date } {
  const buckets = getSalesBuckets(period, now);
  return { start: buckets[0].start, end: buckets[buckets.length - 1].end };
}
