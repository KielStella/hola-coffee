"use client";

import { useRef, useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import { Save, CheckCircle2, Upload, Loader2, X } from "lucide-react";
import { updateSettings, type SettingsInput } from "@/actions/settings";

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-3 py-2 text-sm text-hola-brown outline-none focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";
const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-hola-brown-soft";

export default function SettingsForm({ initial }: { initial: SettingsInput }) {
  const [form, setForm] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoError(null);
    setIsUploadingVideo(true);
    try {
      const blob = await upload(`videos/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/video-upload",
        multipart: true,
      });
      setForm((current) => ({
        ...current,
        homepageVideoUrl: blob.url,
        homepageVideoType: "upload",
      }));
    } catch (error) {
      setVideoError(error instanceof Error ? error.message : "Video upload failed.");
    } finally {
      setIsUploadingVideo(false);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  function field<K extends keyof SettingsInput>(key: K) {
    return {
      value: (form[key] as string | number | undefined) ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-hola-lg bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-hola-brown">Business Info</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Site Name</label>
            <input className={inputClass} {...field("siteName")} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} {...field("phone")} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Address</label>
            <input className={inputClass} {...field("address")} />
          </div>
          <div>
            <label className={labelClass}>Business Email</label>
            <input className={inputClass} {...field("email")} />
          </div>
          <div>
            <label className={labelClass}>Google Maps URL</label>
            <input className={inputClass} {...field("mapsUrl")} />
          </div>
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input className={inputClass} {...field("facebookUrl")} />
          </div>
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input className={inputClass} {...field("instagramUrl")} />
          </div>
          <div>
            <label className={labelClass}>Weekday Hours</label>
            <input className={inputClass} {...field("hoursWeekday")} />
          </div>
          <div>
            <label className={labelClass}>Weekend Hours</label>
            <input className={inputClass} {...field("hoursWeekend")} />
          </div>
        </div>
      </div>

      <div className="rounded-hola-lg bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-hola-brown">Homepage Video</h2>
        <p className="mt-1 text-sm text-hola-brown-soft">
          Replaces the customer testimonials section. Upload an MP4/WebM video or paste a public TikTok video URL.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelClass}>TikTok Video URL</label>
            <input
              type="url"
              placeholder="https://www.tiktok.com/@username/video/123..."
              className={inputClass}
              value={form.homepageVideoType === "tiktok" ? form.homepageVideoUrl ?? "" : ""}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  homepageVideoUrl: e.target.value,
                  homepageVideoType: e.target.value ? "tiktok" : "",
                }))
              }
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={isUploadingVideo}
              onClick={() => videoInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full border border-hola-brown/15 px-4 py-2 text-sm text-hola-brown transition hover:bg-hola-beige disabled:opacity-60"
            >
              {isUploadingVideo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {isUploadingVideo ? "Uploading video…" : "Upload MP4 or WebM"}
            </button>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm"
              onChange={handleVideoUpload}
              className="hidden"
            />
            {form.homepageVideoUrl && (
              <button
                type="button"
                onClick={() =>
                  setForm((current) => ({ ...current, homepageVideoUrl: "", homepageVideoType: "" }))
                }
                className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline"
              >
                <X className="h-4 w-4" /> Remove video
              </button>
            )}
          </div>

          {form.homepageVideoType === "upload" && form.homepageVideoUrl && (
            <video src={form.homepageVideoUrl} controls muted className="max-h-72 w-full rounded-hola-sm bg-black" />
          )}
          {videoError && <p className="text-sm text-red-600">{videoError}</p>}
          <p className="text-xs text-hola-brown-soft">
            Videos autoplay muted because browsers block autoplay with sound. Maximum upload size: 100 MB.
          </p>
        </div>
      </div>

      <div className="rounded-hola-lg bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-hola-brown">Loyalty Program</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Points Per Order</label>
            <input
              type="number"
              className={inputClass}
              value={form.pointsPerOrder ?? 0}
              onChange={(e) => setForm((f) => ({ ...f, pointsPerOrder: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className={labelClass}>Birthday Bonus</label>
            <input
              type="number"
              className={inputClass}
              value={form.birthdayBonusPoints ?? 0}
              onChange={(e) => setForm((f) => ({ ...f, birthdayBonusPoints: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className={labelClass}>Points Multiplier</label>
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={form.pointsMultiplier ?? 1}
              onChange={(e) => setForm((f) => ({ ...f, pointsMultiplier: Number(e.target.value) }))}
            />
          </div>
        </div>
      </div>

      <div className="rounded-hola-lg bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-hola-brown">SEO</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input className={inputClass} {...field("seoTitle")} />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <input className={inputClass} {...field("seoDescription")} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-hola-blue px-6 py-3 font-display text-white transition hover:bg-hola-blue-dark disabled:opacity-60"
      >
        {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {isPending ? "Saving…" : saved ? "Saved!" : "Save Settings"}
      </button>
    </form>
  );
}
