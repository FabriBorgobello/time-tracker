import { input, confirm, select } from "@inquirer/prompts";
import { parse, format } from "date-fns";
import type { ProjectEntry, SkipRange } from "./types.js";
import {
  dateSchema,
  timestampSchema,
  hoursSchema,
  nonEmptyStringSchema,
  filenameSchema,
  zodValidate,
} from "./validation.js";

const DATE_FORMAT = "dd/MM/yyyy";

function parseDate(str: string): Date {
  return parse(str, DATE_FORMAT, new Date());
}

export async function promptEmployee(): Promise<string> {
  return input({
    message: "Employee (e.g. jdoxx01: John Doe):",
    validate: zodValidate(nonEmptyStringSchema),
  });
}

export async function promptProjects(): Promise<ProjectEntry[]> {
  const projects: ProjectEntry[] = [];

  do {
    const project = await input({
      message: "Project (e.g. PRJ-001: My Project):",
      validate: zodValidate(nonEmptyStringSchema),
    });

    const hoursStr = await input({
      message: `Hours/day for ${project}:`,
      validate: zodValidate(hoursSchema),
    });

    projects.push({ project, hours: Number(hoursStr) });

    const addMore = await confirm({
      message: "Add another project?",
      default: false,
    });
    if (!addMore) break;
  } while (true);

  return projects;
}

export async function promptDateRange(): Promise<{ start: Date; end: Date }> {
  const startStr = await input({
    message: "Start date (DD/MM/YYYY):",
    validate: zodValidate(dateSchema),
  });

  const endStr = await input({
    message: "End date (DD/MM/YYYY):",
    validate: zodValidate(dateSchema),
  });

  return { start: parseDate(startStr), end: parseDate(endStr) };
}

export async function promptSkipWeekends(): Promise<boolean> {
  return confirm({ message: "Skip weekends?", default: true });
}

export async function promptCountry(): Promise<string | null> {
  const choice = await select({
    message: "Country for public holidays:",
    choices: [
      { name: "Spain (ES)", value: "ES" },
      { name: "Germany (DE)", value: "DE" },
      { name: "Poland (PL)", value: "PL" },
      { name: "None", value: "NONE" },
    ],
  });
  return choice === "NONE" ? null : choice;
}

export async function promptSkipRanges(): Promise<SkipRange[]> {
  const ranges: SkipRange[] = [];

  const wantRanges = await confirm({
    message: "Add custom skip date ranges?",
    default: false,
  });
  if (!wantRanges) return ranges;

  do {
    const startStr = await input({
      message: "Skip range start (DD/MM/YYYY):",
      validate: zodValidate(dateSchema),
    });
    const endStr = await input({
      message: "Skip range end (DD/MM/YYYY):",
      validate: zodValidate(dateSchema),
    });

    ranges.push({ start: parseDate(startStr), end: parseDate(endStr) });

    const addMore = await confirm({
      message: "Add another skip range?",
      default: false,
    });
    if (!addMore) break;
  } while (true);

  return ranges;
}

export async function promptSkipDates(): Promise<Date[]> {
  const dates: Date[] = [];

  const wantDates = await confirm({
    message: "Add specific dates to exclude?",
    default: false,
  });
  if (!wantDates) return dates;

  do {
    const dateStr = await input({
      message: "Date to exclude (DD/MM/YYYY):",
      validate: zodValidate(dateSchema),
    });

    dates.push(parseDate(dateStr));

    const addMore = await confirm({
      message: "Add another date to exclude?",
      default: false,
    });
    if (!addMore) break;
  } while (true);

  return dates;
}

export async function promptTimestamp(): Promise<string> {
  const defaultTs = format(new Date(), "dd/MM/yyyy HH:mm:ss");

  return input({
    message: "Timestamp (DD/MM/YYYY HH:MM:SS):",
    default: defaultTs,
    validate: zodValidate(timestampSchema),
  });
}

export async function promptOutputFile(employeeStr: string): Promise<string> {
  const id = employeeStr.split(":")[0].trim();
  const defaultName = `${id}_new_entries.csv`;

  return input({
    message: "Output filename:",
    default: defaultName,
    validate: zodValidate(filenameSchema),
  });
}

export async function promptConfirmation(summary: string): Promise<boolean> {
  console.log("\n" + summary);
  return confirm({ message: "Generate CSV?", default: true });
}
