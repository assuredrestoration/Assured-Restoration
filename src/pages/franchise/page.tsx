import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import franchiseContent from '@/content/franchise.json';
import siteSettings from '@/content/site-settings.json';

export default function FranchisePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    investment: '',
    experience: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animVisible, setAnimVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const website = String(new FormData(form).get('website') || '');
    const message = [
      `Location: ${formData.city}, ${formData.state}`,
      `Available capital: ${formData.investment}`,
      `Industry experience: ${formData.experience || 'Not provided'}`,
      '',
      formData.message || 'No additional message provided.',
    ].join('\n');

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          service: 'Franchise Inquiry',
          message,
          website,
        }),
      });
      const result = await response.json().catch(() => null) as { success?: boolean } | null;

      if (!response.ok || !result?.success) {
        setSubmitStatus('error');
        return;
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        investment: '',
        experience: '',
        message: '',
      });
      form.reset();
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = franchiseContent.stats;

  const advantages = franchiseContent.advantages;

  const revenueStreams = franchiseContent.revenue_streams;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center overflow-hidden pt-[100px]">
        <div className="absolute inset-0">
          <img
            src={franchiseContent.hero.image}
            alt="Professional restoration team at work"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D4F5F]/90 via-[#3D4F5F]/70 to-[#3D4F5F]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D4F5F]/60 via-transparent to-[#3D4F5F]/30"></div>
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
          <div className={`max-w-3xl transition-all duration-1000 ${animVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-[#6B7B8D]/30 border border-[#6B7B8D]/60 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <i className="ri-briefcase-fill text-[#6B7B8D]"></i>
              Franchise Opportunity
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
              Own a Scalable, High-Margin<br />
              <span className="text-[#6B7B8D]">Restoration Franchise</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
              A proven system engineered for long-term performance in an essential industry. Property damage occurs daily â€” tap into consistent demand backed by insurance partnerships.
            </p>
            <a href="#inquiry" className="inline-flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xl">
              <i className="ri-file-list-3-line text-lg"></i>
              Request Franchise Info
            </a>
          </div>
        </div>
      </section>

      {/* Opportunity + Form */}
      <section id="inquiry" className="w-full py-20 px-6 md:px-16 lg:px-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Opportunity */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Property damage occurs <span className="text-[#6B7B8D]">daily</span> in cities across the country.
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Assured Restoration offers a franchise business model with consistent demand, strong margins, and multiple paths to grow within a $200 billion recession-resistant industry. Franchise owners serve residential and commercial properties, pursue local relationships with insurance carriers, and build a scalable, high-value business in their community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: 'ri-bar-chart-grouped-line', title: 'Unlimited Growth Potential', desc: 'Multiple revenue streams and a large addressable market allow franchisees to build high-volume businesses.' },
                { icon: 'ri-money-cny-circle-line', title: 'High-Margin, Low Start-Up', desc: 'Top-performing franchise owners achieve strong gross revenue with lean overhead and scalable operations.' },
                { icon: 'ri-heart-3-line', title: 'Excellent Owner Satisfaction', desc: 'Franchise owners consistently rank high for satisfaction, enjoying the freedom and purpose of the business.' },
              ].map((item) => (
                <div key={item.title}>
                  <i className={`${item.icon} text-[#6B7B8D] text-2xl mb-3 block`}></i>
                  <h4 className="font-bold text-[#3D4F5F] text-sm mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <img
                src="/uploads/assured-restoration/restoration-equipment.webp"
                alt="Professional restoration equipment"
                className="w-full h-[240px] object-cover"
              />
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#3D4F5F] rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-white mb-2">Learn More About Franchise Ownership</h3>
            <p className="text-gray-300 text-sm mb-6">Learn more about how you can find business success serving your own community as an Assured Restoration franchise owner.</p>
            <form id="franchise-inquiry" onSubmit={handleSubmit} className="space-y-4">
              <div className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="franchise-website">Website</label>
                <input id="franchise-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-xs mb-1 block">First Name *</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D] placeholder:text-gray-400" placeholder="John" />
                </div>
                <div>
                  <label className="text-gray-300 text-xs mb-1 block">Last Name *</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D] placeholder:text-gray-400" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="text-gray-300 text-xs mb-1 block">Email Address *</label>
                <input type="email" name="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D] placeholder:text-gray-400" placeholder="john@email.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-xs mb-1 block">Phone *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D] placeholder:text-gray-400" placeholder="(713) 555-0123" />
                </div>
                <div>
                  <label className="text-gray-300 text-xs mb-1 block">City *</label>
                  <input type="text" name="city" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D] placeholder:text-gray-400" placeholder="Houston" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-xs mb-1 block">State *</label>
                  <select name="state" required value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D]">
                    <option value="" className="text-gray-900">Choose one...</option>
                    <option value="TX" className="text-gray-900">Texas</option>
                    <option value="AL" className="text-gray-900">Alabama</option>
                    <option value="AZ" className="text-gray-900">Arizona</option>
                    <option value="CA" className="text-gray-900">California</option>
                    <option value="FL" className="text-gray-900">Florida</option>
                    <option value="GA" className="text-gray-900">Georgia</option>
                    <option value="LA" className="text-gray-900">Louisiana</option>
                    <option value="MS" className="text-gray-900">Mississippi</option>
                    <option value="NC" className="text-gray-900">North Carolina</option>
                    <option value="OK" className="text-gray-900">Oklahoma</option>
                    <option value="SC" className="text-gray-900">South Carolina</option>
                    <option value="other" className="text-gray-900">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-xs mb-1 block">Available Capital *</label>
                  <select name="investment" required value={formData.investment} onChange={(e) => setFormData({ ...formData, investment: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D]">
                    <option value="" className="text-gray-900">Choose one...</option>
                    <option value="50k-100k" className="text-gray-900">$50,000 - $100,000</option>
                    <option value="100k-200k" className="text-gray-900">$100,000 - $200,000</option>
                    <option value="200k-500k" className="text-gray-900">$200,000 - $500,000</option>
                    <option value="500k+" className="text-gray-900">$500,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-300 text-xs mb-1 block">Do you have restoration/construction experience?</label>
                <select name="experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D]">
                  <option value="" className="text-gray-900">Choose one...</option>
                  <option value="yes-current" className="text-gray-900">Yes, currently in the industry</option>
                  <option value="yes-past" className="text-gray-900">Yes, previously in the industry</option>
                  <option value="no" className="text-gray-900">No, but I am a business owner</option>
                  <option value="no-new" className="text-gray-900">No, new to business ownership</option>
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-xs mb-1 block">Message (Optional)</label>
                <textarea name="message" maxLength={500} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#6B7B8D] placeholder:text-gray-400" rows={3} placeholder="Tell us about your background and goals..." />
              </div>
              <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="w-full bg-[#6B7B8D] hover:bg-[#5B6B7D] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-3 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap">
                {isSubmitting ? 'SENDING...' : 'GET STARTED'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-[#6B7B8D] text-sm text-center">Thank you! We will contact you within 24 hours.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again or call us directly.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-20 px-6 md:px-16 lg:px-24 bg-[#3D4F5F]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            A High-Margin Restoration Franchise<br className="hidden md:block" /> by the Numbers
          </h2>
          <Link to="/our-services" className="inline-flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap">
            VIEW OUR SERVICES
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6B7B8D] mb-2">{stat.value}</div>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Assured Advantage */}
      <section className="w-full py-20 px-6 md:px-16 lg:px-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="rounded-xl overflow-hidden">
            <img
              src="/uploads/assured-restoration/franchise-owner.webp"
              alt="Assured Restoration franchise owner"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Assured Advantage
            </h2>
            <p className="text-[#6B7B8D] font-semibold text-sm mb-6">Discover Why Assured Is a Premier Restoration Franchise Opportunity</p>
            <div className="space-y-4">
              {[
                'With a strong presence in the Greater Houston area, Assured offers local ownership with proven national expertise.',
                'Assured Restoration owners have achieved a strong success rate with the franchise model and documented operational systems.',
                'Franchise owners have expanded into multiple revenue streams, showing confidence in the system\'s ability to scale.',
                'Industry-leading training includes hands-on experience with water mitigation, fire restoration, and remodeling best practices.',
                'Assured is a preferred partner for major insurance carriers, providing a consistent pipeline of qualified leads.',
                'Backed by a veteran-owned leadership team, franchise owners receive mentorship from operators who have been in the field.',
                'Never have to say no to a job that is too big or too small â€” full-service capabilities from mitigation to rebuild.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-[#6B7B8D] text-lg"></i>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Opportunities With Images */}
      <section className="w-full py-20 px-6 md:px-16 lg:px-24 bg-[#F8F9FA]">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Revenue Opportunities With<br /><span className="text-[#6B7B8D]">Assured Restoration</span>
          </h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
            As a full-service restoration company, Assured Restoration has multiple revenue opportunities allowing franchise owners to offer services related to fire, smoke, water, mold, and biohazard damage â€” while growing their business with remodeling and reconstruction.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {revenueStreams.map((stream) => (
            <div key={stream.title} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#6B7B8D] transition-all duration-300 group">
              <div className="w-full h-[200px] overflow-hidden">
                <img
                  src={stream.img}
                  alt={stream.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 flex items-center justify-center bg-[#6B7B8D]/10 rounded-lg mb-3">
                  <i className={`${stream.icon} text-[#6B7B8D] text-lg`}></i>
                </div>
                <h4 className="font-bold text-[#3D4F5F] text-base mb-2">{stream.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{stream.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#inquiry" className="inline-flex items-center gap-2 bg-[#3D4F5F] hover:bg-[#2a3b4a] text-white font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap">
            GET STARTED
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </section>

      {/* Support & Training with Images */}
      <section className="w-full py-20 px-6 md:px-16 lg:px-24 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            World-Class Support & <span className="text-[#6B7B8D]">Training</span>
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">From day one, you are equipped with everything you need to launch, operate, and scale your franchise successfully.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="rounded-xl overflow-hidden">
            <img
              src="/uploads/assured-restoration/franchise-training.webp"
              alt="Franchise training program"
              className="w-full h-[300px] lg:h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv) => (
              <div key={adv.title} className="bg-[#F8F9FA] rounded-xl p-5">
                <div className="w-10 h-10 flex items-center justify-center bg-[#6B7B8D]/10 rounded-lg mb-3">
                  <i className={`${adv.icon} text-[#6B7B8D] text-lg`}></i>
                </div>
                <h4 className="font-bold text-[#3D4F5F] text-sm mb-1">{adv.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="w-full py-20 px-6 md:px-16 lg:px-24 bg-[#3D4F5F]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <i className="ri-double-quotes-l text-[#6B7B8D] text-4xl"></i>
          </div>
          <p className="text-white text-xl md:text-2xl leading-relaxed mb-8 italic">
            I am passionate about what we do because I enjoy helping people, I enjoy solving projects, and I know we have got work to do. The franchise model gave me the structure to grow without losing the personal touch.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#6B7B8D] flex items-center justify-center text-white font-bold text-lg">C</div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Cary Garrett</p>
              <p className="text-gray-300 text-xs">Founder & Franchise Owner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 px-6 md:px-16 lg:px-24 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D4F5F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to lead a business your community can count on?
          </h2>
          <p className="text-gray-600 text-base mb-8">
            Join a proven system in an essential industry. Fill out the form above or call our franchise development team directly to discuss available territories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#inquiry" className="inline-flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-lg">
              <i className="ri-file-list-3-line text-lg"></i>
              Request Franchise Info
            </a>
            <a href={siteSettings.phone_href} className="inline-flex items-center justify-center gap-2 bg-[#3D4F5F] hover:bg-[#2a3b4a] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap">
              <i className="ri-phone-fill text-lg"></i>
              Call {siteSettings.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
