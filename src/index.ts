import { format } from "date-fns";
import {
  promptEmployee,
  promptProjects,
  promptDateRange,
  promptSkipWeekends,
  promptCountry,
  promptSkipRanges,
  promptSkipDates,
  promptTimestamp,
  promptOutputFile,
  promptConfirmation,
} from "./prompts.js";
import { getWorkingDays } from "./dates.js";
import { buildCsv, writeCsv } from "./csv.js";

async function main() {
  console.log("=== Time Tracker CSV Generator ===\n");

  const employee = await promptEmployee();
  const projects = await promptProjects();
  const { start, end } = await promptDateRange();
  const skipWeekends = await promptSkipWeekends();
  const country = await promptCountry();
  const skipRanges = await promptSkipRanges();
  const skipDates = await promptSkipDates();
  const timestamp = await promptTimestamp();
  const outputFile = await promptOutputFile(employee);

  const workingDays = getWorkingDays(
    start,
    end,
    skipWeekends,
    country,
    skipRanges,
    skipDates
  );

  const totalRows = workingDays.length * projects.length;
  const projectsSummary = projects
    .map((p) => `  ${p.project} — ${p.hours}h/day`)
    .join("\n");
  const summary = [
    "--- Summary ---",
    `Employee: ${employee}`,
    `Projects:\n${projectsSummary}`,
    `Date range: ${format(start, "dd/MM/yyyy")} → ${format(end, "dd/MM/yyyy")}`,
    `Skip weekends: ${skipWeekends}`,
    `Country holidays: ${country ?? "None"}`,
    `Skip ranges: ${skipRanges.length}`,
    `Skip dates: ${skipDates.length}`,
    `Working days: ${workingDays.length}`,
    `Total CSV rows: ${totalRows}`,
    `Output: ${outputFile}`,
  ].join("\n");

  const confirmed = await promptConfirmation(summary);
  if (!confirmed) {
    console.log("Aborted.");
    return;
  }

  const csv = buildCsv(timestamp, employee, projects, workingDays);
  writeCsv(outputFile, csv);
  console.log(`\nDone! Wrote ${totalRows} rows to ${outputFile}`);
}

main().catch(console.error);
