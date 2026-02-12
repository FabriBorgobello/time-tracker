import { writeFileSync } from "node:fs";
import { format } from "date-fns";
import type { ProjectEntry } from "./types.js";

const HEADER = "Timestamp,Employee,Project,# hours,Date";

export function buildCsv(
  timestamp: string,
  employee: string,
  projects: ProjectEntry[],
  workingDays: Date[]
): string {
  const lines: string[] = [HEADER];

  for (const day of workingDays) {
    const dateStr = format(day, "dd/MM/yyyy");
    for (const p of projects) {
      lines.push(`${timestamp},${employee},${p.project},${p.hours},${dateStr}`);
    }
  }

  return lines.join("\n") + "\n";
}

export function writeCsv(filename: string, content: string): void {
  writeFileSync(filename, content, "utf-8");
}
