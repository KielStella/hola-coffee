"use client";

import { forwardRef, useState, type ChangeEvent } from "react";

/** Strips a full "+63XXXXXXXXXX" (or "63XXXXXXXXXX" / "09XXXXXXXXX") value down to the 10 local digits for display. */
export function phoneToLocalDigits(value: string | null | undefined): string {
  if (!value) return "";
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("63")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/** Formats 10 local digits back into the canonical "+63XXXXXXXXXX" storage format. Returns "" if incomplete. */
export function localDigitsToPhone(digits: string): string {
  const clean = digits.replace(/\D/g, "").slice(0, 10);
  return clean.length === 10 ? `+63${clean}` : "";
}

/** Pretty display format, e.g. "+63 917 123 4567". Falls back to the raw value if it doesn't match. */
export function formatPhoneDisplay(value: string | null | undefined): string {
  const digits = phoneToLocalDigits(value);
  if (digits.length !== 10) return value ?? "";
  return `+63 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

type PhilippinePhoneInputProps = {
  value: string;
  onChange: (fullPhone: string) => void;
  id?: string;
  name?: string;
  onBlur?: () => void;
  "aria-invalid"?: boolean;
};

/**
 * Phone number field with a fixed, non-editable "+63" prefix. The caller
 * only ever sees/stores the canonical "+63XXXXXXXXXX" string (via onChange)
 * once exactly 10 digits have been entered — otherwise onChange receives ""
 * so form validation can catch incomplete numbers.
 */
const PhilippinePhoneInput = forwardRef<HTMLInputElement, PhilippinePhoneInputProps>(
  function PhilippinePhoneInput({ value, onChange, id, name, onBlur, ...rest }, ref) {
    const [digits, setDigits] = useState(() => phoneToLocalDigits(value));

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      const nextDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
      setDigits(nextDigits);
      onChange(localDigitsToPhone(nextDigits));
    }

    return (
      <div className="flex items-stretch overflow-hidden rounded-hola-sm border border-hola-brown/10 bg-hola-beige focus-within:border-hola-blue focus-within:ring-2 focus-within:ring-hola-blue/30">
        <span className="flex items-center border-r border-hola-brown/10 bg-hola-beige px-3 font-display text-sm text-hola-brown-soft select-none">
          +63
        </span>
        <input
          ref={ref}
          id={id}
          name={name}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={digits}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="9171234567"
          maxLength={10}
          className="w-full bg-transparent px-3 py-3 text-hola-brown outline-none placeholder:text-hola-brown-soft/60"
          {...rest}
        />
      </div>
    );
  }
);

export default PhilippinePhoneInput;
