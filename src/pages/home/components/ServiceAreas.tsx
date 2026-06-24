import homepage from '@/content/homepage.json';
import siteSettings from '@/content/site-settings.json';
import serviceAreas from '@/content/service-areas.json';

const areas = serviceAreas.service_areas.map((area) => area.name);
const content = homepage.service_areas_preview;

export default function ServiceAreas() {
  return (
    <section id="areas" className="w-full bg-white py-20 md:py-28">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              {content.eyebrow}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#3D4F5F] leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {content.heading}
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              {content.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {areas.map((area) => (
                <span
                  key={area}
                  className="bg-[#f5f5f5] border border-[#E2E8F0] text-[#3D4F5F] text-sm px-4 py-2 rounded-full font-medium"
                >
                  <i className="ri-map-pin-2-fill text-[#6B7B8D] mr-1.5 text-xs"></i>
                  {area}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={siteSettings.phone_href}
                className="flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-phone-fill"></i>
                {content.call_button_text}
              </a>
              <a
                href={siteSettings.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#3D4F5F] text-[#3D4F5F] hover:bg-[#3D4F5F] hover:text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-navigation-line"></i>
                {content.directions_button_text}
              </a>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <i className="ri-map-pin-2-fill text-[#6B7B8D]"></i>
                {siteSettings.address}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <i className="ri-phone-fill text-[#6B7B8D]"></i>
                {siteSettings.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <i className="ri-mail-fill text-[#6B7B8D]"></i>
                {siteSettings.email}
              </div>
            </div>
          </div>

          {/* Right: Real Google Maps embed */}
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]" style={{ height: '480px' }}>
            <iframe
              title="Assured Restoration and Remodeling - Houston TX"
              src={siteSettings.google_maps_embed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
