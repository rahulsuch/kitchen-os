import nodemailer from 'nodemailer';

// 1. Create the "Transporter" (The engine that sends the email)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends a password reset email with the unhashed token.
 * @param {string} userEmail - The recipient's email
 * @param {string} unhashedToken - The raw token generated in the controller
 */
const sendResetPasswordEmail = async (userEmail, unhashedToken) => {
  // In production, this URL will point to your frontend React app's reset page
  const resetUrl = `http://localhost:5173/reset-password/${unhashedToken}`;

  const message = {
    from: `${process.env.EMAIL_FROM}`,
    to: userEmail,
    subject: 'Kitchen-OS: Password Reset Request',
    html: `
      <h1>You requested a password reset</h1>
      <p>Please click the link below to reset your password. This link is valid for 10 minutes.</p>
      <a href="${resetUrl}" target="_blank">Reset Your Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  // 2. Execute the send operation
  const info = await transporter.sendMail(message);
  console.log(`Email sent: ${info.messageId}`);
};

// Export the object so your auth controller can import it
export default {
  sendResetPasswordEmail,
};