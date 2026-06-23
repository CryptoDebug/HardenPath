import "server-only";

type Message = {
  subject: string;
  text: string;
  to: string;
};

async function send(message: Message) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return false;

  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({ from: process.env.EMAIL_FROM, ...message }),
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (!response.ok) throw new Error(`Email provider rejected the message with status ${response.status}.`);
  return true;
}

export function sendVerificationEmail(email: string, token: string) {
  const url = new URL("/account/verify", process.env.NEXTAUTH_URL ?? "http://localhost:3000");
  url.searchParams.set("token", token);
  return send({
    subject: "Verify your HardenPath email",
    text: `Confirm your HardenPath email address by opening this link within 24 hours:\n\n${url.toString()}\n\nIf you did not create this account, ignore this message.`,
    to: email
  });
}

export function sendPasswordResetEmail(email: string, token: string) {
  const url = new URL("/account/reset-password", process.env.NEXTAUTH_URL ?? "http://localhost:3000");
  url.searchParams.set("token", token);
  return send({
    subject: "Reset your HardenPath password",
    text: `Reset your HardenPath password by opening this link within one hour:\n\n${url.toString()}\n\nIf you did not request this reset, ignore this message.`,
    to: email
  });
}
