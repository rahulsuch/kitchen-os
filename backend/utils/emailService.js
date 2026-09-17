import nodemailer from "nodemailer";

// Lazy-initialized transporter — created on first use, AFTER dotenv.config() has run.
// (ES modules hoist imports before top-level code executes, so reading process.env
//  at the top level would see undefined values before dotenv loads the .env file.)
let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "localhost",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: parseInt(process.env.SMTP_PORT) === 465, // true for 465 (SSL), false for 587 (TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Sends a password reset email with the unhashed token.
 * @param {string} userEmail - The recipient's email
 * @param {string} unhashedToken - The raw token generated in the controller
 */
const sendResetPasswordEmail = async (userEmail, unhashedToken) => {
  // Uses FRONTEND_URL so it works in both local dev and production
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetUrl = `${frontendUrl}/reset-password/${unhashedToken}`;

  const message = {
    from: `"KitchenOS" <${process.env.EMAIL_FROM}>`,
    to: userEmail,
    subject: "KitchenOS — Password Reset Request",
    html: `
      <div style="max-width: 520px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a202c;">
        <div style="background: #2563eb; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">🔒 Password Reset</h1>
        </div>
        <div style="background: #ffffff; padding: 32px 24px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6;">
            Hi there,
          </p>
          <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6;">
            We received a request to reset your KitchenOS password. Click the button below to set a new password. This link expires in <strong>10 minutes</strong>.
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${resetUrl}" target="_blank"
               style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600;">
              Reset Your Password
            </a>
          </div>
          <p style="margin: 24px 0 0; font-size: 13px; color: #6b7280; line-height: 1.5;">
            If the button doesn't work, copy and paste this link into your browser:<br/>
            <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
          </p>
        </div>
        <div style="background: #f9fafb; padding: 16px 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            If you did not request this reset, you can safely ignore this email. Your password will remain unchanged.
          </p>
        </div>
      </div>
    `,
  };

  // Execute the send operation using the lazy-initialized transporter
  const info = await getTransporter().sendMail(message);
  console.log(`Email sent: ${info.messageId}`);
};

// Export the object so your auth controller can import it
export default {
  sendResetPasswordEmail,
};
