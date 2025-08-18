import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Star,
  Zap,
  Shield,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp,
  MessageCircle
} from 'lucide-react';

// Import hero images
import hero1 from '@/assets/hero1.jpg';
import hero2 from '@/assets/hero2.jpg';
import productPump from '@/assets/product-pump.jpg';
import productFreezer from '@/assets/product-freezer.jpg';
import productStreetlight from '@/assets/product-streetlight.jpg';
import productInverter from '@/assets/product-inverter.jpg';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Hero carousel slides
  const heroSlides = [
    {
      image: hero1,
      title: "Clean, Reliable, and Accessible Solar for Nigeria",
      subtitle: "Nigeria's premier provider of clean, reliable, and renewable solar energy. We're dedicated to making sustainable power accessible to everyone with innovative financing options."
    },
    {
      image: hero2,
      title: "Flexible Payment Plans Up to 18 Months",
      subtitle: "Empowering homes and businesses across Nigeria with dependable solar solutions, ensuring a brighter, more sustainable future for all."
    }
  ];

  // Auto-advance carousel (with reduced motion support)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [heroSlides.length]);

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setMobileMenuOpen(false);
    }
  };

  // Navigation items
  const navItems = [
    { label: 'Home', href: 'home' },
    { label: 'About', href: 'about' },
    { label: 'Products', href: 'products' },
    { label: 'FAQs', href: 'faqs' },
    { label: 'Testimonials', href: 'testimonials' },
    { label: 'Contact', href: 'contact' }
  ];

  // Products data
  const products = [
    {
      title: "Solar Water Pump (DC/AC)",
      description: "Reliable pumping for agriculture and boreholes with low running costs.",
      image: productPump
    },
    {
      title: "Solar Freezer (DC/AC)",
      description: "Efficient off-grid cooling for Nigerian conditions.",
      image: productFreezer
    },
    {
      title: "Solar Street Light (All-in-One)",
      description: "Durable, energy-efficient outdoor lighting for streets, estates, and public spaces.",
      image: productStreetlight
    },
    {
      title: "Hybrid Solar Inverter",
      description: "Intelligent energy management for seamless switching between solar, battery, and grid power.",
      image: productInverter
    }
  ];

  // Testimonials data
  const testimonials = {
    costSavings: [
      {
        quote: "I have been able to save thousands daily after solar installation by Suntecksolars.",
        author: "Chief Vincent",
        location: "Royal Best Hotel, Dawson"
      },
      {
        quote: "For more than 2 years, I have been enjoying uninterrupted power with Suntecksolars for both my house and business place without having to worry about electricity bills.",
        author: "Eguasa",
        location: "GRA"
      }
    ],
    reliability: [
      {
        quote: "8 months later, power has never gone off.",
        author: "Mrs. Linus",
        location: "Agbor"
      },
      {
        quote: "I'm grateful to Suntecksolars... It's been 18 months and my house is not connected to the grid—just solar by Suntecksolars alone.",
        author: "Mr. Sato",
        location: "Auchi Bypass"
      },
      {
        quote: "You did an excellent job, Suntecksolars.",
        author: "Mr. Nonsa",
        location: "Forestry"
      }
    ],
    trust: [
      {
        quote: "Immediately Suntecksolars drove into my compound with the solar material, I was satisfied before the installation even began.",
        author: "Jerry",
        location: "Sapele Road"
      },
      {
        quote: "I never believed solars work this good before I met Suntecksolars.",
        author: "Mr. Saga",
        location: "Agbor"
      },
      {
        quote: "Suntecksolars na the Baba for solar.",
        author: "Mrs. Stella",
        location: "Ugbor"
      }
    ]
  };

  // FAQ data
  const faqs = [
    {
      question: "What is the primary challenge for many Nigerians looking to switch to solar energy?",
      answer: "The high upfront cost of a complete solar system is a significant barrier for many households and businesses. The price of quality solar panels, batteries, and inverters can be prohibitive, despite the long-term savings.",
      solution: "Suntecksolars addresses this with flexible payment plans of up to 18 months. This innovative financing option breaks down the cost into manageable monthly installments, making solar power accessible to a wider range of customers and allowing them to start saving on electricity bills immediately."
    },
    {
      question: "What is a common risk associated with the proliferation of solar products in Nigeria's market?",
      answer: "The Nigerian market is flooded with low-quality and counterfeit solar components, which lead to poor performance, frequent system failures, and short product lifespans. This erodes consumer trust in solar technology.",
      solution: "Suntecksolars guarantees assured material quality. The company sources its components from reputable, certified manufacturers and adheres to rigorous quality standards, ensuring every part of the system—from panels to batteries—is durable and reliable."
    },
    {
      question: "How can improper system design impact a solar power system?",
      answer: "An inadequately designed solar system, with incorrect panel orientation or undersized components, can fail to meet a customer's energy needs. This results in frequent power outages and an inefficient system.",
      solution: "Suntecksolars provides a professional energy audit to accurately assess a customer's power requirements before installation. This ensures the system is custom-designed and correctly sized to power their specific appliances, guaranteeing a reliable and consistent energy supply."
    },
    {
      question: "What issues can arise from hiring an inexperienced installer?",
      answer: "Poor installation by uncertified technicians can lead to safety hazards, such as faulty wiring and electrical fires, and can cause the system to function inefficiently or fail prematurely.",
      solution: "Suntecksolars uses a team of certified and highly-trained professionals for all installations. Their expertise ensures that every system is installed safely and correctly, maximizing performance and adhering to all regulatory standards."
    },
    {
      question: "How does Nigeria's climate, particularly dust from the Harmattan season, affect solar panels?",
      answer: "Accumulation of dust and dirt on solar panels, especially during the Harmattan season, significantly reduces their efficiency by blocking sunlight and hindering energy generation.",
      solution: "Suntecksolars educates customers on the importance of regular maintenance and cleaning. They offer comprehensive after-sales support and maintenance packages that include scheduled cleanings and inspections to keep the panels operating at peak efficiency."
    },
    {
      question: "How do solar systems address the need for power when there's no sunlight, such as at night or on cloudy days?",
      answer: "A solar system's ability to provide continuous power depends on its energy storage solution, typically a battery. Without a high-quality battery, a system can't store excess energy, making it unreliable during off-peak hours.",
      solution: "Suntecksolars integrates advanced battery storage solutions into its systems. These high-capacity batteries store surplus energy generated during the day, ensuring a consistent and uninterrupted power supply 24/7."
    },
    {
      question: "What is the function of a solar inverter, and what issues can arise from a low-quality one?",
      answer: "The inverter converts the direct current (DC) from solar panels into the alternating current (AC) used by household appliances. A poor-quality inverter can be inefficient, leading to power loss and potential system failure.",
      solution: "Suntecksolars uses high-efficiency inverters from leading manufacturers. These smart inverters are designed to maximize energy conversion, reduce power loss, and provide real-time monitoring of system performance."
    },
    {
      question: "What is the lifespan of a typical solar system, and what factors can shorten it?",
      answer: "While solar panels can last for decades, other components like batteries and inverters have shorter lifespans. A lack of proper maintenance can accelerate the degradation of the entire system.",
      solution: "Suntecksolars offers a long-term performance warranty and regular maintenance services. This ensures that the system is proactively checked for issues, and components are replaced as needed, maximizing the system's longevity and return on investment."
    },
    {
      question: "Why do some customers remain skeptical about the benefits of solar energy?",
      answer: "Many potential customers lack a clear understanding of how solar systems work, the long-term cost savings, and the environmental benefits. This knowledge gap can lead to skepticism and a reluctance to invest.",
      solution: "Suntecksolars is committed to educating Nigerians on the benefits of switching to solar energy. The company empowers customers with knowledge about its clean and renewable solutions and the financial advantages of its flexible payment plans. To reach a wider audience and provide a platform for direct engagement, Suntecksolars has launched \"Solar Yan with the Celebritysolarman,\" Nigeria's first solar radio program. Hosted by the CEO, the show airs every Friday from 3:30 PM to 4:00 PM on Speed FM 96.9, where listeners can learn more and ask questions live. You can stream the program at https://www.speedfm969.com."
    },
    {
      question: "How can a homeowner or business ensure they are using their solar-generated electricity most effectively?",
      answer: "Without a way to monitor and manage energy usage, customers might not be taking full advantage of their solar system. They may be using stored energy inefficiently or not maximizing the use of solar power during the day.",
      solution: "Suntecksolars provides advanced monitoring systems that allow customers to track their energy production and consumption in real-time. This helps them optimize their energy use, manage their savings, and fully benefit from their investment."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Skip to content
      </a>

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/fc41a91f-0a6f-48d3-b578-6936cebda041.png" 
                alt="SunteckSolar Logo" 
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  aria-label={`Go to ${item.label} section`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border" role="dialog" aria-label="Mobile menu">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Go to ${item.label} section`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="pt-16">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
          {/* Hero Background Slider */}
          <div className="absolute inset-0 w-full h-full">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={`Solar energy solution ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
              </div>
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                {heroSlides[currentSlide].title}
              </h1>
              
              <p className="text-xl sm:text-2xl text-white mb-8 leading-relaxed animate-slide-in">
                {heroSlides[currentSlide].subtitle}
              </p>

              {/* Payment Plan Highlight Card */}
              <Card className="mb-8 bg-card/95 backdrop-blur-sm border-secondary shadow-lg animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-secondary" />
                    <span className="font-semibold text-card-foreground">Flexible Payment Plans</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>✓ 20% down payment</span>
                    <span>✓ 3–18 months financing</span>
                    <span>✓ Any project size</span>
                  </div>
                </CardContent>
              </Card>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
                >
                  Get a Free Quote
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary"
                >
                  <a href="https://instagram.com/suntecksolars" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <Instagram size={20} />
                    <span>Follow on Instagram</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-secondary' 
                    : 'bg-primary-foreground/50 hover:bg-primary-foreground/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                Clean, Reliable, and Accessible Solar for Nigeria
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Suntecksolars is Nigeria's premier provider of clean, reliable, and renewable solar energy. 
                We're dedicated to making sustainable power accessible to everyone with innovative financing 
                options, including flexible payment plans of up to 18 months.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Clean */}
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-primary">Clean Energy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Clean energy refers to solar power's minimal environmental impact. Unlike traditional 
                    fossil fuels, solar energy production generates electricity without any air or water 
                    pollution, directly contributing to reducing carbon footprint and combating climate change.
                  </p>
                </CardContent>
              </Card>

              {/* Reliable */}
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-primary">Reliable Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Modern solar systems are highly reliable through advancements in technology, including 
                    energy storage solutions like batteries. These store excess energy generated during the 
                    day, ensuring consistent power supply regardless of weather or time.
                  </p>
                </CardContent>
              </Card>

              {/* Renewable */}
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-primary">Renewable Future</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The sun is an abundant and virtually inexhaustible energy source. Suntecksolars harnesses 
                    this natural resource to provide sustainable power, creating an energy system that can 
                    support generations to come.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">Why Choose Suntecksolars?</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-card-foreground mb-4">Assured Material Quality</h4>
                  <p className="text-muted-foreground mb-4">
                    Suntecksolars ensures the highest quality through meticulous selection of every component, 
                    from solar panels and inverters to batteries and wiring, meeting stringent international standards.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-card-foreground">Solar Panels</h5>
                      <p className="text-sm text-muted-foreground">
                        High-grade silicon cells with robust aluminum frames and tempered glass for durability.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-card-foreground">Inverters & Batteries</h5>
                      <p className="text-sm text-muted-foreground">
                        High-efficiency inverters and long-lasting lithium-ion batteries for reliable performance.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-card-foreground mb-4">Commitment to Standards</h4>
                  <p className="text-muted-foreground">
                    Our dedication extends beyond components to meeting and exceeding industry standards, 
                    including those set by the Standards Organisation of Nigeria (SON). We ensure all 
                    solutions are safe, efficient, and compliant with local regulations.
                  </p>
                  
                  <div className="mt-6 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                      SON Certified
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                      International Standards
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">Our Solar Solutions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive solar products designed for Nigerian conditions, 
                ensuring reliable and efficient performance across all applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary group-hover:text-primary/80 transition-colors">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      onClick={() => scrollToSection('contact')}
                      className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">What Our Customers Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real experiences from satisfied customers across Nigeria who have transformed 
                their energy needs with Suntecksolars.
              </p>
            </div>

            <div className="space-y-12">
              {/* Cost Savings */}
              <div>
                <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Cost Savings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {testimonials.costSavings.map((testimonial, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                          ))}
                        </div>
                        <blockquote className="text-card-foreground mb-4 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="text-sm text-muted-foreground">
                          <div className="font-medium">{testimonial.author}</div>
                          <div>{testimonial.location}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reliability & Performance */}
              <div>
                <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Reliability & Performance</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.reliability.map((testimonial, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                          ))}
                        </div>
                        <blockquote className="text-card-foreground mb-4 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="text-sm text-muted-foreground">
                          <div className="font-medium">{testimonial.author}</div>
                          <div>{testimonial.location}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Trust & Satisfaction */}
              <div>
                <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Trust & Satisfaction</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.trust.map((testimonial, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                          ))}
                        </div>
                        <blockquote className="text-card-foreground mb-4 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="text-sm text-muted-foreground">
                          <div className="font-medium">{testimonial.author}</div>
                          <div>{testimonial.location}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Radio Program Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calendar className="h-6 w-6" />
              <span className="text-sm uppercase tracking-wider">Weekly Radio Show</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Solar Yan with the Celebritysolarman
            </h2>
            
            <p className="text-xl text-primary-foreground/90 mb-6 max-w-3xl mx-auto">
              Nigeria's first solar radio program! Join our CEO every Friday from 3:30 PM to 4:00 PM 
              on Speed FM 96.9 to learn about solar energy benefits and ask questions live.
            </p>
            
            <Button 
              variant="secondary" 
              size="lg"
              asChild
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <a href="https://www.speedfm969.com" target="_blank" rel="noopener noreferrer">
                Stream Live on Speed FM
              </a>
            </Button>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Get answers to common questions about solar energy challenges and Suntecksolars' solutions.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left p-6 hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-expanded={expandedFaq === index}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-card-foreground pr-4">
                        {faq.question}
                      </h3>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <Separator className="mb-4" />
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-card-foreground mb-2">Challenge:</h4>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-2">Suntecksolars' Solution:</h4>
                          <p className="text-muted-foreground">{faq.solution}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">Get in Touch</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to switch to clean, reliable solar energy? Contact us today for a free consultation 
                and personalized solar solution for your home or business.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-card-foreground">Phone</div>
                        <div className="text-muted-foreground">
                          <a href="tel:+2347031953010" className="hover:text-primary transition-colors">
                            07031953010
                          </a>
                          {" | "}
                          <a href="tel:+2348168067764" className="hover:text-primary transition-colors">
                            08168067764
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-card-foreground">Email</div>
                        <div className="text-muted-foreground">
                          <a href="mailto:helpdesk@suntecksolars.com" className="hover:text-primary transition-colors">
                            helpdesk@suntecksolars.com
                          </a>
                          <br />
                          <a href="mailto:sunteckglobalimpactltd@gmail.com" className="hover:text-primary transition-colors">
                            sunteckglobalimpactltd@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Instagram className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-card-foreground">Instagram</div>
                        <div className="text-muted-foreground">
                          <a 
                            href="https://instagram.com/suntecksolars" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            @suntecksolars
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-card-foreground mb-2">Office Locations</div>
                        <div className="text-muted-foreground space-y-2">
                          <div>
                            <div className="font-medium">Edo State:</div>
                            <div>23, Iduowina Road, Off Benin Auchi Road, Benin City, Edo State</div>
                          </div>
                          <div>
                            <div className="font-medium">Delta State:</div>
                            <div>23 Old Lagos Asaba Road, Agbor, Delta State</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Chairman</h3>
                  <p className="text-muted-foreground">Ikehi David Onyesi</p>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-6">Send us a Message</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-card-foreground mb-2">
                        First Name
                      </label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-card-foreground mb-2">
                        Last Name
                      </label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                      Phone Number
                    </label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-2">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      name="subject"
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="Tell us about your solar energy needs..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-50">
              <Button
                size="lg"
                className="rounded-full w-14 h-14 bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a 
                  href="https://wa.me/2347031953010" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                >
                  <MessageCircle size={24} />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <img 
                src="/lovable-uploads/fc41a91f-0a6f-48d3-b578-6936cebda041.png" 
                alt="SunteckSolar Logo" 
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-primary-foreground/80 mb-4">
                Nigeria's premier provider of clean, reliable, and renewable solar energy solutions.
              </p>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://instagram.com/suntecksolars" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <div>
                  <a href="tel:+2347031953010" className="hover:text-primary-foreground transition-colors">
                    07031953010
                  </a>
                </div>
                <div>
                  <a href="mailto:helpdesk@suntecksolars.com" className="hover:text-primary-foreground transition-colors">
                    helpdesk@suntecksolars.com
                  </a>
                </div>
                <div>Benin City & Agbor</div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-primary-foreground/20" />

          <div className="text-center text-primary-foreground/80">
            <p>© 2024 SunteckSolar. All rights reserved. | Empowering Nigeria with Clean Energy</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;