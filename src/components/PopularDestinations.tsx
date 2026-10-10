import React from 'react';
import { POPULAR_DESTINATIONS } from '../data/hotelsData';

interface PopularDestinationsProps {
  onSelectDestination: (destinationName: string) => void;
  onViewAllDestinations: () => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  onSelectDestination,
  onViewAllDestinations,
}) => {
  return (
    <section className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[12px] font-semibold uppercase tracking-wider text-[#006591] block">
            Popüler Rotalar
          </span>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#191c1e] tracking-tight">
            Türkiye'nin En Çok Tercih Edilenleri
          </h2>
        </div>
        <button
          onClick={onViewAllDestinations}
          className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#006591] hover:text-[#004666] transition-colors self-start md:self-auto cursor-pointer"
        >
          <span>Tüm Rotaları İncele</span>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[260px]">
        {/* Card 1: Antalya (Large feature card: 6 cols) */}
        <div
          onClick={() => onSelectDestination('Antalya')}
          className="lg:col-span-6 rounded-2xl overflow-hidden relative group shadow-sm hover:shadow-xl transition-all flex flex-col justify-end p-6 cursor-pointer border border-[#eceef0]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('${POPULAR_DESTINATIONS[0].image}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-[#131b2e]/30 to-transparent" />
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 rounded-full bg-[#006591] text-white text-[12px] font-semibold">
                1.420 Tesis
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md text-white text-[12px] font-semibold">
                Mavi Bayraklı Plajlar
              </span>
            </div>
            <h3 className="text-[28px] font-bold text-white tracking-tight">Antalya</h3>
            <p className="text-[13px] text-[#e0e3e5] line-clamp-1">
              Lara, Belek, Kemer ve Kaş'ın eşsiz koylarında lüks konaklama.
            </p>
          </div>
        </div>

        {/* Card 2: İstanbul (3 cols) */}
        <div
          onClick={() => onSelectDestination('İstanbul')}
          className="lg:col-span-3 rounded-2xl overflow-hidden relative group shadow-sm hover:shadow-xl transition-all flex flex-col justify-end p-6 cursor-pointer border border-[#eceef0]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('${POPULAR_DESTINATIONS[1].image}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-[#131b2e]/30 to-transparent" />
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md text-white text-[12px] font-semibold">
                2.180 Tesis
              </span>
            </div>
            <h3 className="text-[22px] font-bold text-white">İstanbul</h3>
            <p className="text-[13px] text-[#e0e3e5] truncate">Tarih ve Boğaz Manzarası</p>
          </div>
        </div>

        {/* Card 3: Kapadokya (3 cols) */}
        <div
          onClick={() => onSelectDestination('Kapadokya')}
          className="lg:col-span-3 rounded-2xl overflow-hidden relative group shadow-sm hover:shadow-xl transition-all flex flex-col justify-end p-6 cursor-pointer border border-[#eceef0]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('${POPULAR_DESTINATIONS[2].image}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-[#131b2e]/30 to-transparent" />
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md text-white text-[12px] font-semibold">
                390 Tesis
              </span>
            </div>
            <h3 className="text-[22px] font-bold text-white">Kapadokya</h3>
            <p className="text-[13px] text-[#e0e3e5] truncate">Büyüleyici Mağara Otelleri</p>
          </div>
        </div>

        {/* Card 4: Bodrum (7 cols) */}
        <div
          onClick={() => onSelectDestination('Bodrum')}
          className="lg:col-span-7 rounded-2xl overflow-hidden relative group shadow-sm hover:shadow-xl transition-all flex flex-col justify-end p-6 cursor-pointer border border-[#eceef0]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('${POPULAR_DESTINATIONS[3].image}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-[#131b2e]/30 to-transparent" />
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 rounded-full bg-[#006591] text-white text-[12px] font-semibold">
                850 Tesis
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md text-white text-[12px] font-semibold">
                Koylar ve Gece Hayatı
              </span>
            </div>
            <h3 className="text-[28px] font-bold text-white tracking-tight">Bodrum</h3>
            <p className="text-[13px] text-[#e0e3e5] line-clamp-1">
              Yalıkavak, Türkbükü ve Gümüşlük'te butik yaşam ve gurme lezzetler.
            </p>
          </div>
        </div>

        {/* Card 5: Fethiye (5 cols) */}
        <div
          onClick={() => onSelectDestination('Fethiye')}
          className="lg:col-span-5 rounded-2xl overflow-hidden relative group shadow-sm hover:shadow-xl transition-all flex flex-col justify-end p-6 cursor-pointer border border-[#eceef0]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('${POPULAR_DESTINATIONS[4].image}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-[#131b2e]/30 to-transparent" />
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md text-white text-[12px] font-semibold">
                610 Tesis
              </span>
            </div>
            <h3 className="text-[22px] font-bold text-white">Fethiye</h3>
            <p className="text-[13px] text-[#e0e3e5] truncate">Ölüdeniz & Doğa Rotaları</p>
          </div>
        </div>
      </div>
    </section>
  );
};
