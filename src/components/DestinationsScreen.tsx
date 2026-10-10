import React from 'react';
import { POPULAR_DESTINATIONS } from '../data/hotelsData';

interface DestinationsScreenProps {
  onSelectDestination: (destinationName: string) => void;
  onBackToHotels: () => void;
}

export const DestinationsScreen: React.FC<DestinationsScreenProps> = ({
  onSelectDestination,
  onBackToHotels,
}) => {
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
            Popüler Tatil Rotaları & Bölgeler
          </h1>
          <p className="text-[15px] text-[#45464d] mt-1">
            Türkiye'nin dört bir yanındaki eşsiz tatil destinasyonlarını, koylarını ve butik konaklama bölgelerini keşfedin.
          </p>
        </div>
      </div>

      {/* Destination Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {POPULAR_DESTINATIONS.map((dest) => (
          <div
            key={dest.id}
            className="rounded-2xl overflow-hidden bg-white border border-[#eceef0] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#006591] text-white text-[12px] font-bold">
                  {dest.propertyCount.toLocaleString('tr-TR')} Tesis
                </span>
                <span className="px-3 py-1 rounded-full bg-white/30 backdrop-blur-md text-white text-[12px] font-bold">
                  {dest.badge}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-[26px] font-extrabold">{dest.name}</h3>
                <p className="text-[13px] text-[#e0e3e5]">{dest.subtitle}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-[14px] text-[#45464d] leading-relaxed">
                {dest.description}
              </p>

              <div>
                <span className="text-[12px] font-bold text-[#76777d] block mb-2 uppercase tracking-wider">
                  Öne Çıkan Alt Bölgeler
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {dest.popularDistricts.map((dist, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#f2f4f6] text-[12px] font-semibold text-[#191c1e]"
                    >
                      {dist}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#f2f4f6]">
                <button
                  onClick={() => onSelectDestination(dest.name)}
                  className="w-full py-3 rounded-xl bg-[#006591] hover:bg-[#004666] text-white font-bold text-[14px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{dest.name} Otellerini Listele</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
