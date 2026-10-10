import React, { useState } from 'react';

export const PromoBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('ROTA2025');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-10">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#131b2e] via-[#131b2e] to-[#006591] p-8 lg:p-12 text-[#f7f9fb] shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-[#c9e6ff] text-[#001e2f] text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[16px]">stars</span>
              <span>RotaClub Özel Üyelik</span>
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-white leading-tight tracking-tight">
              Her Konaklamada %10 Puan Kazan & Erken Rezervasyon İndirimleri
            </h2>
            <p className="text-[15px] text-[#e0e3e5] leading-relaxed">
              RotaStay ile rezerve ettiğin her gece bir sonraki tatilinde harcanabilir puana dönüşür. Yaz sezonu fırsatlarında ek %15 kupon avantajını kaçırma.
            </p>
          </div>

          {/* Promo Code & Interactive Copy Module */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <div className="flex flex-col text-left px-2">
              <span className="text-[12px] font-medium text-[#e0e3e5]">İndirim Kodu</span>
              <span className="text-[20px] tracking-wider text-white font-extrabold" id="promoCode">
                ROTA2025
              </span>
            </div>
            <button
              onClick={handleCopy}
              className={`px-5 py-3 rounded-xl font-bold text-[14px] transition-all shadow-sm whitespace-nowrap cursor-pointer active:scale-95 ${
                copied
                  ? 'bg-[#10b981] text-white'
                  : 'bg-white hover:bg-[#eceef0] text-[#131b2e]'
              }`}
            >
              {copied ? 'Kopyalandı! ✓' : 'Kodu Kopyala'}
            </button>
          </div>
        </div>

        {/* Ambient subtle glow vector */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#39b8fd]/20 blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};
