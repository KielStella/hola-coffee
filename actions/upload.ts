"use server";

import { put, del } from "@vercel/blob";
import { requireAuth, requireRole } from "@/lib/rbac";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export type UploadFolder = "menu" | "rewards" | "staff" | "gallery" | "settings" | "avatars" | "moments";

// Profile pictures are restricted to PNG/JPG/JPEG per spec; other content
// images additionally allow WebP/GIF for more flexibility.
const ALLOWED_TYPES: Record<UploadFolder, string[]> = {
  avatars: ["image/png", "image/jpeg"],
  menu: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  rewards: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  staff: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  gallery: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  settings: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  moments: ["image/jpeg", "image/png", "image/webp"],
};

export async function uploadImage(formData: FormData, folder: UploadFolder) {
  // Any signed-in user may upload their own avatar; everything else is admin-only content.
  const session = folder === "avatars" || folder === "moments" ? await requireAuth() : await requireRole("ADMIN");

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { success: false as const, error: "No file provided." };
  }
  if (!ALLOWED_TYPES[folder].includes(file.type)) {
    return {
      success: false as const,
      error:
        folder === "avatars"
          ? "Please upload a PNG, JPG, or JPEG image."
          : "Please upload a JPEG, PNG, WebP, or GIF image.",
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { success: false as const, error: "Image must be smaller than 5MB." };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false as const,
      error: "Image uploads aren't configured yet — add BLOB_READ_WRITE_TOKEN to your environment.",
    };
  }

  const extension = file.name.split(".").pop() ?? "jpg";
  const pathPrefix =
    folder === "avatars" ? `avatars/${session.user.id}` : folder === "moments" ? `moments/${session.user.id}` : folder;
  const filename = `${pathPrefix}/${crypto.randomUUID()}.${extension}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return { success: true as const, url: blob.url };
}

/** Deletes a previously-uploaded image, e.g. when replacing it with a new one. Safe to call with a non-Blob URL — it's a no-op. */
export async function deleteUploadedImage(url: string) {
  const session = await requireAuth();
  if (!url.includes(".public.blob.vercel-storage.com")) return { success: true as const };

  // Non-admins may only delete images under their own avatar path — admins
  // manage all other content images (menu/rewards/staff/gallery/settings).
  const isOwnAvatar = url.includes(`/avatars/${session.user.id}/`);
  const isOwnMoment = url.includes(`/moments/${session.user.id}/`);
  if (session.user.role !== "ADMIN" && !isOwnAvatar && !isOwnMoment) {
    return { success: false as const, error: "You don't have permission to delete this image." };
  }

  try {
    await del(url);
  } catch (error) {
    console.error("[upload] failed to delete old image:", error);
  }
  return { success: true as const };
}
