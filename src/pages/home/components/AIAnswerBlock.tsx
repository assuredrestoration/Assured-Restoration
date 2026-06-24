import { Link } from 'react-router-dom';
import homepage from '@/content/homepage.json';

export default function AIAnswerBlock() {
  const content = homepage.why_assured;
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative rounded-2xl overflow-hidden" style={{ height: '480px' }}>
            <img
              src={content.image}
              alt={content.image_alt}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              {content.eyebrow}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#3D4F5F] leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {content.heading}
            </h2>

            <div className="space-y-4 mb-8">
              {content.features.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#6B7B8D]/10 rounded-full flex-shrink-0">
                    <i className={`${item.icon} text-[#6B7B8D] text-sm`}></i>
                  </div>
                  <span className="text-gray-600 text-base">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              to={content.button_link}
              className="inline-flex items-center gap-2 bg-[#3D4F5F] hover:bg-[#2C3E50] text-white font-semibold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              {content.button_text}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
