import homepage from '@/content/homepage.json';

const section = homepage.why_choose_us;
const reasons = section.reasons;

export default function WhyChooseUs() {
  return (
    <section id="why" className="w-full bg-white py-20 md:py-28">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden" style={{ height: '560px' }}>
              <img
                src={section.image}
                alt={section.image_alt}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-[#3D4F5F] text-white rounded-xl p-5 shadow-xl">
              <div className="text-4xl font-bold text-[#6B7B8D]" style={{ fontFamily: "'Playfair Display', serif" }}>{section.stat_value}</div>
              <div className="text-sm text-gray-300 mt-1">{section.stat_label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{section.stat_subtitle}</div>
            </div>
            {/* Gold accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#6B7B8D]/30 rounded-xl -z-10"></div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              {section.eyebrow}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#3D4F5F] leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {section.heading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((r) => (
                <div key={r.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#6B7B8D]/10 rounded-full flex-shrink-0 mt-0.5">
                    <i className={`${r.icon} text-[#6B7B8D] text-sm`}></i>
                  </div>
                  <div>
                    <div className="font-semibold text-[#3D4F5F] text-sm mb-1">{r.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

