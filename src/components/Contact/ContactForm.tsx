"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { FieldWrapper } from "./ui/FieldWrapper";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { SuccessCard } from "./SuccessCard";
import { contactSchema, type ContactSchema } from "./validation";
import { EVENT_TYPES } from "./constants";
import type { SubmitStatus } from "./types";

/**
 * Generates a WhatsApp URL with pre-filled form data.
 */
function getWhatsAppUrl(data: ContactSchema): string {
  const targetNumber = "917014451109"; // Removed + and spaces

  const message = `*New Inquiry from Patel Tent Website*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}

*Event Details:*
*Type:* ${data.eventType.charAt(0).toUpperCase() + data.eventType.slice(1)}
*Guests:* ${data.guests}
*Date:* ${data.eventDate}
*Location:* ${data.location}

*Message:*
${data.message}`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      guests: "",
      eventDate: "",
      location: "",
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (data: ContactSchema) => {
      setStatus("loading");
      setApiError(null);

      try {
        // Generate the WhatsApp URL
        const whatsappUrl = getWhatsAppUrl(data);
        
        // Show success briefly
        setStatus("success");
        reset();

        // Redirect to WhatsApp
        window.open(whatsappUrl, "_blank");
      } catch {
        setStatus("error");
        setApiError("Something went wrong. Please try again.");
      }
    },
    [reset]
  );

  // Auto-hide success card after 15 seconds so they have time to see it when returning from WhatsApp
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 15000);
    return () => clearTimeout(timer);
  }, [status]);

  // Today's date for min attribute
  const todayISO = new Date().toISOString().split("T")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      className="
        w-full
        bg-white
        border border-[#EAE3D6]
        rounded-3xl
        p-6 sm:p-10 lg:p-12
        shadow-[0_20px_60px_rgba(0,0,0,0.06)]
      "
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <SuccessCard key="success" />
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
            aria-label="Contact form"
          >
            {/* Row 1 — Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldWrapper
                label="Full Name"
                htmlFor="name"
                required
                error={errors.name?.message}
              >
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Rajesh Patel"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  hasError={!!errors.name}
                  {...register("name")}
                />
              </FieldWrapper>

              <FieldWrapper
                label="Email"
                htmlFor="email"
                required
                error={errors.email?.message}
              >
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  hasError={!!errors.email}
                  {...register("email")}
                />
              </FieldWrapper>
            </div>

            {/* Row 2 — Phone + Event Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldWrapper
                label="Phone"
                htmlFor="phone"
                required
                error={errors.phone?.message}
              >
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  hasError={!!errors.phone}
                  {...register("phone")}
                />
              </FieldWrapper>

              <FieldWrapper
                label="Event Type"
                htmlFor="eventType"
                required
                error={errors.eventType?.message}
              >
                <Select
                  id="eventType"
                  options={EVENT_TYPES}
                  aria-invalid={!!errors.eventType}
                  aria-describedby={
                    errors.eventType ? "eventType-error" : undefined
                  }
                  hasError={!!errors.eventType}
                  {...register("eventType")}
                />
              </FieldWrapper>
            </div>

            {/* Row 3 — Guests + Event Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldWrapper
                label="Guests"
                htmlFor="guests"
                required
                error={errors.guests?.message}
              >
                <Input
                  id="guests"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  placeholder="e.g. 250"
                  aria-invalid={!!errors.guests}
                  aria-describedby={errors.guests ? "guests-error" : undefined}
                  hasError={!!errors.guests}
                  {...register("guests")}
                />
              </FieldWrapper>

              <FieldWrapper
                label="Event Date"
                htmlFor="eventDate"
                required
                error={errors.eventDate?.message}
              >
                <Input
                  id="eventDate"
                  type="date"
                  min={todayISO}
                  autoComplete="off"
                  suppressHydrationWarning
                  aria-invalid={!!errors.eventDate}
                  aria-describedby={
                    errors.eventDate ? "eventDate-error" : undefined
                  }
                  hasError={!!errors.eventDate}
                  {...register("eventDate")}
                />
              </FieldWrapper>
            </div>

            {/* Row 4 — Location */}
            <FieldWrapper
              label="Location"
              htmlFor="location"
              required
              error={errors.location?.message}
            >
              <Input
                id="location"
                type="text"
                autoComplete="address-level2"
                placeholder="e.g. Udaipur, Rajasthan"
                aria-invalid={!!errors.location}
                aria-describedby={
                  errors.location ? "location-error" : undefined
                }
                hasError={!!errors.location}
                {...register("location")}
              />
            </FieldWrapper>

            {/* Row 5 — Message */}
            <FieldWrapper
              label="Message"
              htmlFor="message"
              required
              error={errors.message?.message}
            >
              <Textarea
                id="message"
                placeholder="Tell us a little about your vision — themes, mood, guest experience…"
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "message-error" : undefined
                }
                hasError={!!errors.message}
                {...register("message")}
              />
            </FieldWrapper>

            {/* API Error */}
            {status === "error" && apiError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  flex items-center gap-2
                  px-4 py-3
                  rounded-[12px]
                  bg-[#B84545]/[0.06]
                  border border-[#B84545]/25
                  text-[13.5px] text-[#B84545]
                "
                role="alert"
              >
                {apiError}
              </motion.div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                loading={isSubmitting || status === "loading"}
              >
                Send Inquiry
              </Button>
              <p className="mt-4 text-center text-[12px] text-[#0B3558]/50">
                We typically respond within 24 hours.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
