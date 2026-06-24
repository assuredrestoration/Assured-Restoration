import Header from '@/pages/home/components/Header';
import Footer from '@/pages/home/components/Footer';
import financingContent from '@/content/financing.json';

const features = financingContent.features;

const whyChoose = financingContent.why_choose;

const lenders = financingContent.lenders;

export default function FinancingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative w-full pt-[140px]">
        <div className="w-full bg-gradient-to-r from-[#4A5568] to-[#6B7B8D] py-20 px-6 md:px-16 lg:px-24 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Finance Your Project
          </h1>
          <p className="text-white/80 text-base mb-2">
            Multiple financing options to fit your budget
          </p>
          <p className="text-white/60 text-xs">^Rates and terms may vary by lending partner.</p>
        </div>
      </section>

      {/* Three Equal Financing Banners */}
      <section className="w-full bg-white py-16">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
              Choose Your Option
              <div className="w-8 h-px bg-[#6B7B8D]"></div>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#3D4F5F] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Three Ways to Pay
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              Select the financing option that works best for your project. All options are subject to credit approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Enhancify Card */}
            <div className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 flex items-center justify-center bg-[#68BA62]/10 rounded-full">
                  <i className="ri-bar-chart-grouped-fill text-[#68BA62] text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#3D4F5F] text-xl">Enhancify</h3>
                  <p className="text-gray-500 text-xs">Marketplace Financing</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                Compare multiple lender offers in one place. See your personalized rates in 60 seconds with no impact on your credit score.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Multiple lender offers
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  60-second application
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Soft credit pull available
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Funding in 1-5 business days
                </li>
              </ul>
              <a
                href="https://www.enhancify.com/assuredrestoration"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#68BA62] hover:bg-[#5aaa54] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                See Personal Offers
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            {/* Acorn Finance Card */}
            <div className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 flex items-center justify-center bg-[#6B7B8D]/10 rounded-full">
                  <i className="ri-plant-fill text-[#6B7B8D] text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#3D4F5F] text-xl">Acorn Finance</h3>
                  <p className="text-gray-500 text-xs">Home Improvement Loans</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                Get pre-qualified for home improvement financing without affecting your credit score. Compare rates from multiple lenders and choose the best option.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Pre-qualify in minutes
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  No impact on credit score
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Multiple lender offers
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Flexible loan terms
                </li>
              </ul>
              <a
                href="https://www.acornfinance.com/pre-qualify/?d=W28I2&utm_medium=web_pre_qual_link_copy_welcome"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#6B7B8D] hover:bg-[#5B6B7D] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                Pre-Qualify Now
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            {/* GreenSky Card */}
            <div className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 flex items-center justify-center bg-[#3D4F5F]/10 rounded-full">
                  <i className="ri-bank-card-fill text-[#3D4F5F] text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#3D4F5F] text-xl">GreenSky</h3>
                  <p className="text-gray-500 text-xs">Home Improvement Financing</p>
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-4 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 flex items-center justify-center bg-[#3D4F5F] rounded-full flex-shrink-0">
                    <i className="ri-mail-send-fill text-white text-xs"></i>
                  </div>
                  <div>
                    <p className="text-[#3D4F5F] font-semibold text-sm mb-1">Invitation Required</p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Available by invitation from our team. Contact us to receive your personalized application link.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                Flexible financing plans with promotional APR options. Subject to credit approval. Available exclusively for Assured Restoration clients.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Promotional APR options
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Flexible repayment plans
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Subject to credit approval
                </li>
                <li className="flex items-center gap-2 text-gray-600 text-sm">
                  <i className="ri-checkbox-circle-fill text-[#6B7B8D]"></i>
                  Exclusive for our clients
                </li>
              </ul>
              <a
                href="tel:7133937077"
                className="w-full flex items-center justify-center gap-2 bg-[#3D4F5F] hover:bg-[#2D3F4F] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-phone-fill"></i>
                Call to Request Invitation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full bg-[#f8f9fa] py-16">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <h3 className="text-2xl font-bold text-[#3D4F5F] mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Submit a quick application on our partner site.', icon: 'ri-edit-2-fill' },
              { step: '2', title: 'Review offers and select the one that fits your needs.', icon: 'ri-search-eye-fill' },
              { step: '3', title: 'Finalize with your lender and get funded in 1-5 business days.', icon: 'ri-money-dollar-circle-fill' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5">
                <div className="w-10 h-10 flex items-center justify-center bg-[#6B7B8D] rounded-full flex-shrink-0 text-white font-bold">
                  {item.step}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full bg-white py-16">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center p-5 rounded-xl bg-[#f8f9fa] border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center bg-[#6B7B8D]/10 rounded-full mb-3">
                  <i className={`${f.icon} text-[#6B7B8D] text-xl`}></i>
                </div>
                <div className="font-bold text-[#3D4F5F] text-lg">{f.label}</div>
                <div className="text-gray-500 text-xs mt-1">{f.sub}</div>
              </div>
            ))}
          </div>

          {/* Why Choose */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
                <div className="w-8 h-px bg-[#6B7B8D]"></div>
                Benefits
              </div>
              <h2 className="text-3xl font-bold text-[#3D4F5F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why Finance With Us?
              </h2>
              <ul className="space-y-3">
                {whyChoose.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-checkbox-circle-fill text-[#6B7B8D] text-base"></i>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="https://www.enhancify.com/assuredrestoration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#68BA62] hover:bg-[#5aaa54] text-white font-bold text-base px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                >
                  See Your Personal Offers
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Estimate Calculator */}
            <div className="bg-[#3D4F5F] rounded-2xl p-8 text-white">
              <h3 className="text-lg font-bold mb-2 text-[#6B7B8D] uppercase tracking-widest text-sm">Estimate Your Monthly Payment</h3>
              <div className="mt-6 bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                <p className="text-gray-300 text-sm mb-2">Estimated min. monthly payment**</p>
                <p className="text-5xl font-bold text-[#6B7B8D]" style={{ fontFamily: "'Playfair Display', serif" }}>$448.94</p>
                <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-gray-400 text-xs mb-1">Total Amount</div>
                    <div className="text-white font-bold text-xl">$20,000</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-xs mb-1">Monthly Payment</div>
                    <div className="text-[#6B7B8D] font-bold text-xl">$448.94</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-4">*The interest rate will vary based on your credit score and creditworthiness.</p>
              <p className="text-gray-500 text-xs">**Actual minimum monthly payment may vary. See terms and conditions of your specific offer.</p>
              <a
                href="https://www.enhancify.com/assuredrestoration"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#68BA62] hover:bg-[#5aaa54] text-white font-bold text-base py-3 rounded-full transition-colors cursor-pointer"
              >
                Get My Personalized Offers
              </a>
            </div>
          </div>

          {/* About Enhancify */}
          <div className="bg-[#f8f9fa] rounded-2xl p-10 mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center bg-[#4A5568] rounded-full">
                <i className="ri-information-fill text-white"></i>
              </div>
              <h3 className="font-bold text-[#3D4F5F] text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>About Enhancify</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Enhancify is an online financing marketplace that makes it easy to see and compare many financing options for any purpose in one place.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              You&apos;ll see multiple offers in one place, instantly, instead of having to individually shop around at different lenders or visit bank branches.
            </p>
            <blockquote className="border-l-4 border-[#6B7B8D] pl-4 italic text-gray-500 text-sm">
              &ldquo;I would highly recommend Enhancify as it makes the process of financing much easier. Instead of going to local banks I saw all financing offers in one place and chose the best.&rdquo;
              <cite className="block mt-2 not-italic font-semibold text-[#3D4F5F]">â€” George Mitchell, homeowner</cite>
            </blockquote>
          </div>

          {/* Lenders */}
          <div className="text-center mb-12">
            <h3 className="text-xl font-bold text-[#3D4F5F] mb-6 uppercase tracking-widest text-sm">Leading Lenders</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {lenders.map((lender) => (
                <span key={lender} className="bg-[#f8f9fa] border border-gray-100 text-[#3D4F5F] text-sm font-semibold px-5 py-2.5 rounded-full">
                  {lender}
                </span>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-[#3D4F5F] rounded-2xl p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Enjoy an easy, professional way to finance your project!
            </h2>
            <a
              href="https://www.enhancify.com/assuredrestoration"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#68BA62] hover:bg-[#5aaa54] text-white font-bold text-lg px-10 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              See Your Personal Offers
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
