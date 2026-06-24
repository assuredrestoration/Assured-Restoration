import { useState } from 'react';
import faqsContent from '@/content/faqs.json';
import homepage from '@/content/homepage.json';

const faqs = faqsContent.faqs.map((faq) => ({ q: faq.question, a: faq.answer }));
const content = homepage.faq_preview;

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              {content.eyebrow}
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#3D4F5F]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {content.heading}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-[#E2E8F0] rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer hover:bg-[#F8F9FA] transition-colors duration-200"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-[#3D4F5F] text-sm leading-snug pr-4">{faq.q}</span>
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                    <i className={`${open === i ? 'ri-subtract-line' : 'ri-add-line'} text-[#6B7B8D] text-lg`}></i>
                  </div>
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

