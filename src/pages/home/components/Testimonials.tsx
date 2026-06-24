import testimonials from '@/content/testimonials.json';
import siteSettings from '@/content/site-settings.json';
import homepage from '@/content/homepage.json';

const reviews = testimonials.testimonials;
const content = homepage.testimonials_preview;

export default function Testimonials() {
  return (
    <section className="w-full bg-[#f5f5f5] py-20 md:py-28">
      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
            <div className="w-8 h-px bg-[#6B7B8D]"></div>
            {content.eyebrow}
            <div className="w-8 h-px bg-[#6B7B8D]"></div>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#3D4F5F] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {content.heading}
          </h2>
          {/* Rating display */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <i key={s} className="ri-star-fill text-yellow-400 text-xl"></i>
              ))}
            </div>
            <span className="text-[#3D4F5F] font-bold text-2xl">{content.rating}</span>
            <a
              href={siteSettings.google_reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 text-sm underline hover:text-[#6B7B8D] transition-colors"
            >
              {content.review_count_text}
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {reviews.map((r) => (
            <div
              key={r.client_name}
              className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#6B7B8D]/30 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic line-clamp-4">&ldquo;{r.review_text}&rdquo;</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                <div>
                  <div className="text-[#3D4F5F] font-semibold text-sm">{r.client_name}</div>
                  <div className="text-gray-400 text-xs flex items-center gap-1">
                    <span>{r.date_text}</span>
                    <span>on</span>
                    <span className="text-[#4285F4] font-medium">Google</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={siteSettings.google_reviews_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#3D4F5F] hover:border-[#6B7B8D] font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap mr-4"
          >
            <i className="ri-google-fill text-[#4285F4]"></i>
            {content.cta_review_text}
          </a>
          <a
            href={siteSettings.phone_href}
            className="inline-flex items-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-phone-fill text-lg"></i>
            {content.cta_call_text}
          </a>
        </div>
      </div>
    </section>
  );
}
