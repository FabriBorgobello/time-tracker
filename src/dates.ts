import { addDays, isWeekend, isSameDay, isWithinInterval } from "date-fns";
import Holidays from "date-holidays";
import type { SkipRange } from "./types.js";

export function getWorkingDays(
  start: Date,
  end: Date,
  skipWeekends: boolean,
  country: string | null,
  skipRanges: SkipRange[],
  skipDates: Date[]
): Date[] {
  const holidays = country ? new Holidays(country) : null;
  const days: Date[] = [];
  let current = new Date(start);

  while (current <= end) {
    if (skipWeekends && isWeekend(current)) {
      current = addDays(current, 1);
      continue;
    }

    if (holidays) {
      const result = holidays.isHoliday(current);
      if (
        result &&
        Array.isArray(result) &&
        result.some((h) => h.type === "public")
      ) {
        current = addDays(current, 1);
        continue;
      }
    }

    if (
      skipRanges.some((r) =>
        isWithinInterval(current, { start: r.start, end: r.end })
      )
    ) {
      current = addDays(current, 1);
      continue;
    }

    if (skipDates.some((d) => isSameDay(current, d))) {
      current = addDays(current, 1);
      continue;
    }

    days.push(new Date(current));
    current = addDays(current, 1);
  }

  return days;
}
