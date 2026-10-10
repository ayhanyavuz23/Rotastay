import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-[#006591] block">
          Zahmetsiz Rezervasyon
        </span>
        <h2 className="text-[32px] sm:text-[40px] font-bold text-[#191c1e] mt-1 tracking-tight">
          RotaStay Nasıl Çalışır?
        </h2>
        <p className="text-[15px] text-[#45464d] mt-2 leading-relaxed">
          Şeffaf fiyatlandırma standardı ve doğrulanmış otel güvencesiyle 3 kolay adımda tatilini planla.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="flex flex-col p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#eceef0]">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#eceef0] flex items-center justify-center text-[#006591]">
              <span className="material-symbols-outlined text-[28px]">travel_explore</span>
            </div>
            <span className="font-extrabold text-[24px] text-[#c6c6cd]">01</span>
          </div>
          <h3 className="text-[20px] font-bold text-[#191c1e] mb-2">
            Rotanı ve Tarihini Belirle
          </h3>
          <p className="text-[14px] text-[#45464d] leading-relaxed font-normal">
            Binlerce onaylı tesis arasından tatil tarzına, bütçene ve beklentilerine en uygun olanları gelişmiş filtrelerle saniyeler içinde listele.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#eceef0]">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#eceef0] flex items-center justify-center text-[#006591]">
              <span className="material-symbols-outlined text-[28px]">price_check</span>
            </div>
            <span className="font-extrabold text-[24px] text-[#c6c6cd]">02</span>
          </div>
          <h3 className="text-[20px] font-bold text-[#191c1e] mb-2">
            Şeffaf Fiyatlarla Odanı Seç
          </h3>
          <p className="text-[14px] text-[#45464d] leading-relaxed font-normal">
            Son adımda sürpriz yok. Gizli ek ücret olmadan, tüm vergiler dahil net toplam fiyatı ve esnek iptal koşullarını görerek güvenle karar ver.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#eceef0]">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#eceef0] flex items-center justify-center text-[#006591]">
              <span className="material-symbols-outlined text-[28px]">verified_user</span>
            </div>
            <span className="font-extrabold text-[24px] text-[#c6c6cd]">03</span>
          </div>
          <h3 className="text-[20px] font-bold text-[#191c1e] mb-2">
            Anında Onay ile Tatile Başla
          </h3>
          <p className="text-[14px] text-[#45464d] leading-relaxed font-normal">
            256-bit SSL ve 3D Secure korumalı ödeme sonrası rezervasyon belgen anında hazır. 7/24 kesintisiz Türkçe seyahat desteği hep yanında.
          </p>
        </div>
      </div>
    </section>
  );
};
