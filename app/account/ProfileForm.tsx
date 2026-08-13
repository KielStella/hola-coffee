"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Save } from "lucide-react";
import { updateProfile } from "@/actions/auth";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validations/auth";
import PhilippinePhoneInput, { phoneToLocalDigits } from "@/components/PhilippinePhoneInput";
import ImageUploadField from "@/components/dashboard/ImageUploadField";

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-2.5 text-sm text-hola-brown outline-none transition placeholder:text-hola-brown-soft/60 focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

export default function ProfileForm({ name, phone, image }: { name: string; phone: string; image: string }) {
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name, phone, image },
  });
  const imageValue = useWatch({ control, name: "image" });
  const phoneValue = useWatch({ control, name: "phone" });

  async function onSubmit(data: UpdateProfileInput) {
    setSaved(false);
    const result = await updateProfile(data);
    if (result.success) setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4">
      <ImageUploadField
        folder="avatars"
        value={imageValue || ""}
        onChange={(url) => setValue("image", url, { shouldDirty: true })}
        label="Profile Picture"
        rounded
      />

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
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhilippinePhoneInput
              id="phone"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={!!errors.phone}
            />
          )}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        {phoneValue && phoneToLocalDigits(phoneValue).length > 0 && phoneToLocalDigits(phoneValue).length < 10 && (
          <p className="mt-1 text-xs text-hola-brown-soft">Enter all 10 digits.</p>
        )}
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
