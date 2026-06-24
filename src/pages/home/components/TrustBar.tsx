import homepage from '@/content/homepage.json';

export default function TrustBar() {
  const items = homepage.trust_bar;

  return (
    <section className="w-full bg-[#F8F9FA] border-y border-[#E2E8F0]">
      <div className="w-full px-6 md:px-10 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {items.map((item, i) => (
            <div key={item.title} className="flex items-center gap-3 flex-1 min-w-[160px]">
              {i > 0 && (
                <div className="hidden lg:block w-px h-10 bg-[#2B8A6F]/30 mr-1"></div>
              )}
              <div className="w-9 h-9 flex items-center justify-center bg-[#2B8A6F]/10 rounded-full">
                <i className={`${item.icon} text-[#2B8A6F] text-base`}></i>
              </div>
              <div>
                <div className="text-[#3D4F5F] font-bold text-sm leading-tight">{item.title}</div>
                <div className="text-gray-500 text-xs leading-tight">{item.subtitle}</div>
              </div>
            </div>
          ))}

          {/* Badges */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden lg:block w-px h-10 bg-[#2B8A6F]/30"></div>
            <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-3 py-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-award-fill text-[#2B8A6F] text-lg"></i>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#3D4F5F] uppercase tracking-wide leading-tight">BBB Accredited</div>
                <div className="text-[10px] text-[#2B8A6F] font-bold leading-tight">A+ Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-3 py-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-verified-badge-fill text-[#2B8A6F] text-lg"></i>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#3D4F5F] uppercase tracking-wide leading-tight">IICRC</div>
                <div className="text-[10px] text-[#2B8A6F] font-bold leading-tight">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
