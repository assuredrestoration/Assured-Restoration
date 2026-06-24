import testimonials from '@/content/testimonials.json';

export default function GoogleReviewsBanner() {
  const reviews = testimonials.testimonials.map((review) => ({
    name: review.client_name,
    text: review.short_review_text,
    rating: review.rating,
  }));

  // Duplicate for seamless loop
  const allReviews = [...reviews, ...reviews];

  return (
    <section className="w-full bg-[#F8F9FA] border-y border-[#E2E8F0] overflow-hidden py-6">
      <div className="w-full px-6 md:px-10 mb-4 flex items-center justify-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center">
          <i className="ri-google-fill text-[#4285F4] text-xl"></i>
        </div>
        <span className="text-[#3D4F5F] font-bold text-sm">Google Reviews</span>
        <span className="text-gray-400 text-xs">â€” 4.8 rating from 200+ reviews</span>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
          {allReviews.map((review, i) => (
            <div
              key={`${review.name}-${i}`}
              className="flex-shrink-0 w-[400px] mx-3 bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex items-center justify-center bg-[#6B7B8D]/10 rounded-full flex-shrink-0">
                  <span className="text-[#6B7B8D] font-bold text-xs">
                    {review.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-[#3D4F5F] font-semibold text-sm truncate">{review.name}</div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <i key={j} className="ri-star-fill text-yellow-400 text-xs"></i>
                    ))}
                  </div>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <i className="ri-google-fill text-[#4285F4] text-sm"></i>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 italic">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
