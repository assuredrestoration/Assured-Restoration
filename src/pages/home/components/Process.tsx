import homepage from '@/content/homepage.json';

const steps = homepage.process_steps;

export default function Process() {
  return (
    <section id="process" className="w-full bg-[#3D4F5F] py-20 md:py-28">
      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#6B7B8D] text-xs uppercase tracking-widest mb-4">
            <div className="w-8 h-px bg-[#6B7B8D]"></div>
            How It Works
            <div className="w-8 h-px bg-[#6B7B8D]"></div>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Proven Process Designed for Speed, Clarity, and Results
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-xl overflow-hidden group"
              style={{ height: '420px' }}
            >
              {/* Background image */}
              <img
                src={step.image}
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                {/* Step number */}
                <div
                  className="text-5xl font-bold text-[#6B7B8D]/40 leading-none mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-9 h-9 flex items-center justify-center bg-[#6B7B8D]/20 border border-[#6B7B8D]/40 rounded-full mb-3">
                  <i className={`${step.icon} text-[#6B7B8D] text-sm`}></i>
                </div>

                <h3 className="text-white font-bold text-base mb-2 leading-tight">{step.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-px bg-[#6B7B8D]/40 z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

