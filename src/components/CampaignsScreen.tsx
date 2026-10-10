import React, { useState } from 'react';

interface CampaignsScreenProps {
  onBackToHotels: () => void;
}

export const CampaignsScreen: React.FC<CampaignsScreenProps> = ({ onBackToHotels }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-10 space-y-10 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eceef0] pb-6">
        <div>
          <button
            onClick={onBackToHotels}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#006591] hover:underline mb-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Ana Sayfaya ve Otellere Dön
          </button>
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#191c1e] tracking-tight">
            Sezon Kampanyaları & Erken Rezervasyon Fırsatları
          </h1>
          <p className="text-[15px] text-[#45464d] mt-1">
            RotaStay ayrıcalıklarıyla hem anında indirim kazanın hem de konaklamalarınızı puana dönüştürün.
          </p>
        </div>
      </div>

      {/* Main Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: ROTA2025 */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#131b2e] to-[#006591] text-white flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#c9e6ff] text-[#001e2f] text-[12px] font-bold inline-block">
              Genel Erken Rezervasyon
            </span>
            <h3 className="text-[26px] font-bold leading-tight">
              Tüm Seçkin Otellerde Anında %10 İndirim
            </h3>
            <p className="text-[14px] text-[#e0e3e5] leading-relaxed">
              RotaStay üzerinden yapacağınız yaz ve sonbahar dönemi tüm butik ve resort otel rezervasyonlarında geçerlidir. Ücretsiz iptal güvencesiyle risk almadan yerinizi ayırtın.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between">
            <div>
              <span className="text-[12px] text-[#e0e3e5] block">Kupon Kodu</span>
              <span className="text-[20px] font-black tracking-widest text-[#71f8e4]">
                ROTA2025
              </span>
            </div>
            <button
              onClick={() => handleCopy('ROTA2025')}
              className="px-5 py-2.5 rounded-xl bg-white text-[#131b2e] font-bold text-[13px] hover:bg-[#eceef0] transition-colors cursor-pointer"
            >
              {copiedCode === 'ROTA2025' ? 'Kopyalandı! ✓' : 'Kodu Kopyala'}
            </button>
          </div>
        </div>

        {/* Card 2: YAZ2025 */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#006591] to-[#39b8fd] text-white flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] text-[12px] font-bold inline-block">
              Yaz Sezonu Özel
            </span>
            <h3 className="text-[26px] font-bold leading-tight">
              Ege & Akdeniz Sahillerinde %15 Kupon Avantajı
            </h3>
            <p className="text-[14px] text-[#e0e3e5] leading-relaxed">
              Antalya, Bodrum, Fethiye ve Çeşme'deki mavi bayraklı ve denize sıfır lüks otellerde 4 gece ve üzeri konaklamalarda ekstra %15 indirim.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between">
            <div>
              <span className="text-[12px] text-[#e0e3e5] block">Kupon Kodu</span>
              <span className="text-[20px] font-black tracking-widest text-white">
                YAZ2025
              </span>
            </div>
            <button
              onClick={() => handleCopy('YAZ2025')}
              className="px-5 py-2.5 rounded-xl bg-white text-[#006591] font-bold text-[13px] hover:bg-[#eceef0] transition-colors cursor-pointer"
            >
              {copiedCode === 'YAZ2025' ? 'Kopyalandı! ✓' : 'Kodu Kopyala'}
            </button>
          </div>
        </div>
      </div>

      {/* Bank Installments & Additional Perks */}
      <div className="p-8 rounded-2xl bg-white border border-[#eceef0] shadow-sm space-y-6">
        <h3 className="text-[20px] font-bold text-[#191c1e]">
          Taksit ve Ödeme Avantajları
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#f7f9fb] border border-[#eceef0]">
            <div className="font-bold text-[16px] text-[#191c1e] mb-1">
              Vade Farksız 6 Taksit
            </div>
            <p className="text-[13px] text-[#45464d]">
              Bonus, Maximum, Axess, World, CardFinans ve Paraf kartlara peşin fiyatına 6 taksit imkanı.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#f7f9fb] border border-[#eceef0]">
            <div className="font-bold text-[16px] text-[#191c1e] mb-1">
              Şeffaf Fiyat Standardı
            </div>
            <p className="text-[13px] text-[#45464d]">
              Tüm vergiler dahil net tutar garantisi. Sürpriz ek maliyet olmadan net toplam ödeme.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#f7f9fb] border border-[#eceef0]">
            <div className="font-bold text-[16px] text-[#191c1e] mb-1">
              Otelde Ödeme Kolaylığı
            </div>
            <p className="text-[13px] text-[#45464d]">
              Kart bilgisi vermeden anında ön rezervasyon yapın, ödemenizi otele vardığınızda gerçekleştirin.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onBackToHotels}
            className="px-8 py-3.5 rounded-xl bg-[#006591] hover:bg-[#004666] text-white font-bold text-[14px] shadow-md transition-all cursor-pointer"
          >
            Fırsat Otellerini İncele
          </button>
        </div>
      </div>
    </div>
  );
};
