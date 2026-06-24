import Header from '@/pages/home/components/Header';
import Footer from '@/pages/home/components/Footer';
import { Link } from 'react-router-dom';
import teamContent from '@/content/team-members.json';
import siteSettings from '@/content/site-settings.json';

const teamMembers = teamContent.team_members.map((member) => ({
  name: member.name,
  role: member.position,
  initials: member.initials,
}));

const workImages = [
  '/uploads/assured-restoration/fire-restoration.jpeg',
  '/uploads/assured-restoration/water-extraction.jpg',
  '/uploads/assured-restoration/remodel-reconstruction.jpeg',
  '/uploads/assured-restoration/fire-restoration.jpeg',
];

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative w-full pt-[100px]" style={{ minHeight: '400px' }}>
        <div className="absolute inset-0">
          <img
            src="/uploads/assured-restoration/water-extraction.jpg"
            alt="Assured Restoration Team Houston TX"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D4F5F]/90 via-[#3D4F5F]/75 to-[#3D4F5F]/50"></div>
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-24 flex flex-col items-center text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 15px rgba(0,0,0,0.7)' }}
          >
            About Us
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a href={siteSettings.phone_href} className="flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap shadow-xl">
              <i className="ri-phone-fill"></i>
              Call for a Free Assessment
            </a>
            <Link to="/our-work" className="flex items-center justify-center gap-2 bg-white/15 border-2 border-white/50 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap">
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="w-full bg-white py-20">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
                <div className="w-8 h-px bg-[#6B7B8D]"></div>
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Assured Restoration is a Houston native, military veteran, Family-Owned and operated business. We have decades of combined experience in Restoration, Remodeling and Insurance Claim processing.
                </p>
                <p>
                  Our Techs are IICRC Certified and dedicated professionals. We are committed to taking care of our clients and treating them as we want to be treated.
                </p>
                <p className="italic text-[#3D4F5F] font-medium">
                  We understand that our people make the difference and our clients make it possible.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: 'ri-shield-check-fill', label: 'IICRC Certified', sub: 'Industry gold standard' },
                  { icon: 'ri-heart-fill', label: 'Veteran-Led', sub: 'Family-owned business' },
                  { icon: 'ri-building-2-fill', label: '1,000+ Projects', sub: 'Greater Houston area' },
                  { icon: 'ri-time-fill', label: '24/7 Available', sub: 'Emergency response' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 bg-[#f8f9fa] rounded-xl p-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#6B7B8D]/10 rounded-full flex-shrink-0">
                      <i className={`${item.icon} text-[#6B7B8D]`}></i>
                    </div>
                    <div>
                      <div className="font-bold text-[#3D4F5F] text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3">
              {workImages.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ height: '220px' }}>
                  <img src={src} alt={`Assured Restoration work sample ${i + 1}`} className="w-full h-full object-cover object-top" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full bg-[#f8f9fa] py-20">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              The People Behind the Work
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meet Our Team
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#3D4F5F] flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {member.initials}
                  </span>
                </div>
                <div className="text-[#6B7B8D] text-xs mb-1">{member.role}</div>
                <div className="text-[#3D4F5F] font-semibold text-sm">{member.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="w-full bg-white py-20">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              We&apos;re Hiring
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Join Our Team
            </h2>
            <p className="text-gray-500 text-base mb-8">
              Make a difference with Assured Restoration â€” apply today to help restore homes and rebuild lives with excellence!
            </p>
            <a
              href={siteSettings.indeed_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-lg px-10 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap mb-8"
            >
              <i className="ri-briefcase-fill"></i>
              Apply Here
            </a>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href={siteSettings.phone_href} className="flex items-center gap-2 text-gray-500 hover:text-[#6B7B8D] transition-colors cursor-pointer">
                <i className="ri-phone-fill text-[#6B7B8D]"></i>
                {siteSettings.phone}
              </a>
              <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-2 text-gray-500 hover:text-[#6B7B8D] transition-colors cursor-pointer">
                <i className="ri-mail-fill text-[#6B7B8D]"></i>
                {siteSettings.email}
              </a>
            </div>
            <div className="mt-6">
              <Link to="/careers" className="text-[#6B7B8D] hover:underline text-sm">View Careers Page â†’</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-[#3D4F5F] py-20">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-6">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              Our Mission
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Our Mission</h2>
            <p className="text-gray-300 text-base leading-relaxed mb-4">
              It starts with integrity. We hold ourselves and our services to the highest standards. Our goal is to treat our clients and associates as we would treat our own family. We will always strive to be the best at what we do, be it Emergency Services or Complete Home Remodeling.
            </p>
            <p className="text-[#6B7B8D] italic text-lg font-semibold">
              Our clients&apos; wellbeing is our top priority.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
