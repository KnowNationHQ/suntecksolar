import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { sanitize } from "@/lib/sanitize"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const firstName = sanitize(body.firstName)
    const lastName = sanitize(body.lastName)
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const phone = typeof body.phone === "string" ? body.phone.trim() : ""
    const subject = sanitize(body.subject)
    const message = sanitize(body.message)

    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    const text = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Subject: ${subject}`,
      `Message: ${message}`,
    ].join("\n")

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "helpdesk@suntecksolars.com",
        subject: `[SunteckSolar] ${subject}`,
        text,
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }
}
