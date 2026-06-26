import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER!,
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN!,
  },
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
}

export const sendEmail = async ({
  to,
  subject,
  text
}: SendEmailOptions): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to,
      subject,
      text
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default transporter;