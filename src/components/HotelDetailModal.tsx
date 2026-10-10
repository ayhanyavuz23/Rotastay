import React, { useState } from 'react';
import { Hotel, RoomType, Currency } from '../types/hotel';
import { formatPrice } from '../utils/formatters';

interface HotelDetailModalProps {
  hotel: Hotel;
  currency: Currency;
  nights: number;
  onClose: () => void;
  onBookNow: (hotel: Hotel, selectedRoom: RoomType) => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({
  hotel,
  currency,
  nights,
  onClose,
  onBookNow,
}) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(hotel.rooms[0]);

  const photos = hotel.galleryImages.length > 0 ? hotel.galleryImages : [hotel.mainImage];
  const totalStayPrice = selectedRoom.pricePerNight * nights;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-[#eceef0] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eceef0] bg-[#f7f9fb]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#131b2e] text-white text-[12px] font-semibold">
              {hotel.badgeType}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#006591]">
                location_on
              </span>
              <span className="text-[13px] font-semibold text-[#45464d]">
                {hotel.location}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Gallery */}
          <div>
            <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-[#eceef0]">
              <img
                src={photos[selectedPhotoIdx]}
                alt={hotel.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[12px] font-semibold">
                {selectedPhotoIdx + 1} / {photos.length}
              </div>
            </div>

            {/* Thumbnail row */}
            {photos.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      selectedPhotoIdx === idx
                        ? 'border-[#006591] scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Rating Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f2f4f6]">
            <div>
              <h2 className="text-[26px] font-bold text-[#191c1e]">{hotel.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[13px] text-[#76777d]">
                  {hotel.reviewsCount} değerlendirme
                </span>
                <span className="text-[#c6c6cd]">·</span>
                <span className="text-[13px] font-semibold text-[#006591]">
                  Doğrulanmış RotaStay Partneri
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <div className="text-[14px] font-bold text-[#191c1e]">
                  {hotel.ratingLabel}
                </div>
                <div className="text-[12px] text-[#76777d]">Misafir Değerlendirmesi</div>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#131b2e] text-white font-extrabold text-[20px]">
                {hotel.rating.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[16px] font-bold text-[#191c1e] mb-2">Tesis Hakkında</h3>
            <p className="text-[14px] text-[#45464d] leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="text-[16px] font-bold text-[#191c1e] mb-3">Öne Çıkan Ayrıcalıklar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {hotel.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#f7f9fb] text-[13px] font-medium text-[#191c1e]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#006591]">
                    check_circle
                  </span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rooms Selection */}
          <div>
            <h3 className="text-[16px] font-bold text-[#191c1e] mb-3">Oda Seçenekleri</h3>
            <div className="space-y-3">
              {hotel.rooms.map((room) => {
                const isSelected = selectedRoom.id === room.id;

                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-[#006591] bg-[#f2f4f6]/50 shadow-sm'
                        : 'border-[#eceef0] hover:border-[#c6c6cd] bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[15px] text-[#191c1e]">
                          {room.name}
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#006591] text-white">
                            Seçilen Oda
                          </span>
                        )}
                      </div>
                      <div className="text-[13px] text-[#45464d] flex items-center gap-3">
                        <span>{room.bedType}</span>
                        <span>·</span>
                        <span>{room.sizeM2} m²</span>
                        <span>·</span>
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {room.features.map((f, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded bg-[#eceef0] text-[#45464d]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[18px] font-bold text-[#191c1e]">
                        {formatPrice(room.pricePerNight, currency)}
                        <span className="text-[12px] font-normal text-[#76777d]"> / gece</span>
                      </div>
                      <div className="text-[12px] text-[#006591] font-semibold">
                        {nights} gece için: {formatPrice(room.pricePerNight * nights, currency)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guest Reviews Section */}
          <div>
            <h3 className="text-[16px] font-bold text-[#191c1e] mb-3">
              Gerçek Misafir Deneyimleri ({hotel.reviews.length})
            </h3>
            <div className="space-y-3">
              {hotel.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-[#f7f9fb] border border-[#eceef0]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#131b2e] text-white text-[12px] font-bold flex items-center justify-center">
                        {rev.author.charAt(0)}
                      </div>
                      <span className="font-bold text-[13px] text-[#191c1e]">{rev.author}</span>
                      <span className="text-[12px] text-[#76777d]">({rev.stayType})</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-[13px] text-[#006591]">
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span>{rev.rating}/10</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#45464d] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Bar */}
        <div className="px-6 py-4 bg-white border-t border-[#eceef0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[12px] text-[#76777d]">
              Toplam Tutar ({nights} Gece, Vergiler & Hizmet Dahil)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-[24px] font-extrabold text-[#191c1e]">
                {formatPrice(totalStayPrice, currency)}
              </span>
              <span className="text-[12px] font-semibold text-[#006591]">
                Şeffaf Fiyat Garantisi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-[#c6c6cd] text-[#191c1e] font-semibold text-[13px] hover:bg-[#f2f4f6] transition-colors"
            >
              Kapat
            </button>
            <button
              onClick={() => onBookNow(hotel, selectedRoom)}
              className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[#006591] hover:bg-[#004666] text-white font-bold text-[14px] shadow-md transition-all cursor-pointer active:scale-95"
            >
              Odayı Rezerve Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
