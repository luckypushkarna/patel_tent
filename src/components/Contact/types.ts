export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: EventType;
  guests: string;
  eventDate: string;
  location: string;
  message: string;
}

export type EventType =
  | ""
  | "wedding"
  | "reception"
  | "engagement"
  | "corporate"
  | "birthday"
  | "festival"
  | "other";

export type SubmitStatus = "idle" | "loading" | "success" | "error";
