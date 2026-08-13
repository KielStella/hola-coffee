"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImage, deleteUploadedImage, type UploadFolder } from "@/actions/upload";

const ACCEPT_BY_FOLDER: Record<UploadFolder, string> = {
  avatars: "image/png,image/jpeg",
  menu: "image/jpeg,image/png,image/webp,image/gif",
  rewards: "image/jpeg,image/png,image/webp,image/gif",
  staff: "image/jpeg,image/png,image/webp,image/gif",
  gallery: "image/jpeg,image/png,image/webp,image/gif",
  settings: "image/jpeg,image/png,image/webp,image/gif",
  moments: "image/jpeg,image/png,image/webp",
};

export default function ImageUploadField({
  folder,
  value,
  onChange,
  label = "Image",
  rounded = false,
}: {
  folder: UploadFolder;
  value: string;
  onChange: (url: string) => void;
  label?: string;
  /** Circular preview — nice for avatars, not usually wanted for product/reward photos. */
  rounded?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewFailed, setPreviewFailed] = useState(false);
  const previewShape = rounded ? "rounded-full" : "rounded-hola-sm";

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImage(formData, folder);
      if (!result.success) {
        setError(result.error);
        return;
      }
      const previousUrl = value;
      setPreviewFailed(false);
      onChange(result.url);
      if (previousUrl) {
        deleteUploadedImage(previousUrl).catch(() => {});
      }
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    if (value) deleteUploadedImage(value).catch(() => {});
    setPreviewFailed(false);
    onChange("");
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-hola-brown">{label}</label>
      <div className="flex items-center gap-3">
        {value && !previewFailed ? (
          <div className={`relative h-16 w-16 shrink-0 overflow-hidden bg-hola-beige ${previewShape}`}>
            <Image
              src={value}
              alt={`${label} preview`}
              fill
              sizes="64px"
              unoptimized
              className="object-cover"
              onError={() => {
                setPreviewFailed(true);
                setError("The uploaded image could not be displayed. Please upload it again.");
              }}
            />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
              className="absolute right-0.5 top-0.5 rounded-full bg-white/90 p-0.5 text-hola-brown shadow"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center bg-hola-beige text-hola-brown-soft ${previewShape}`}>
            <Upload className="h-5 w-5" />
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-2 rounded-full border border-hola-brown/15 px-4 py-2 text-sm text-hola-brown transition hover:bg-hola-beige disabled:opacity-60"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isUploading ? "Uploading…" : value ? "Replace Image" : "Upload Image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_BY_FOLDER[folder]}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
