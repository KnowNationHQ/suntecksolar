import { Hero } from "@/components/marketing/hero";
import { About } from "@/components/marketing/about";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { SolarCalc } from "@/components/calculators/solar-calc";
import { ProductTabs } from "@/components/products/product-tabs";
import { SpecTable } from "@/components/products/spec-table";
import { Testimonials } from "@/components/marketing/testimonials";
import { RadioPromo } from "@/components/marketing/radio-promo";
import { FAQs } from "@/components/marketing/faqs";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { AnimateSection } from "@/hooks/use-in-view";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <SolarCalc />
      <ProductTabs />
      <SpecTable />
      <Testimonials />
      <RadioPromo />
      <FAQs />
      <AnimateSection id="contact" className="section-wrap">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <p className="section-sub">Get in Touch</p>
            <h2 className="section-title">Contact Us</h2>
            <p className="text-sm text-surface-500 mt-2">Ready to switch to solar? Get a free consultation today.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </AnimateSection>
      <WhatsAppButton />
    </>
  );
}
