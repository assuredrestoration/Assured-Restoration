import { Link } from 'react-router-dom';
import siteSettings from '@/content/site-settings.json';

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5 rounded-none">
              <img
                src={siteSettings.logo}
                alt={siteSettings.company_name}
                className="h-28 w-auto object-contain rounded-none"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {siteSettings.footer_description}
            </p>
            <div className="flex items-center gap-3">
              {siteSettings.social_links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-[#6B7B8D] rounded-full transition-colors cursor-pointer"
                >
                  <i className={`${link.icon} text-gray-600 hover:text-white text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-5">Sitemap</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer">Home</Link></li>
              <li><Link to="/our-services" className="text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer">Our Services</Link></li>
              <li><Link to="/our-work" className="text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer">Our Work</Link></li>
              <li><Link to="/about-us" className="text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer pl-3">↳ Careers</Link></li>
              <li><Link to="/franchise" className="text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer">Franchise</Link></li>
              <li><Link to="/financing" className="text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer">Financing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <div className="space-y-3">
              <a href={siteSettings.phone_href} className="flex items-start gap-3 text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer">
                <div className="w-7 h-7 flex items-center justify-center">
                  <i className="ri-phone-fill text-[#6B7B8D] text-base"></i>
                </div>
                {siteSettings.phone}
              </a>
              <a href={`mailto:${siteSettings.email}`} className="flex items-start gap-3 text-gray-600 hover:text-[#6B7B8D] text-sm transition-colors cursor-pointer">
                <div className="w-7 h-7 flex items-center justify-center">
                  <i className="ri-mail-fill text-[#6B7B8D] text-base"></i>
                </div>
                {siteSettings.email}
              </a>
              <div className="flex items-start gap-3 text-gray-600 text-sm">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <i className="ri-map-pin-2-fill text-[#6B7B8D] text-base"></i>
                </div>
                {siteSettings.address.split(', Houston')[0]}<br />Houston{siteSettings.address.split('Houston')[1]}
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-5">Find Us</h4>
            <div className="rounded-xl overflow-hidden border border-gray-200" style={{ height: '200px' }}>
              <iframe
                title="Assured Restoration Houston Location"
                src={siteSettings.google_maps_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href={siteSettings.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-[#6B7B8D] hover:text-[#5B6B7D] text-xs font-semibold transition-colors cursor-pointer"
            >
              <i className="ri-navigation-line"></i>
              GET DIRECTIONS
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} {siteSettings.copyright_text}
          </p>
          <p className="text-gray-500 text-xs">
            Houston, TX · IICRC Certified · Family-Owned & Veteran-Led
          </p>
        </div>
      </div>
    </footer>
  );
}
