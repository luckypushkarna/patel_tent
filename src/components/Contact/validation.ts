import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Please enter at least 3 characters.")
    .max(60, "Name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .regex(/^[0-9\s+()-]+$/, "Only numbers are allowed.")
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
      },
      { message: "Phone must be 10 to 15 digits." }
    ),

  eventType: z
    .string()
    .min(1, "Please select an event type."),

  guests: z
    .string()
    .trim()
    .min(1, "Please enter guest count.")
    .refine((val) => {
      const num = Number(val);
      return Number.isFinite(num) && num > 0 && num <= 100000;
    }, { message: "Please enter a valid number." }),

  eventDate: z
    .string()
    .trim()
    .min(1, "Please pick an event date.")
    .refine((val) => {
      const picked = new Date(val);
      picked.setHours(0, 0, 0, 0);
      return picked.getTime() >= today.getTime();
    }, { message: "Event date cannot be in the past." }),

  location: z
    .string()
    .trim()
    .min(2, "Please enter a location.")
    .max(120, "Location is too long."),

  message: z
    .string()
    .trim()
    .min(20, "Message should be at least 20 characters.")
    .max(500, "Message must be under 500 characters."),
});

export type ContactSchema = z.infer<typeof contactSchema>;
