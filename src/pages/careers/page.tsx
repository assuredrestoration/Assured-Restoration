import Header from '@/pages/home/components/Header';
import Footer from '@/pages/home/components/Footer';
import { Link } from 'react-router-dom';
import careersContent from '@/content/careers.json';
import siteSettings from '@/content/site-settings.json';

const openPositions = careersContent.open_positions;

const perks = careersContent.perks;

export default function CareersPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative w-full pt-[100px]" style={{ minHeight: '380px' }}>
        <div className="absolute inset-0">
          <img
            src={careersContent.hero.image}
            alt={`${careersContent.hero.heading} Houston TX`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D4F5F]/92 via-[#3D4F5F]/80 to-[#3D4F5F]/55"></div>
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-[#6B7B8D]/20 border border-[#6B7B8D]/40 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <i className="ri-briefcase-fill text-[#6B7B8D]"></i>
            {careersContent.hero.eyebrow}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 15px rgba(0,0,0,0.7)' }}
          >
            {careersContent.hero.heading}
          </h1>
          <p
            className="text-gray-200 text-lg max-w-2xl mb-8"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
          >
            {careersContent.hero.description}
          </p>
          <a
            href={siteSettings.indeed_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-lg px-10 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap shadow-2xl"
          >
            <i className="ri-briefcase-fill"></i>
            {careersContent.hero.button_text}
          </a>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="w-full bg-white py-20">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              Why Join Us
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Work at Assured Restoration?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="bg-[#f8f9fa] rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#6B7B8D]/10 rounded-full flex-shrink-0">
                  <i className={`${perk.icon} text-[#6B7B8D] text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#3D4F5F] text-base mb-1">{perk.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="w-full bg-[#f8f9fa] py-20">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              Now Hiring
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Open Positions
            </h2>
            <p className="text-gray-500 text-base mt-3">
              See more open positions and apply directly on{' '}
              <a
                href={siteSettings.indeed_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7B8D] font-semibold hover:underline"
              >
                Indeed
              </a>
            </p>
          </div>
          <div className="space-y-5">
            {openPositions.map((pos) => (
              <div key={pos.title} className="bg-white border border-gray-100 rounded-2xl p-7">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#3D4F5F]" style={{ fontFamily: "'Playfair Display', serif" }}>{pos.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <i className="ri-time-fill text-[#6B7B8D]"></i>
                        {pos.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <i className="ri-map-pin-2-fill text-[#6B7B8D]"></i>
                        {pos.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={siteSettings.indeed_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-briefcase-fill"></i>
                    Apply on Indeed
                  </a>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{pos.desc}</p>
                <div>
                  <div className="text-xs font-bold text-[#3D4F5F] uppercase tracking-widest mb-2">Requirements:</div>
                  <ul className="space-y-1">
                    {pos.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-gray-500 text-sm">
                        <i className="ri-check-line text-[#6B7B8D] mt-0.5 flex-shrink-0"></i>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="w-full bg-[#3D4F5F] py-20">
        <div className="w-full px-6 md:px-16 lg:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-300 text-base mb-8 max-w-xl mx-auto">
            We&apos;re always looking for talented, dedicated professionals to join our growing team. Apply now through Indeed or reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteSettings.indeed_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-lg px-10 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-briefcase-fill"></i>
              View All Jobs on Indeed
            </a>
            <a
              href={siteSettings.phone_href}
              className="flex items-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-fill"></i>
              Call {siteSettings.phone}
            </a>
          </div>
          <div className="mt-6">
            <Link to="/about-us" className="text-gray-400 hover:text-white text-sm transition-colors">
              â† Back to About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
