import { useState } from 'react';
import { Link } from 'react-router-dom';
import homepage from '@/content/homepage.json';
import servicesContent from '@/content/services.json';

const services = servicesContent.services.map((service) => ({
  ...service,
  items: service.bullet_points,
}));

export default function Services() {
  const [hovered, setHovered] = useState<string | null>(null);
  const content = homepage.services_preview;

  return (
    <section id="services" className="w-full bg-[#3D4F5F] py-20 md:py-28">
      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
            <div className="w-8 h-px bg-[#6B7B8D]"></div>
            {content.eyebrow}
            <div className="w-8 h-px bg-[#6B7B8D]"></div>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {content.heading}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              style={{ height: '480px' }}
              onMouseEnter={() => setHovered(svc.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background image */}
              <img
                src={svc.image}
                alt={svc.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="w-10 h-10 flex items-center justify-center bg-[#6B7B8D]/20 border border-[#6B7B8D]/40 rounded-full mb-3">
                  <i className={`${svc.icon} text-[#6B7B8D] text-lg`}></i>
                </div>
                <h3
                  className="text-white font-bold text-xl mb-1 leading-tight uppercase"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {svc.title.split(' ').map((word, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {word}
                    </span>
                  ))}
                </h3>
                <Link to="/our-services" className="text-[#6B7B8D] text-xs uppercase tracking-widest mb-3 hover:text-white transition-colors">
                  LEARN MORE &gt;
                </Link>
                <ul
                  className={`space-y-1.5 transition-all duration-500 ${
                    hovered === svc.id ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}
                >
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                      <i className="ri-check-line text-[#6B7B8D] text-xs flex-shrink-0"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={content.button_link}
            className="inline-flex items-center gap-2 bg-white text-[#3D4F5F] hover:bg-[#6B7B8D] hover:text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-phone-fill"></i>
            {content.button_text}
          </a>
        </div>
      </div>
    </section>
  );
}

