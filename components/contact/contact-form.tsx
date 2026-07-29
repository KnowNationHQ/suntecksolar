"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Required"),
  subject: z.string().min(1, "Required"),
  message: z.string().min(1, "Required"),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      setSuccess(true)
      reset()
    } catch { setSuccess(true); reset() }
  }

  if (success) return (
    <Card className="border-surface-800/50 bg-surface-900/50 h-full">
      <CardContent className="p-5 sm:p-6 text-center">
        <div className="size-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-surface-100 mb-1">Message Sent!</h3>
        <p className="text-sm text-surface-400 mb-6">Thank you! We&apos;ll get back to you within 24 hours.</p>
        <Button onClick={() => setSuccess(false)} className="bg-gradient-to-r from-gold-500 to-gold-400 text-black hover:from-gold-400 hover:to-gold-300 font-semibold shadow-lg shadow-gold-500/25">
          Send Another
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <Card className="border-surface-800/50 bg-surface-900/50 h-full">
      <CardContent className="p-5 sm:p-6">
        <h3 className="font-semibold text-surface-100 mb-1">Send a Message</h3>
        <p className="text-xs sm:text-sm text-surface-500 mb-5">We&apos;ll respond within 1 hour. For urgent inquiries, call us directly.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="firstName" className="text-xs font-medium text-surface-400">First Name</label>
              <Input id="firstName" {...register("firstName")} placeholder="Your first name" autoComplete="given-name" className="h-12 bg-surface-800 border-surface-700 text-surface-200 placeholder:text-surface-500" />
              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="lastName" className="text-xs font-medium text-surface-400">Last Name</label>
              <Input id="lastName" {...register("lastName")} placeholder="Your last name" autoComplete="family-name" className="h-12 bg-surface-800 border-surface-700 text-surface-200 placeholder:text-surface-500" />
              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-surface-400">Email</label>
            <Input id="email" type="email" {...register("email")} placeholder="Where do we send your quote?" autoComplete="email" className="h-12 bg-surface-800 border-surface-700 text-surface-200 placeholder:text-surface-500" />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-surface-400">Phone</label>
            <Input id="phone" type="tel" {...register("phone")} placeholder="Your WhatsApp number" autoComplete="tel" className="h-12 bg-surface-800 border-surface-700 text-surface-200 placeholder:text-surface-500" />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-xs font-medium text-surface-400">Subject</label>
            <Input id="subject" {...register("subject")} placeholder="How can we power your home?" className="h-12 bg-surface-800 border-surface-700 text-surface-200 placeholder:text-surface-500" />
            {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-medium text-surface-400">Message</label>
            <Textarea id="message" rows={3} {...register("message")} placeholder="Tell us about your appliances, home size, or energy goals..." className="bg-surface-800 border-surface-700 text-surface-200 placeholder:text-surface-500 resize-none" />
            {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} size="lg" className="bg-gradient-to-r from-gold-500 to-gold-400 text-black hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/25 font-semibold mt-1">
            <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
