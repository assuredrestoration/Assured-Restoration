import { useState, FormEvent } from 'react';
import homepage from '@/content/homepage.json';
import siteSettings from '@/content/site-settings.json';

const CONTACT_ENDPOINT = '/api/contact';

type ContactResponse = {
  success: boolean;
  message?: string;
};

export default function FinalCTA() {
  const content = homepage.final_cta;
  const formContent = homepage.contact_form_content;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const textarea = form.querySelector('textarea');
    if (textarea && textarea.value.length > 500) return;

    setSubmitting(true);
    setErrorMessage('');

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null) as ContactResponse | null;
      if (!response.ok || !result?.success) {
        setErrorMessage(result?.message || 'We could not send your message. Please try again.');
        return;
      }

      form.reset();
      setCharCount(0);
      setSubmitted(true);
    } catch {
      setErrorMessage('We could not send your message. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#3D4F5F] py-20 md:py-28 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={content.background_image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D4F5F] via-[#3D4F5F]/95 to-[#2C3E50]"></div>

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-6">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              {content.eyebrow}
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {content.heading}{' '}
              <span className="text-[#6B7B8D]">{content.highlighted_text}</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {content.description}
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              <a
                href={siteSettings.phone_href}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#6B7B8D] rounded-full flex-shrink-0">
                  <i className="ri-phone-fill text-white text-lg"></i>
                </div>
                <div>
                  <div className="text-gray-400 text-xs uppercase tracking-widest">{content.call_label}</div>
                  <div className="text-white font-bold text-xl group-hover:text-[#6B7B8D] transition-colors">{siteSettings.phone}</div>
                </div>
              </a>
              <a
                href={`mailto:${siteSettings.email}`}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full flex-shrink-0">
                  <i className="ri-mail-fill text-[#6B7B8D] text-lg"></i>
                </div>
                <div>
                  <div className="text-gray-400 text-xs uppercase tracking-widest">{content.email_label}</div>
                  <div className="text-white text-sm group-hover:text-[#6B7B8D] transition-colors">{siteSettings.email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full flex-shrink-0">
                  <i className="ri-map-pin-2-fill text-[#6B7B8D] text-lg"></i>
                </div>
                <div>
                  <div className="text-gray-400 text-xs uppercase tracking-widest">{content.location_label}</div>
                  <div className="text-white text-sm">{siteSettings.address}</div>
                </div>
              </div>
            </div>

            <a
              href={siteSettings.phone_href}
              className="inline-flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-lg px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-fill text-xl"></i>
              {content.button_text}
            </a>
          </div>

          {/* Right: Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 flex items-center justify-center bg-[#6B7B8D]/20 rounded-full mx-auto mb-4">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D] text-3xl"></i>
                </div>
                <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {content.success_heading}
                </h3>
                <p className="text-gray-400 text-sm">
                  Thank you! Our team will contact you shortly. For immediate assistance, call{' '}
                  <a href={siteSettings.phone_href} className="text-[#6B7B8D] font-semibold">{siteSettings.phone}</a>.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="text-white font-bold text-xl mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {formContent.heading}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{formContent.description}</p>

                <form
                  id="free-assessment-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Smith"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(713) 000-0000"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="john@example.com"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">Service Needed</label>
                    <select
                      name="service"
                      className="w-full bg-white/10 border border-white/20 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D] transition-colors cursor-pointer"
                    >
                      <option value="" className="bg-[#3D4F5F]">Select a service...</option>
                      <option value="Water Damage Restoration" className="bg-[#3D4F5F]">Water Damage Restoration</option>
                      <option value="Fire & Smoke Restoration" className="bg-[#3D4F5F]">Fire &amp; Smoke Restoration</option>
                      <option value="Kitchen Remodeling" className="bg-[#3D4F5F]">Kitchen Remodeling</option>
                      <option value="Bathroom Remodeling" className="bg-[#3D4F5F]">Bathroom Remodeling</option>
                      <option value="Reconstruction & Repairs" className="bg-[#3D4F5F]">Reconstruction &amp; Repairs</option>
                      <option value="Other" className="bg-[#3D4F5F]">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1.5">
                      Message * <span className="text-gray-600 normal-case tracking-normal">({charCount}/500)</span>
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      maxLength={500}
                      placeholder="Briefly describe your situation..."
                      onChange={(e) => setCharCount(e.target.value.length)}
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#6B7B8D] transition-colors resize-none"
                    ></textarea>
                  </div>
                  {errorMessage && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                    >
                      {errorMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {submitting ? (
                      <><i className="ri-loader-4-line animate-spin"></i> {formContent.submitting_text}</>
                    ) : (
                      <><i className="ri-send-plane-fill"></i> {formContent.submit_text}</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

