import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageLoader } from "@/components/layout/page-loader"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "SunteckSolar — Solar Energy Nigeria | Buy Solar Panels & Installation",
    template: "%s | SunteckSolar Nigeria",
  },
  description:
    "Nigeria's trusted solar company. Buy solar panels, inverters, batteries & water pumps with pay-in-3 or pay-in-6 financing. Professional installation in Benin City, Agbor & nationwide. Save on generator fuel today.",
  keywords: [
    "solar panels Nigeria", "solar installation Benin City", "solar company Nigeria",
    "solar inverter price Nigeria", "buy solar panels Nigeria", "solar energy Agbor",
    "solar water pump Nigeria", "solar street lights Nigeria", "renewable energy Nigeria",
    "off-grid solar Nigeria", "solar financing Nigeria",
  ],
  manifest: "/manifest.json",
  metadataBase: new URL("https://suntecksolars.com"),
  alternates: { canonical: "/" },
  icons: {
    icon: "/assets/suntecksolar-logo.png",
    apple: "/assets/suntecksolar-logo.png",
  },
  other: {
    "geo.region": "NG",
    "geo.placename": "Nigeria",
  },
  openGraph: {
    title: "SunteckSolar — Solar Energy Nigeria | Buy Solar Panels & Installation",
    description:
      "Nigeria's trusted solar company. Buy solar panels, inverters & more with flexible financing. Professional installation in Benin City, Agbor & nationwide.",
    url: "https://suntecksolars.com",
    siteName: "SunteckSolar",
    locale: "en_NG",
    type: "website",
    countryName: "Nigeria",
    phoneNumbers: ["+2347031953010", "+2348168067764"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SunteckSolar — Solar Energy Nigeria",
    description: "Buy solar panels, inverters & batteries with pay-in-3 or pay-in-6. Professional installation nationwide.",
    creator: "@suntecksolars",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "energy",
  classification: "Solar Energy Company Nigeria",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "SunteckSolar",
        url: "https://suntecksolars.com",
        logo: "/icon.svg",
        description: "Nigeria trusted solar energy company. Professional solar panel installation, inverters, batteries, and water pumps in Benin City, Agbor and nationwide.",
        contactPoint: [
          { "@type": "ContactPoint", telephone: "+234-703-195-3010", contactType: "sales", availableLanguage: "en" },
          { "@type": "ContactPoint", telephone: "+234-816-806-7764", contactType: "customer service", availableLanguage: "en" },
        ],
        sameAs: ["https://instagram.com/suntecksolars"],
      },
      {
        "@type": "LocalBusiness",
        name: "SunteckSolar",
        image: "/icon.svg",
        telephone: "+234-703-195-3010",
        email: "helpdesk@suntecksolars.com",
        priceRange: "N500,000 - N5,000,000",
        areaServed: "Nigeria",
        foundingDate: "2023",
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
        ],
        address: [
          { "@type": "PostalAddress", addressLocality: "Benin City", addressRegion: "Edo", streetAddress: "23, Iduowina Road, Off Benin Auchi Road", addressCountry: "NG" },
          { "@type": "PostalAddress", addressLocality: "Agbor", addressRegion: "Delta", streetAddress: "23 Old Lagos Asaba Road", addressCountry: "NG" },
        ],
      },
      {
        "@type": "Service",
        name: "Solar Panel Installation Nigeria",
        provider: { "@type": "Organization", name: "SunteckSolar" },
        areaServed: "Nigeria",
        description: "Professional solar energy installations including solar panels, hybrid inverters, battery storage, solar water pumps, and solar street lights for Nigerian homes and businesses.",
        offers: {
          "@type": "Offer",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "NGN", description: "Pay-in-3 or Pay-in-6 financing available" },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How does solar financing work - Nigeria?", acceptedAnswer: { "@type": "Answer", text: "We offer flexible payment plans with just 20% deposit and up to 18 months to pay. This makes solar energy accessible without the burden of full upfront payment for Nigerian homes and businesses." } },
          { "@type": "Question", name: "What appliances can I run on solar power?", acceptedAnswer: { "@type": "Answer", text: "Our systems power everything from LED lights, ceiling fans, and TVs to refrigerators, freezers, water pumps, and air conditioners. Use our online calculator to estimate your exact power needs." } },
          { "@type": "Question", name: "How long does solar installation take - Nigeria?", acceptedAnswer: { "@type": "Answer", text: "Installation typically takes 1-2 days depending on system size. We handle everything from site assessment to final commissioning, serving Benin City, Agbor, and nationwide." } },
          { "@type": "Question", name: "Do solar panels work during Harmattan?", acceptedAnswer: { "@type": "Answer", text: "Yes. While Harmattan dust can reduce efficiency slightly, modern solar panels perform well in hazy conditions. Regular cleaning during Harmattan season helps maintain optimal output." } },
          { "@type": "Question", name: "What happens to solar at night or on cloudy days?", acceptedAnswer: { "@type": "Answer", text: "Solar systems paired with battery storage provide 24/7 power coverage. During cloudy days, panels still generate electricity at reduced capacity, and batteries store excess power for nighttime use." } },
          { "@type": "Question", name: "How long does a solar system last?", acceptedAnswer: { "@type": "Answer", text: "Solar panels typically last 25+ years with minimal degradation. Inverters last 5-10 years, and batteries 5-15 years depending on type. All our installations include comprehensive warranties." } },
          { "@type": "Question", name: "Can I upgrade my solar system later?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Our systems are designed to be modular and scalable. You can start with essential loads like lights and fans, then expand to add TVs, fridges, and air conditioners as needed." } },
          { "@type": "Question", name: "What areas do you serve - Nigeria?", acceptedAnswer: { "@type": "Answer", text: "We serve homes and businesses across Nigeria with physical locations in Benin City (Edo State) and Agbor (Delta State). Our team installs nationwide." } },
          { "@type": "Question", name: "How much does solar system installation cost?", acceptedAnswer: { "@type": "Answer", text: "Costs vary based on your energy needs. A basic setup starts from around N500,000, while full home systems range from N2,000,000 to N5,000,000. Use our financing calculator for a personalized estimate." } },
        ],
      },
      {
        "@type": "WebSite",
        name: "SunteckSolar",
        url: "https://suntecksolars.com",
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){try{var t=localStorage.getItem('sunteck-theme');if(t==='dark'||t==='light')document.documentElement.classList.add(t);else document.documentElement.classList.add('light')}catch(e){}})()"
          }}
        />
        <script
          type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <PageLoader />
        <Header />
        <BottomNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
