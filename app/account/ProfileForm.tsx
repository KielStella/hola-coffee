"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Save } from "lucide-react";
import { updateProfile } from "@/actions/auth";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validations/auth";

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-2.5 text-sm text-hola-brown outline-none transition placeholder:text-hola-brown-soft/60 focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

export default function ProfileForm({ name, phone, image }: { name: string; phone: string; image: string }) {
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name, phone, image },
  });

  async function onSubmit(data: UpdateProfileInput) {
    setSaved(false);
    const result = await updateProfile(data);
    if (result.success) setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-hola-brown">
          Full Name
        </label>
        <input id="name" className={inputClass} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-hola-brown">
          Phone Number
        </label>
        <input id="phone" className={inputClass} {...register("phone")} />
      </div>
      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-semibold text-hola-brown">
          Profile Picture URL
        </label>
        <input id="image" className={inputClass} placeholder="https://…" {...register("image")} />
        {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-6 py-2.5 text-sm font-display text-white transition hover:bg-hola-blue-dark disabled:opacity-70"
      >
        {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {isSubmitting ? "Saving…" : saved ? "Saved!" : "Save Changes"}
      </button>
    </form>
  );
}
