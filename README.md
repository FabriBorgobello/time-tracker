# Time Tracker CSV Generator

Interactive CLI tool to generate time tracking CSV files for employee project hours.

## Setup

```bash
pnpm install
```

## Usage

```bash
npx time-tracker
```

Or via pnpm script:

```bash
pnpm start
```

The CLI will prompt you for:

1. **Employee** — format: `{id}: {name}`
2. **Projects** — project name + hours/day (loop to add multiple)
3. **Date range** — start and end in DD/MM/YYYY
4. **Skip weekends** — yes/no
5. **Country holidays** — ES, DE, PL, or None (skips public holidays)
6. **Custom skip ranges** — e.g. Dec 22 - Jan 2
7. **Specific dates to exclude**
8. **Timestamp** — defaults to current time
9. **Output filename** — defaults to `{employeeId}_new_entries.csv`

A summary is shown before generation for confirmation.

## Example

```
$ npx time-tracker

=== Time Tracker CSV Generator ===

? Employee (e.g. jdoxx01: John Doe): jdoxx01: John Doe
? Project (e.g. PRJ-001: My Project): PRJ-001: Project Alpha
? Hours/day for PRJ-001: Project Alpha: 4
? Add another project? Yes
? Project (e.g. PRJ-001: My Project): PRJ-002: Project Beta
? Hours/day for PRJ-002: Project Beta: 4
? Add another project? No
? Start date (DD/MM/YYYY): 01/01/2025
? End date (DD/MM/YYYY): 31/01/2025
? Skip weekends? Yes
? Country for public holidays: Spain (ES)
? Add custom skip date ranges? No
? Add specific dates to exclude? No
? Timestamp (DD/MM/YYYY HH:MM:SS): 01/02/2025 10:00:00
? Output filename: jdoxx01_new_entries.csv

--- Summary ---
Employee: jdoxx01: John Doe
Projects:
  PRJ-001: Project Alpha — 4h/day
  PRJ-002: Project Beta — 4h/day
Date range: 01/01/2025 → 31/01/2025
Skip weekends: true
Country holidays: ES
Skip ranges: 0
Skip dates: 0
Working days: 21
Total CSV rows: 42
Output: jdoxx01_new_entries.csv

? Generate CSV? Yes

Done! Wrote 42 rows to jdoxx01_new_entries.csv
```

## Output Format

```csv
Timestamp,Employee,Project,# hours,Date
01/02/2025 10:00:00,jdoxx01: John Doe,PRJ-001: Project Alpha,4,02/01/2025
01/02/2025 10:00:00,jdoxx01: John Doe,PRJ-002: Project Beta,4,02/01/2025
```
