export interface ProjectEntry {
  project: string;
  hours: number;
}

export interface SkipRange {
  start: Date;
  end: Date;
}

export interface TimeTrackerConfig {
  employee: string;
  projects: ProjectEntry[];
  startDate: Date;
  endDate: Date;
  skipWeekends: boolean;
  country: string | null;
  skipRanges: SkipRange[];
  skipDates: Date[];
  timestamp: string;
  outputFile: string;
}
