import type { Testimonial } from "./types";

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t1",
    quote:
      "The entire venue looked breathtaking. Every detail — from the mandap to the lighting — was executed with such grace and precision. Our guests are still talking about it months later.",
    name: "Rahul & Priya Sharma",
    event: "Wedding",
    location: "Udaipur, Rajasthan",
  },
  {
    id: "t2",
    quote:
      "Professional, punctual, and incredibly creative. They didn’t just decorate — they transformed our vision into something far more beautiful than we imagined. A truly unforgettable experience.",
    name: "Mehul Shah",
    event: "Corporate Gala",
    location: "Udaipur, Rajasthan",
  },
  {
    id: "t3",
    quote:
      "From the first meeting to the final cleanup, everything was flawless. The floral work, the tent setup, the lighting — it felt like we were in a dream. We couldn’t have asked for a better team.",
    name: "Jinal & Karan Patel",
    event: "Reception",
    location: "Udaipur, Rajasthan",
  },
] as const;
