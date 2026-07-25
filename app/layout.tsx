import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Header } from "@/components/layout/header"

import { Footer } from "@/components/layout/footer"
import { CookieConsent } from "@/components/layout/cookie-consent"
import { ScrollUp } from "@/components/layout/scroll-up"
import { PageLoader } from "@/components/layout/page-loader"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SunteckSolar — Clean, Reliable & Accessible Solar Energy Solutions in Nigeria",
  description:
    "Nigeria's premier solar energy provider offering flexible payment plans, quality installations, and reliable solar solutions for homes and businesses across Nigeria.",
  keywords: ["solar energy", "Nigeria", "solar panels", "solar installation", "renewable energy"],
  manifest: "/manifest.json",
  metadataBase: new URL("https://suntecksolars.com"),
  alternates: { canonical: "/" },
  appleWebApp: {
    capable: true,
    title: "SunteckSolar",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "SunteckSolar — Clean, Reliable & Accessible Solar Energy Solutions in Nigeria",
    description:
      "Nigeria's premier solar energy provider offering flexible payment plans, quality installations, and reliable solar solutions for homes and businesses.",
    url: "https://suntecksolars.com",
    siteName: "SunteckSolar",
    locale: "en_NG",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SunteckSolar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SunteckSolar — Solar Energy Solutions Nigeria",
    description: "Flexible payment plans up to 18 months. Quality solar installations for Nigerian homes and businesses.",
    images: ["/opengraph-image"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "SunteckSolar",
                  url: "https://suntecksolars.com",
                  logo: "/icon.svg",
                  contactPoint: [
                    { "@type": "ContactPoint", telephone: "+234-703-195-3010", contactType: "sales" },
                    { "@type": "ContactPoint", telephone: "+234-816-806-7764", contactType: "customer service" },
                  ],
                  sameAs: ["https://instagram.com/suntecksolars"],
                },
                {
                  "@type": "LocalBusiness",
                  name: "SunteckSolar",
                  image: "/icon.svg",
                  telephone: "+234-703-195-3010",
                  email: "suntecksolars@gmail.com",
                  areaServed: "Nigeria",
                  foundingDate: "2023",
                  address: [
                    {
                      "@type": "PostalAddress",
                      addressLocality: "Benin City",
                      addressRegion: "Edo",
                      addressCountry: "NG",
                    },
                    {
                      "@type": "PostalAddress",
                      addressLocality: "Agbor",
                      addressRegion: "Delta",
                      addressCountry: "NG",
                    },
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    { "@type": "Question", name: "How does the solar financing work?", acceptedAnswer: { "@type": "Answer", text: "We offer flexible payment plans with just 20% deposit and up to 18 months to pay. This makes solar energy accessible without the burden of full upfront payment." } },
                    { "@type": "Question", name: "What appliances can I run on solar?", acceptedAnswer: { "@type": "Answer", text: "Our systems power everything from LED lights and fans to refrigerators, TVs, and air conditioners. We help you calculate your exact needs." } },
                    { "@type": "Question", name: "How long does installation take?", acceptedAnswer: { "@type": "Answer", text: "Installation typically takes 1-2 days depending on system size. We handle everything from site assessment to final commissioning." } },
                    { "@type": "Question", name: "Do you provide warranty on installations?", acceptedAnswer: { "@type": "Answer", text: "Yes. All our installations come with warranty coverage on both equipment and workmanship. Details are provided before installation." } },
                    { "@type": "Question", name: "Can I upgrade my system later?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Our systems are designed to be scalable. You can start with essential loads and expand as needed." } },
                    { "@type": "Question", name: "What areas do you serve?", acceptedAnswer: { "@type": "Answer", text: "We serve homes and businesses across Nigeria, with physical locations in Benin City (Edo State) and Agbor (Delta State)." } },
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "SunteckSolar",
                  url: "https://suntecksolars.com",
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('sunteck-theme');
                  var root = document.documentElement;
                  if (theme === 'light') {
                    root.classList.remove('dark');
                    root.classList.add('light');
                  } else if (theme === 'dark') {
                    root.classList.add('dark');
                    root.classList.remove('light');
                  } else {
                    root.classList.remove('dark');
                    root.classList.add('light');
                  }
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(rs) {
                      rs.forEach(function(r) { r.unregister(); });
                    });
                    navigator.serviceWorker.register('/sw.js');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <BottomNav />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ScrollUp />
        <PageLoader />
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  )
}
