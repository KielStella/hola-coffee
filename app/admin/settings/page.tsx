import { getSettings } from "@/actions/settings";
import SettingsForm from "@/components/dashboard/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Website Settings</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Business info, loyalty program rules, and SEO defaults.</p>
      <div className="mt-6 max-w-2xl">
        <SettingsForm
          initial={{
            siteName: settings.siteName,
            address: settings.address ?? "",
            phone: settings.phone ?? "",
            email: settings.email ?? "",
            mapsUrl: settings.mapsUrl ?? "",
            facebookUrl: settings.facebookUrl ?? "",
            instagramUrl: settings.instagramUrl ?? "",
            hoursWeekday: settings.hoursWeekday ?? "",
            hoursWeekend: settings.hoursWeekend ?? "",
            pointsPerOrder: settings.pointsPerOrder,
            birthdayBonusPoints: settings.birthdayBonusPoints,
            pointsMultiplier: settings.pointsMultiplier,
            seoTitle: settings.seoTitle ?? "",
            seoDescription: settings.seoDescription ?? "",
            homepageVideoUrl: settings.homepageVideoUrl ?? "",
            homepageVideoType: (settings.homepageVideoType as "upload" | "tiktok" | null) ?? "",
          }}
        />
      </div>
    </div>
  );
}
