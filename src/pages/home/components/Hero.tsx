import { useEffect, useState } from 'react';
import homepage from '@/content/homepage.json';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const { hero, trust_badges: trustBadges } = homepage;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt={hero.alt}
          className="w-full h-full object-cover object-top"
        />
        {/* Strong dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-28">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* H1 */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            {hero.headline_lines.map((line) => (
              <span key={line}>{line}<br/></span>
            ))}
            <span className="text-[#6B7B8D]">{hero.highlighted_text}</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-white text-xl md:text-2xl font-semibold mb-3"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
          >
            {hero.tagline}
          </p>

          {/* Subheadline */}
          <p
            className="text-gray-200 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
          >`r`n            {hero.subheadline}`r`n          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/30 text-white text-xs px-3 py-2 rounded-full whitespace-nowrap"
              >
                <i className={`${badge.icon} text-[#6B7B8D]`}></i>
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={hero.primary_button_link}
              className="flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xl"
            >
              <i className="ri-phone-fill text-lg"></i>
              {hero.primary_button_text}
            </a>
            <a
              href={hero.secondary_button_link}
              className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border-2 border-white/60 hover:border-white hover:bg-white/25 text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-file-list-3-line text-lg"></i>
              {hero.secondary_button_text}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <i className="ri-arrow-down-line text-xl"></i>
      </div>
    </section>
  );
}

