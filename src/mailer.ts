import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP2GO_API_KEY!,
    pass: process.env.SMTP2GO_API_KEY!,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  await transporter.sendMail({
    from: `"Ordernova" <${process.env.MAIL_FROM}>`,
    to,
    subject: "Your verification code",
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 32px;">
        <h2 style="font-size: 20px; font-weight: 600; color: #111;">Your verification code</h2>
        <p style="color: #555; font-size: 14px; margin-top: 8px;">
          Use the code below to reset your password. It expires in 10 minutes.
        </p>
        <div style="margin: 24px 0; padding: 20px; background: #f9f9f9; border-radius: 12px; text-align: center;">
          <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #111;">${otp}</span>
        </div>
        <p style="color: #999; font-size: 12px;">If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  });
}
