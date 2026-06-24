import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import siteSettings from '@/content/site-settings.json';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="w-full px-6 md:px-10 h-[140px] flex items-center justify-between">
          {/* Logo - 3x larger */}
          <Link to="/" className="flex items-center cursor-pointer flex-shrink-0 rounded-none">
            <img
              src={siteSettings.logo}
              alt={siteSettings.company_name}
              className="h-[120px] w-auto object-contain rounded-none"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              to="/"
              className={`text-sm uppercase tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap ${isActive('/') ? 'text-[#6B7B8D]' : 'text-gray-600 hover:text-[#6B7B8D]'}`}
            >
              Home
            </Link>
            <Link
              to="/our-services"
              className={`text-sm uppercase tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap ${isActive('/our-services') ? 'text-[#6B7B8D]' : 'text-gray-600 hover:text-[#6B7B8D]'}`}
            >
              Our Services
            </Link>
            <Link
              to="/our-work"
              className={`text-sm uppercase tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap ${isActive('/our-work') ? 'text-[#6B7B8D]' : 'text-gray-600 hover:text-[#6B7B8D]'}`}
            >
              Our Work
            </Link>

            {/* About Us dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setAboutDropdown(!aboutDropdown)}
                className={`flex items-center gap-1 text-sm uppercase tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap ${location.pathname.startsWith('/about') || location.pathname === '/careers' ? 'text-[#6B7B8D]' : 'text-gray-600 hover:text-[#6B7B8D]'}`}
              >
                About Us
                <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${aboutDropdown ? 'rotate-180' : ''}`}></i>
              </button>
              {aboutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
                  <Link
                    to="/about-us"
                    onClick={() => setAboutDropdown(false)}
                    className="block px-4 py-3 text-sm text-gray-600 hover:text-[#6B7B8D] hover:bg-gray-50 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/careers"
                    onClick={() => setAboutDropdown(false)}
                    className="block px-4 py-3 text-sm text-gray-600 hover:text-[#6B7B8D] hover:bg-gray-50 transition-colors border-t border-gray-50"
                  >
                    Careers
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/franchise"
              className={`text-sm uppercase tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap ${isActive('/franchise') ? 'text-[#6B7B8D]' : 'text-gray-600 hover:text-[#6B7B8D]'}`}
            >
              Franchise
            </Link>
            <Link
              to="/financing"
              className={`text-sm uppercase tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap ${isActive('/financing') ? 'text-[#6B7B8D]' : 'text-gray-600 hover:text-[#6B7B8D]'}`}
            >
              Financing
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteSettings.phone_href}
              className="flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-fill text-base"></i>
              CALL {siteSettings.phone}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl cursor-pointer text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1">
            {[
              { label: 'Home', to: '/' },
              { label: 'Our Services', to: '/our-services' },
              { label: 'Our Work', to: '/our-work' },
              { label: 'About Us', to: '/about-us' },
              { label: 'Careers', to: '/careers', indent: true },
              { label: 'Franchise', to: '/franchise' },
              { label: 'Financing', to: '/financing' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`text-gray-600 hover:text-[#6B7B8D] text-sm uppercase tracking-widest transition-colors cursor-pointer py-2 ${link.indent ? 'pl-4 text-xs' : ''}`}
              >
                {link.indent && <span className="text-gray-300 mr-2">└</span>}
                {link.label}
              </Link>
            ))}
            <a
              href={siteSettings.phone_href}
              className="mt-2 flex items-center justify-center gap-2 bg-[#6B7B8D] text-white text-sm font-semibold px-5 py-3 rounded-full cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-fill"></i>
              Call {siteSettings.phone}
            </a>
          </div>
        )}
      </header>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#6B7B8D] shadow-lg">
        <a
          href={siteSettings.phone_href}
          className="flex items-center justify-center gap-2 text-white font-bold text-base py-4 cursor-pointer"
        >
          <i className="ri-phone-fill text-xl"></i>
          Tap to Call: {siteSettings.phone}
        </a>
      </div>
    </>
  );
}
