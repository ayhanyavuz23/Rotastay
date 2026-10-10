import React from 'react';
import { Hotel, Currency } from '../types/hotel';
import { formatPrice } from '../utils/formatters';

interface FeaturedHotelsProps {
  hotels: Hotel[];
  favorites: string[];
  onToggleFavorite: (hotelId: string) => void;
  onSelectHotel: (hotel: Hotel) => void;
  currency: Currency;
  sortOption: 'recommended' | 'priceAsc' | 'priceDesc' | 'ratingDesc';
  onSortChange: (option: 'recommended' | 'priceAsc' | 'priceDesc' | 'ratingDesc') => void;
  activeFilterSummary?: string;
  onClearFilters?: () => void;
}

export const FeaturedHotels: React.FC<FeaturedHotelsProps> = ({
  hotels,
  favorites,
  onToggleFavorite,
  onSelectHotel,
  currency,
  sortOption,
  onSortChange,
  activeFilterSummary,
  onClearFilters,
}) => {
  return (
    <section id="hotels-section" className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#006591]" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#006591]">
              Seçkin Koleksiyon
            </span>
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#191c1e] tracking-tight">
            Öne Çıkan Oteller
          </h2>
          {activeFilterSummary && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[13px] text-[#45464d]">{activeFilterSummary}</span>
              {onClearFilters && (
                <button
                  onClick={onClearFilters}
                  className="text-[12px] font-semibold text-[#006591] hover:underline"
                >
                  Filtreleri Sıfırla
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sorting Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() =>
              onSortChange(sortOption === 'priceAsc' ? 'priceDesc' : 'priceAsc')
            }
            className={`px-4 py-2 rounded-lg font-semibold text-[13px] transition-colors cursor-pointer flex items-center gap-1.5 ${
              sortOption === 'priceAsc' || sortOption === 'priceDesc'
                ? 'bg-[#006591] text-white shadow-sm'
                : 'bg-[#f2f4f6] text-[#191c1e] hover:bg-[#eceef0]'
            }`}
          >
            <span>Fiyata Göre Sırala</span>
            {sortOption === 'priceAsc' && (
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            )}
            {sortOption === 'priceDesc' && (
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            )}
          </button>

          <button
            onClick={() => onSortChange(sortOption === 'ratingDesc' ? 'recommended' : 'ratingDesc')}
            className={`px-4 py-2 rounded-lg font-semibold text-[13px] transition-colors cursor-pointer ${
              sortOption === 'ratingDesc'
                ? 'bg-[#131b2e] text-white shadow-sm'
                : 'bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5]'
            }`}
          >
            En Yüksek Puan
          </button>
        </div>
      </div>

      {hotels.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#eceef0] shadow-sm">
          <span className="material-symbols-outlined text-[48px] text-[#76777d] mb-3">
            search_off
          </span>
          <h3 className="text-[18px] font-bold text-[#191c1e]">
            Aramanıza uygun otel bulunamadı
          </h3>
          <p className="text-[14px] text-[#45464d] mt-1 mb-4">
            Lütfen filtreleri sıfırlayarak veya farklı bir rota arayarak tekrar deneyin.
          </p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-6 py-2.5 rounded-xl bg-[#006591] text-white font-semibold text-[14px] hover:bg-[#004666] transition-colors"
            >
              Tüm Otelleri Göster
            </button>
          )}
        </div>
      ) : (
        /* Hotel Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => {
            const isFav = favorites.includes(hotel.id);

            return (
              <div
                key={hotel.id}
                className="group flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#eceef0]/80"
              >
                {/* Image & Header Overlay */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eceef0]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={hotel.mainImage}
                    alt={hotel.name}
                    loading="lazy"
                  />

                  {/* Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(hotel.id);
                    }}
                    aria-label={isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-sm cursor-pointer ${
                      isFav
                        ? 'bg-white text-[#ba1a1a] scale-110'
                        : 'bg-white/80 text-[#191c1e] hover:text-[#ba1a1a] hover:bg-white'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isFav ? 'font-fill' : ''
                      }`}
                      style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Star or Category Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#131b2e]/85 backdrop-blur-md text-white text-[12px] font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-[#71f8e4]">
                      {hotel.badgeType.includes('Butik') ? 'cottage' : 'hotel_class'}
                    </span>
                    <span>{hotel.badgeType}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    {/* Location & Score Row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1 text-[13px] text-[#45464d] truncate">
                        <span className="material-symbols-outlined text-[16px] text-[#006591]">
                          location_on
                        </span>
                        <span className="truncate">{hotel.location}</span>
                      </span>

                      {/* Score Badge */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[12px] font-semibold text-[#45464d] hidden sm:inline">
                          {hotel.ratingLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#131b2e] text-white font-bold text-[15px] leading-tight">
                          {hotel.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Hotel Title */}
                    <h3
                      onClick={() => onSelectHotel(hotel)}
                      className="font-bold text-[17px] text-[#191c1e] line-clamp-1 group-hover:text-[#006591] transition-colors cursor-pointer"
                    >
                      {hotel.name}
                    </h3>

                    {/* Review Count */}
                    <span className="text-[13px] text-[#76777d]">
                      {hotel.reviewsCount.toLocaleString('tr-TR')} değerlendirme
                    </span>

                    {/* Feature Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hotel.tags.slice(0, 3).map((tag, idx) => {
                        const isHighlight =
                          tag.includes('Denize Sıfır') ||
                          tag.includes('Balon Manzaralı') ||
                          tag.includes('Özel');

                        return (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isHighlight
                                ? 'bg-[#c9e6ff] text-[#001e2f]'
                                : 'bg-[#f2f4f6] text-[#191c1e]'
                            }`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & CTA Stack */}
                  <div className="pt-3 flex items-end justify-between gap-2 border-t border-[#f2f4f6]">
                    <div className="flex flex-col">
                      <span className="text-[12px] text-[#45464d]">Gecelik başlangıç</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-extrabold text-[22px] sm:text-[24px] text-[#191c1e]">
                          {formatPrice(hotel.pricePerNight, currency)}
                        </span>
                        <span className="text-[12px] text-[#76777d]">/ gece</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#006591]">
                        Vergiler Dahil
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectHotel(hotel)}
                      className="px-4 py-2.5 rounded-xl bg-black hover:bg-[#2d3133] text-white font-semibold text-[13px] transition-colors shrink-0 cursor-pointer active:scale-95"
                    >
                      Oteli İncele
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
