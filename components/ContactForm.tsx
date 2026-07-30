"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContactMessage } from "@/actions/contact";

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number.").optional().or(z.literal("")),
  subject: z.string().min(3, "Please enter a subject."),
  message: z.string().min(10, "Message should be at least 10 characters."),
});

type ContactValues = z.infer<typeof contactSchema>;

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-3 text-hola-brown outline-none transition placeholder:text-hola-brown-soft/60 focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactValues) {
    const result = await submitContactMessage(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    setServerError(null);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-hola-lg bg-white p-10 text-center shadow-md"
      >
        <CheckCircle2 className="h-12 w-12 text-hola-blue" />
        <h3 className="mt-4 text-2xl text-hola-brown">Thank you for contacting HOLA Coffee.</h3>
        <p className="mt-2 text-hola-brown-soft">We&apos;ll get back to you as soon as possible.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-full bg-hola-blue px-6 py-2.5 font-display text-white transition hover:bg-hola-blue-dark"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-hola-lg bg-white p-8 shadow-md sm:p-10"
      aria-label="Contact form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Full Name
          </label>
          <input id="fullName" className={inputClass} placeholder="Juan Dela Cruz" {...register("fullName")} />
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="you@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Phone Number <span className="font-normal text-hola-brown-soft">(optional)</span>
          </label>
          <input id="phone" className={inputClass} placeholder="+63 9XX XXX XXXX" {...register("phone")} />
          {errors.phone && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Subject
          </label>
          <input
            id="subject"
            className={inputClass}
            placeholder="General Inquiry"
            {...register("subject")}
          />
          {errors.subject && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-hola-brown">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputClass}
          placeholder="Tell us how we can help…"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="rounded-hola-sm bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-hola-blue px-8 py-3.5 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
