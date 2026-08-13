// Email functionality disabled — provide no-op implementations so the
// rest of the app can import these helpers without requiring SMTP.

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  console.info(`[email disabled] would send to=${to} subject=${subject}`);
  return { sent: false };
}

const wrapper = (title: string, body: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background:#FFF8EC;">
    <h1 style="color:#4A3325; font-size:22px;">HOLA Coffee</h1>
    <h2 style="color:#4A3325; font-size:18px;">${title}</h2>
    <div style="color:#4A3325; font-size:14px; line-height:1.6;">${body}</div>
    <p style="color:#7A5B45; font-size:12px; margin-top:32px;">Brewing Happiness One Cup at a Time.</p>
  </div>
`;

export function contactConfirmationEmail(fullName: string) {
  return wrapper(
    "Thank you for contacting HOLA Coffee",
    `<p>Hi ${fullName},</p><p>We've received your message and our team will get back to you as soon as possible.</p>`
  );
}

export function contactAdminNotificationEmail(fullName: string, email: string, subject: string, message: string) {
  return wrapper(
    "New Contact Message",
    `<p><strong>From:</strong> ${fullName} (${email})</p><p><strong>Subject:</strong> ${subject}</p><p>${message}</p>`
  );
}

export function orderConfirmationEmail(orderNumber: string, total: number) {
  return wrapper(
    "Order Confirmed",
    `<p>Your order <strong>${orderNumber}</strong> (₱${total}) has been placed. Present your QR code at the counter to begin preparation.</p>`
  );
}

export function passwordResetEmail(resetUrl: string) {
  return wrapper(
    "Reset Your Password",
    `<p>Click the button below to reset your password. This link expires in 1 hour.</p>
     <p><a href="${resetUrl}" style="display:inline-block; background:#5AA9E6; color:white; padding:10px 20px; border-radius:999px; text-decoration:none;">Reset Password</a></p>`
  );
}
