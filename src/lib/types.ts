import { object, string, number, output, array, input } from "zod";

export enum Collections {
  items = "items/",
  categories = "categories/",
  variants = "variants/",
}

const requiredString = (
  name: string,
  constraint?: {
    min?: number;
    max?: number;
  },
) => {
  if (constraint?.min && constraint?.max) {
    return string({
      required_error: `${name} is required.`,
    })
      .min(
        constraint.min,
        `${name} must contain atleast ${constraint.min} characters.`,
      )
      .max(
        constraint.max,
        `${name} must contain atleast ${constraint.max} characters.`,
      );
  } else if (constraint?.min) {
    return string({
      required_error: `${name} is required.`,
    }).min(
      constraint.min,
      `${name} must contain atleast ${constraint.min} characters.`,
    );
  } else if (constraint?.max) {
    return string({
      required_error: `${name} is required.`,
    }).max(
      constraint.max,
      `${name} must contain atleast ${constraint.max} characters.`,
    );
  } else {
    return string({ required_error: `${name} is required.` });
  }
};

export type GenericResponse = {
  body: string;
  errors: Record<string, string[]>;
};

const cost = number().min(0).max(1000000).default(0);
const stock = number().max(1000000).default(0);

export const optionSchema = object({
  name: requiredString("Option Name", { min: 1, max: 32 }),
  cost,
  stock,
});

export type Option = output<typeof optionSchema>;

export const itemSchema = object({
  id: string(),
  name: requiredString("Item Name", { min: 2, max: 100 }),
  cost,
  stock,
  images: array(string()).default(["/default.png"]),
  options: array(optionSchema).default([]),
  category: string().default("default"),
});

export type CreateItem = input<typeof itemSchema>;
export type Item = output<typeof itemSchema>;
