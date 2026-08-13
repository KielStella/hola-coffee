"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, LoaderCircle, MessageSquareText, Send } from "lucide-react";
import { submitContactMessage } from "@/actions/contact";
import { getMyProfile } from "@/actions/profile";
import { philippinePhoneSchema } from "@/lib/validations/auth";
import PhilippinePhoneInput from "@/components/PhilippinePhoneInput";

const contactSchema = z.object({ fullName: z.string().min(2, "Please enter your full name."), email: z.string().email("Please enter a valid email address."), phone: philippinePhoneSchema, subject: z.string().min(3, "Please enter a subject."), message: z.string().min(10, "Message should be at least 10 characters.") });
type ContactValues = z.infer<typeof contactSchema>;
const inputClass = "w-full rounded-2xl border border-hola-brown/10 bg-hola-beige/70 px-4 py-3.5 text-hola-brown outline-none transition placeholder:text-hola-brown-soft/50 hover:border-hola-brown/20 focus:border-hola-blue focus:bg-white focus:ring-2 focus:ring-hola-blue/20";
const subjects = ["General Inquiry", "Customer Feedback", "Partnership", "Order Concern"];

export default function ContactForm() {
  const { status } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, reset, control, setValue, formState: { errors, isSubmitting } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: { fullName: "", email: "", phone: "", subject: "", message: "" } });
  const message = useWatch({ control, name: "message" });
  const subject = useWatch({ control, name: "subject" });

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    (async () => { try { const profile = await getMyProfile(); if (cancelled || !profile) return; reset(current => ({ ...current, fullName: current.fullName || profile.name, email: current.email || profile.email, phone: current.phone || profile.phone })); } catch (error) { console.error("[contact] failed to autofill from profile:", error); } })();
    return () => { cancelled = true; };
  }, [status, reset]);

  async function onSubmit(data: ContactValues) {
    setServerError(null);
    const result = await submitContactMessage(data);
    if (!result.success) { setServerError(result.error); return; }
    setSubmitted(true); reset();
  }

  if (submitted) return <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[560px] flex-col items-center justify-center rounded-[2.5rem] border border-hola-yellow/40 bg-hola-yellow-soft/40 p-10 text-center shadow-lg"><span className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl"><CheckCircle2 className="h-10 w-10 text-emerald-600" /></span><h3 className="mt-6 text-3xl text-hola-brown">Message received!</h3><p className="mt-3 max-w-sm leading-7 text-hola-brown-soft">Thank you for reaching out. The HOLA team will get back to you as soon as possible.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-full bg-hola-brown px-7 py-3 font-display text-white transition hover:-translate-y-1 hover:bg-hola-blue-dark">Send another message</button></motion.div>;

  const errorText = (message?: string) => message ? <p className="mt-1.5 text-sm text-red-600" role="alert">{message}</p> : null;
  return <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form" className="space-y-6 rounded-[2.5rem] border border-hola-brown/[.07] bg-white p-6 shadow-[0_28px_70px_-45px_rgba(74,51,37,.65)] sm:p-10">
    <div className="flex items-start gap-4 border-b border-hola-brown/[.07] pb-6"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-hola-yellow-soft"><MessageSquareText className="h-6 w-6 text-hola-brown" /></span><div><h3 className="text-2xl text-hola-brown">How can we help?</h3><p className="mt-1 text-sm text-hola-brown-soft">Share the details and we&apos;ll take it from here.</p></div></div>
    <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-hola-brown">Full name</label><input id="fullName" className={inputClass} placeholder="Juan Dela Cruz" autoComplete="name" {...register("fullName")} />{errorText(errors.fullName?.message)}</div><div><label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-hola-brown">Email address</label><input id="email" type="email" className={inputClass} placeholder="you@email.com" autoComplete="email" {...register("email")} />{errorText(errors.email?.message)}</div></div>
    <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-hola-brown">Phone number <span className="font-normal text-hola-brown-soft">(optional)</span></label><Controller name="phone" control={control} render={({field}) => <PhilippinePhoneInput id="phone" value={field.value ?? ""} onChange={field.onChange} onBlur={field.onBlur} aria-invalid={!!errors.phone} />} />{errorText(errors.phone?.message)}</div><div><label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-hola-brown">Subject</label><input id="subject" className={inputClass} placeholder="What can we help with?" {...register("subject")} />{errorText(errors.subject?.message)}</div></div>
    <div><p className="mb-2 text-sm font-semibold text-hola-brown">Quick topics</p><div className="flex flex-wrap gap-2">{subjects.map(item => <button key={item} type="button" onClick={() => setValue("subject", item, {shouldValidate: true})} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${subject === item ? "bg-hola-blue text-white shadow" : "bg-hola-beige text-hola-brown-soft hover:bg-hola-yellow-soft hover:text-hola-brown"}`}>{item}</button>)}</div></div>
    <div><div className="flex items-center justify-between"><label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-hola-brown">Message</label><span className="text-xs text-hola-brown-soft">{message?.length ?? 0} characters</span></div><textarea id="message" rows={6} className={`${inputClass} resize-none`} placeholder="Tell us how we can help…" {...register("message")} />{errorText(errors.message?.message)}</div>
    {serverError && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">{serverError}</p>}
    <button type="submit" disabled={isSubmitting} className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-hola-brown px-8 py-4 font-display text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-hola-blue-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">{isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}{isSubmitting ? "Sending…" : "Send message"}</button>
  </form>;
}
