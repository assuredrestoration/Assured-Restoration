import { useState } from 'react';
import Header from '@/pages/home/components/Header';
import Footer from '@/pages/home/components/Footer';
import { Link } from 'react-router-dom';
import servicesContent from '@/content/services.json';

const services = servicesContent.services.map((service) => ({
  ...service,
  title: service.detail_title ?? service.title,
  intro: service.full_description,
  steps: service.process_steps,
}));

function ServiceSection({ svc }: { svc: typeof services[0] }) {
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <div id={svc.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-16 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden" style={{ height: '460px' }}>
        <img
          src={svc.image}
          alt={svc.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="w-12 h-12 flex items-center justify-center bg-[#6B7B8D]/20 border border-[#6B7B8D]/50 rounded-full mb-3">
            <i className={`${svc.icon} text-[#6B7B8D] text-xl`}></i>
          </div>
          <h3 className="text-white font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>{svc.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div>
        <h4 className="text-[#6B7B8D] font-semibold text-sm uppercase tracking-widest mb-3">{svc.subtitle}</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{svc.intro}</p>

        <div className="space-y-2">
          {svc.steps.map((step, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setOpenStep(openStep === i ? null : i)}
              >
                <span className="font-semibold text-[#3D4F5F] text-sm">{step.title}</span>
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <i className={`${openStep === i ? 'ri-subtract-line' : 'ri-add-line'} text-[#6B7B8D] text-lg`}></i>
                </div>
              </button>
              {openStep === i && (
                <div className="px-5 pb-4">
                  <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{step.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative w-full pt-[100px]" style={{ minHeight: '360px' }}>
        <div className="absolute inset-0">
          <img
            src="/uploads/assured-restoration/water-extraction.jpg"
            alt="Assured Restoration Services Houston TX"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D4F5F]/90 via-[#3D4F5F]/75 to-[#3D4F5F]/50"></div>
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-[#6B7B8D]/20 border border-[#6B7B8D]/40 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <i className="ri-settings-3-fill text-[#6B7B8D]"></i>
            What We Do
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5 drop-shadow-xl"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 15px rgba(0,0,0,0.7)' }}
          >
            Our Services
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mb-8" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
            We have over 30 years of experience in Comprehensive Restoration, Renovation, and Mitigation Services Designed to Rebuild, Transform, and Protect Your Space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:7133937077" className="flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap shadow-xl">
              <i className="ri-phone-fill"></i>
              Call for a Free Assessment
            </a>
            <Link to="/our-work" className="flex items-center justify-center gap-2 bg-white/15 border-2 border-white/50 hover:bg-white/25 text-white font-semibold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-image-line"></i>
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="w-full bg-[#3D4F5F] py-5 sticky top-[100px] z-40">
        <div className="w-full px-6 md:px-16 lg:px-24 flex flex-wrap items-center justify-center gap-4">
          {services.map((svc) => (
            <a key={svc.id} href={`#${svc.id}`} className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors cursor-pointer whitespace-nowrap">
              <i className={`${svc.icon} text-[#6B7B8D]`}></i>
              {svc.title}
            </a>
          ))}
        </div>
      </section>

      {/* Services Detail */}
      <section className="w-full bg-white py-4 md:py-8">
        <div className="w-full px-6 md:px-16 lg:px-24">
          {services.map((svc) => (
            <ServiceSection key={svc.id} svc={svc} />
          ))}
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="w-full bg-[#3D4F5F] py-16">
        <div className="w-full px-6 md:px-16 lg:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            For Emergency Services,
          </h2>
          <p className="text-gray-300 text-xl mb-2">Please Call</p>
          <a href="tel:7133937077" className="text-[#6B7B8D] text-4xl font-bold hover:text-white transition-colors block mb-8">
            (713) 393-7077
          </a>
          <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D]" placeholder="FULL NAME" />
            <input className="bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D]" placeholder="PHONE NUMBER" />
            <input className="bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D]" placeholder="EMAIL" />
            <input className="bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D]" placeholder="SERVICES NEEDED" />
            <input className="sm:col-span-2 bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D]" placeholder="COMMENTS" />
            <div className="sm:col-span-2">
              <a href="tel:7133937077" className="w-full flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-base py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-phone-fill"></i>
                Call Now for Immediate Help
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Banner */}
      <section className="w-full bg-white py-16">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#3D4F5F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>We Offer Financing!</h2>
              <p className="text-gray-400 text-sm uppercase tracking-widest">0%-APR PROMOTIONAL FINANCING AVAILABLE</p>
            </div>
            <div className="bg-[#f8f9fa] rounded-2xl p-8">
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                <strong>Get Up To $200,000 In Funding For Your Next Home Project Through A Simple 60-Second Application With Instant Pre-Approval.</strong>
                <br /><br />
                At Assured Restoration, we know that unexpected home repairs can be both overwhelming and financially stressful. Whether it&apos;s damage from a storm, an urgent repair, or a renovation you didn&apos;t plan for, these situations can disrupt your peace of mind and your budget. That&apos;s why we&apos;re proud to partner with Enhancify to provide flexible financing options tailored to your needs.
              </p>
              <Link to="/financing" className="inline-flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap">
                Learn More About Financing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
