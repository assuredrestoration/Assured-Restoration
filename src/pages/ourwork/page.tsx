import Header from '@/pages/home/components/Header';
import Footer from '@/pages/home/components/Footer';
import { Link } from 'react-router-dom';
import projectsContent from '@/content/projects.json';

const beforeAfterImages = projectsContent.before_after_images;

const bathroomImages = projectsContent.bathroom_images;

const kitchenImages = projectsContent.kitchen_images;

const featuredProjects = projectsContent.featured_projects.map((project) => ({
  name: project.title,
  type: project.category,
  img: project.main_image,
}));

export default function OurWorkPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative w-full pt-[100px]" style={{ minHeight: '380px' }}>
        <div className="absolute inset-0">
          <img
            src="/uploads/assured-restoration/fire-restoration.jpeg"
            alt="Our Work - Assured Restoration Houston TX"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D4F5F]/90 via-[#3D4F5F]/75 to-[#3D4F5F]/50"></div>
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-24 flex flex-col items-center text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 15px rgba(0,0,0,0.7)' }}
          >
            Our Work
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mb-8" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
            We have proudly completed <strong className="text-white">over 1,000 projects</strong> throughout the greater Houston area, delivering exceptional results for both residential and commercial properties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:7133937077" className="flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap shadow-xl">
              <i className="ri-phone-fill"></i>
              Call For a Free Assessment
            </a>
            <Link to="/our-services" className="flex items-center justify-center gap-2 bg-white/15 border-2 border-white/50 hover:bg-white/25 text-white font-semibold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full bg-white py-16">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <h2 className="text-3xl font-bold text-[#3D4F5F] text-center mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {featuredProjects.map((proj) => (
              <div key={proj.name} className="rounded-xl overflow-hidden group cursor-pointer">
                <div className="relative" style={{ height: '240px' }}>
                  <img src={proj.img} alt={proj.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-white font-bold text-lg">{proj.name}</h3>
                    <p className="text-gray-300 text-sm">{proj.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="w-full bg-[#f8f9fa] py-16">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#3D4F5F]" style={{ fontFamily: "'Playfair Display', serif" }}>Before &amp; After</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {beforeAfterImages.map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ height: '220px' }}>
                <img src={src} alt={`Before and after project ${i + 1}`} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bathroom Remodels */}
      <section className="w-full bg-[#3D4F5F] py-16">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Bathroom Remodels</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {bathroomImages.map((item, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ height: '260px' }}>
                <img src={item.src} alt={item.label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen Remodels */}
      <section className="w-full bg-white py-16">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#3D4F5F]" style={{ fontFamily: "'Playfair Display', serif" }}>Kitchen Remodels</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {kitchenImages.map((item, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ height: '260px' }}>
                <img src={item.src} alt={item.label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#f8f9fa] border-t border-gray-100 py-16">
        <div className="w-full px-6 md:px-16 lg:px-24 text-center">
          <h2 className="text-3xl font-bold text-[#3D4F5F] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Start Your Project?</h2>
          <p className="text-gray-500 text-base mb-8 max-w-xl mx-auto">We&apos;ve proudly completed over 1,000 projects throughout the Greater Houston area. Let us bring your vision to life.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7133937077" className="flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-phone-fill"></i>
              Call (713) 393-7077
            </a>
            <Link to="/our-services" className="flex items-center justify-center gap-2 border-2 border-[#3D4F5F] text-[#3D4F5F] hover:bg-[#3D4F5F] hover:text-white font-semibold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
