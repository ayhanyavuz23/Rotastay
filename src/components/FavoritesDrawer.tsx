import React from 'react';
import { Hotel, Currency } from '../types/hotel';
import { formatPrice } from '../utils/formatters';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteHotels: Hotel[];
  onRemoveFavorite: (hotelId: string) => void;
  onSelectHotel: (hotel: Hotel) => void;
  currency: Currency;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteHotels,
  onRemoveFavorite,
  onSelectHotel,
  currency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#eceef0] bg-[#f7f9fb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#006591]">
              favorite
            </span>
            <h3 className="font-bold text-[18px] text-[#191c1e]">
              Favori Otelleriniz ({favoriteHotels.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eceef0] hover:bg-[#e0e3e5] flex items-center justify-center text-[#191c1e] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* List of favorites */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favoriteHotels.length === 0 ? (
            <div className="py-16 text-center text-[#76777d]">
              <span className="material-symbols-outlined text-[48px] text-[#c6c6cd] mb-3">
                favorite_border
              </span>
              <p className="text-[16px] font-bold text-[#191c1e]">
                Henüz favori oteliniz bulunmuyor
              </p>
              <p className="text-[13px] text-[#45464d] mt-1">
                Beğendiğiniz otellerin üzerindeki kalp ikonuna tıklayarak buraya kaydedebilirsiniz.
              </p>
            </div>
          ) : (
            favoriteHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex gap-4 p-3.5 rounded-xl border border-[#eceef0] hover:border-[#c6c6cd] bg-white transition-all shadow-sm"
              >
                <img
                  src={hotel.mainImage}
                  alt={hotel.name}
                  className="w-20 h-20 rounded-lg object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectHotel(hotel);
                    onClose();
                  }}
                />
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => {
                          onSelectHotel(hotel);
                          onClose();
                        }}
                        className="font-bold text-[14px] text-[#191c1e] truncate cursor-pointer hover:text-[#006591]"
                      >
                        {hotel.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFavorite(hotel.id)}
                        className="text-[#76777d] hover:text-[#ba1a1a] p-0.5"
                        title="Favorilerden Çıkar"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <span className="text-[12px] text-[#45464d] truncate block">
                      {hotel.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-extrabold text-[15px] text-[#191c1e]">
                      {formatPrice(hotel.pricePerNight, currency)}{' '}
                      <span className="text-[11px] font-normal text-[#76777d]">/ gece</span>
                    </span>
                    <button
                      onClick={() => {
                        onSelectHotel(hotel);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-[#006591] hover:bg-[#004666] text-white text-[12px] font-bold transition-colors"
                    >
                      İncele
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoriteHotels.length > 0 && (
          <div className="p-4 border-t border-[#eceef0] bg-[#f7f9fb] text-center">
            <p className="text-[12px] text-[#76777d]">
              Fiyatlar anlık olarak güncellenmektedir.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
