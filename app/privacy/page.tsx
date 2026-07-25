export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-2xl mx-auto section-wrap">
      <p className="section-sub">Privacy</p>
      <h1 className="section-title mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-sm text-surface-400 leading-relaxed">
        <section>
          <h2 className="text-surface-200 text-base font-semibold mb-2">Information We Collect</h2>
          <p>
            We collect only the information you voluntarily provide through our contact form:
            your name, email address, phone number, and message. We do not use cookies for
            tracking or analytics.
          </p>
        </section>

        <section>
          <h2 className="text-surface-200 text-base font-semibold mb-2">How We Use Your Information</h2>
          <p>
            The information you provide is used solely to respond to your inquiries and provide
            you with information about our solar energy products and services. We do not sell,
            rent, or share your personal information with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-surface-200 text-base font-semibold mb-2">Data Storage & Retention</h2>
          <p>
            Your contact form submissions are stored securely and retained only as long as
            necessary to address your inquiry. You may request deletion of your data at any
            time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-surface-200 text-base font-semibold mb-2">Third-Party Services</h2>
          <p>
            We do not use third-party analytics, tracking, or advertising services. The only
            external service we use is Fontshare for web font delivery.
          </p>
        </section>

        <section>
          <h2 className="text-surface-200 text-base font-semibold mb-2">Your Rights</h2>
          <p>
            Under the Nigeria Data Protection Regulation (NDPR), you have the right to:
            access your data, request correction, request deletion, and withdraw consent.
            To exercise any of these rights, contact us.
          </p>
        </section>

        <section>
          <h2 className="text-surface-200 text-base font-semibold mb-2">Contact</h2>
          <p>
            For data-related requests, reach us at{" "}
            <a href="mailto:suntecksolars@gmail.com" className="text-gold-500 underline">
              suntecksolars@gmail.com
            </a>{" "}
            or call{" "}
            <a href="tel:+2347031953010" className="text-gold-500 underline">+234 703 195 3010</a>.
          </p>
        </section>

        <p className="text-xs text-surface-600 pt-4 border-t border-surface-800">
          Last updated: July 2026
        </p>
      </div>
    </div>
  )
}
