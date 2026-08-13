import nodemailer from "nodemailer";

type SendEmailInput = { to: string; subject: string; html: string; replyTo?: string };

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!user || !pass) return null;
  return nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailInput) {
  const transporter = getTransporter();
  const from = process.env.GMAIL_USER;
  if (!transporter || !from) {
    console.warn(`[email] Gmail SMTP is not configured; skipped email to ${to}.`);
    return { sent: false as const, reason: "not-configured" as const };
  }
  const info = await transporter.sendMail({ from: `HOLA Coffee <${from}>`, to, replyTo, subject, html });
  return { sent: true as const, messageId: info.messageId };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

const wrapper = (title: string, body: string) => `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#FFF8EC;border-radius:24px"><div style="display:inline-block;background:#F8DC6B;color:#4A3325;padding:8px 14px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.08em">HOLA COFFEE</div><h1 style="color:#4A3325;font-size:26px;margin:20px 0 8px">${title}</h1><div style="color:#4A3325;font-size:14px;line-height:1.7">${body}</div><p style="color:#7A5B45;font-size:12px;margin-top:32px;border-top:1px solid #eadfce;padding-top:18px">Brewing Happiness One Cup at a Time.</p></div>`;

export function contactConfirmationEmail(fullName: string) {
  return wrapper("Thank you for contacting HOLA Coffee", `<p>Hi ${escapeHtml(fullName)},</p><p>We received your message and our team will get back to you as soon as possible.</p>`);
}

export function contactAdminNotificationEmail(fullName: string, email: string, phone: string | undefined, subject: string, message: string) {
  return wrapper("New customer inquiry", `<p><strong>From:</strong> ${escapeHtml(fullName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><div style="margin-top:20px;padding:18px;background:#fff;border-radius:16px;white-space:pre-wrap">${escapeHtml(message)}</div><p style="margin-top:20px;color:#7A5B45">Reply directly to this email to respond to the customer.</p>`);
}

export function orderConfirmationEmail(orderNumber: string, total: number) {
  return wrapper("Order Confirmed", `<p>Your order <strong>${escapeHtml(orderNumber)}</strong> (₱${total}) has been placed. Present your QR code at the counter to begin preparation.</p>`);
}

export function passwordResetEmail(resetUrl: string) {
  const safeUrl = escapeHtml(resetUrl);
  return wrapper("Reset Your Password", `<p>Click the button below to reset your password. This link expires in 1 hour.</p><p><a href="${safeUrl}" style="display:inline-block;background:#5AA9E6;color:white;padding:10px 20px;border-radius:999px;text-decoration:none">Reset Password</a></p>`);
}
