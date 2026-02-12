import { z } from "zod";

export const dateSchema = z
  .string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use DD/MM/YYYY format");

export const timestampSchema = z
  .string()
  .regex(
    /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/,
    "Use DD/MM/YYYY HH:MM:SS format"
  );

export const hoursSchema = z.coerce
  .number()
  .gt(0, "Must be greater than 0")
  .lte(24, "Must be 24 or less");

export const nonEmptyStringSchema = z
  .string()
  .trim()
  .min(1, "Required");

export const filenameSchema = z
  .string()
  .trim()
  .min(1, "Required")
  .regex(/\.csv$/, "Must end with .csv");

/** Converts a zod schema into an inquirer `validate` function. */
export function zodValidate(schema: z.ZodType) {
  return (value: string): true | string => {
    const result = schema.safeParse(value);
    if (result.success) return true;
    return result.error.issues[0].message;
  };
}
