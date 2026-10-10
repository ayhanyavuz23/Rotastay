import React, { useState } from 'react';
import { Hotel, RoomType, Currency, BookingReservation } from '../types/hotel';
import { formatPrice } from '../utils/formatters';

interface BookingModalProps {
  hotel: Hotel;
  room: RoomType;
  nights: number;
  checkInDate: string;
  checkOutDate: string;
  guestsText: string;
  currency: Currency;
  onClose: () => void;
  onBookingSuccess: (reservation: BookingReservation) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  hotel,
  room,
  nights,
  checkInDate,
  checkOutDate,
  guestsText,
  currency,
  onClose,
  onBookingSuccess,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const [guestName, setGuestName] = useState('Ayşe Yılmaz');
  const [guestEmail, setGuestEmail] = useState('ayse.y@rotastay.com');
  const [guestPhone, setGuestPhone] = useState('+90 532 555 0123');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'hotel'>('card');
  const [cardNumber, setCardNumber] = useState('4543 •••• •••• 8820');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('342');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<BookingReservation | null>(null);

  const rawBaseTotal = room.pricePerNight * nights;
  const discountAmount = Math.round(rawBaseTotal * (discountPercent / 100));
  const finalPrice = Math.max(0, rawBaseTotal - discountAmount);

  const handleApplyPromo = () => {
    const trimmed = promoCode.trim().toUpperCase();
    if (trimmed === 'ROTA2025') {
      setDiscountPercent(10);
      setPromoMessage({ text: '%10 RotaClub Erken Rezervasyon İndirimi uygulandı!' });
    } else if (trimmed === 'YAZ2025') {
      setDiscountPercent(15);
      setPromoMessage({ text: '%15 Yaz Sezonu Özel İndirimi uygulandı!' });
    } else {
      setPromoMessage({ text: 'Geçersiz indirim kodu. ROTA2025 kodunu deneyin.', isError: true });
    }
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newReservation: BookingReservation = {
        id: `ROT-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.mainImage,
        location: hotel.location,
        checkInDate,
        checkOutDate,
        nights,
        guestsText,
        roomName: room.name,
        totalPrice: finalPrice,
        currency,
        status: 'Onaylandı',
        bookingDate: new Date().toLocaleDateString('tr-TR'),
        guestName,
        guestEmail,
        guestPhone,
      };

      setConfirmedReservation(newReservation);
      onBookingSuccess(newReservation);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-[#eceef0] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eceef0] bg-[#f7f9fb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#006591]">
              shield_with_heart
            </span>
            <span className="font-bold text-[16px] text-[#191c1e]">
              {confirmedReservation ? 'Rezervasyon Özeti' : 'Güvenli Rezervasyon Adımı'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {confirmedReservation ? (
          /* Confirmation Success Voucher View */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] font-bold text-[12px] mb-2">
                Rezervasyonunuz Başarıyla Onaylandı
              </span>
              <h2 className="text-[24px] font-bold text-[#191c1e]">İyi Tatiller, {guestName}!</h2>
              <p className="text-[14px] text-[#45464d] mt-1">
                Onay belgeniz ve konaklama voucher'ınız <strong>{guestEmail}</strong> adresine gönderildi.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="p-5 rounded-2xl bg-[#f7f9fb] border border-[#eceef0] text-left space-y-4">
              <div className="flex items-center justify-between border-b border-[#eceef0] pb-3">
                <div>
                  <div className="text-[11px] font-bold text-[#76777d] uppercase tracking-wider">
                    Rezervasyon Kodu
                  </div>
                  <div className="text-[18px] font-extrabold text-[#006591]">
                    {confirmedReservation.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-[#76777d] uppercase tracking-wider">
                    Durum
                  </div>
                  <div className="text-[14px] font-bold text-[#10b981] flex items-center gap-1 justify-end">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Anında Onaylı
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <img
                  src={confirmedReservation.hotelImage}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-[15px] text-[#191c1e]">
                    {confirmedReservation.hotelName}
                  </h4>
                  <p className="text-[13px] text-[#45464d]">{confirmedReservation.location}</p>
                  <p className="text-[12px] font-semibold text-[#006591]">
                    {confirmedReservation.roomName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-[13px] border-t border-[#eceef0]">
                <div>
                  <span className="text-[#76777d] block text-[11px]">Giriş Tarihi</span>
                  <span className="font-bold text-[#191c1e]">{checkInDate} (14:00'ten itibaren)</span>
                </div>
                <div>
                  <span className="text-[#76777d] block text-[11px]">Çıkış Tarihi</span>
                  <span className="font-bold text-[#191c1e]">{checkOutDate} (12:00'ye kadar)</span>
                </div>
                <div>
                  <span className="text-[#76777d] block text-[11px]">Konaklama & Misafir</span>
                  <span className="font-semibold text-[#191c1e]">
                    {nights} Gece · {guestsText}
                  </span>
                </div>
                <div>
                  <span className="text-[#76777d] block text-[11px]">Ödenen Toplam</span>
                  <span className="font-bold text-[#191c1e]">
                    {formatPrice(confirmedReservation.totalPrice, currency)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-[#006591] hover:bg-[#004666] text-white font-bold text-[14px] transition-colors"
              >
                Pencereyi Kapat & Gezinmeye Devam Et
              </button>
            </div>
          </div>
        ) : (
          /* Booking Checkout Form */
          <form onSubmit={handleCompleteBooking} className="p-6 space-y-6">
            {/* Property Brief Summary */}
            <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#f7f9fb] border border-[#eceef0]">
              <img
                src={hotel.mainImage}
                alt=""
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-bold text-[15px] text-[#191c1e] truncate">{hotel.name}</h3>
                <p className="text-[12px] text-[#45464d]">{hotel.location}</p>
                <div className="flex items-center gap-2 text-[12px] text-[#006591] font-semibold mt-0.5">
                  <span>{room.name}</span>
                  <span>·</span>
                  <span>{nights} Gece</span>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div>
              <h4 className="font-bold text-[14px] text-[#191c1e] mb-3">Misafir Bilgileri</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#45464d] block mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd] text-[14px] text-[#191c1e] focus:outline-none focus:border-[#006591]"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#45464d] block mb-1">
                    E-Posta Adresi
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd] text-[14px] text-[#191c1e] focus:outline-none focus:border-[#006591]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[12px] font-semibold text-[#45464d] block mb-1">
                    Telefon Numarası
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd] text-[14px] text-[#191c1e] focus:outline-none focus:border-[#006591]"
                  />
                </div>
              </div>
            </div>

            {/* Promo Code Input */}
            <div>
              <label className="text-[12px] font-semibold text-[#45464d] block mb-1">
                İndirim & Kampanya Kodu (Örn: ROTA2025)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kupon Kodunu Girin"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#c6c6cd] text-[14px] uppercase font-bold text-[#191c1e] focus:outline-none focus:border-[#006591]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 rounded-lg bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] font-bold text-[13px] transition-colors"
                >
                  Kodu Uygula
                </button>
              </div>
              {promoMessage && (
                <div
                  className={`text-[12px] font-medium mt-1.5 ${
                    promoMessage.isError ? 'text-[#ba1a1a]' : 'text-[#10b981]'
                  }`}
                >
                  {promoMessage.text}
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div>
              <h4 className="font-bold text-[14px] text-[#191c1e] mb-3">Ödeme Seçeneği</h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#006591] bg-[#c9e6ff]/20 font-bold'
                      : 'border-[#eceef0] text-[#45464d]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-[14px] text-[#191c1e]">
                    <span className="material-symbols-outlined text-[18px] text-[#006591]">
                      credit_card
                    </span>
                    <span>Kredi / Banka Kartı</span>
                  </div>
                  <span className="text-[11px] text-[#76777d] block mt-0.5">
                    3D Secure ile Güvenli
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('hotel')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'hotel'
                      ? 'border-[#006591] bg-[#c9e6ff]/20 font-bold'
                      : 'border-[#eceef0] text-[#45464d]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-[14px] text-[#191c1e]">
                    <span className="material-symbols-outlined text-[18px] text-[#006591]">
                      hotel
                    </span>
                    <span>Otelde Öde</span>
                  </div>
                  <span className="text-[11px] text-[#76777d] block mt-0.5">Girişte Nakit/Kart</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-xl bg-[#f7f9fb] border border-[#eceef0] space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#76777d] block mb-1">
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white rounded border border-[#c6c6cd] font-mono text-[#191c1e]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#76777d] block mb-1">
                        Son Kullanma
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-[13px] bg-white rounded border border-[#c6c6cd] font-mono text-[#191c1e]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#76777d] block mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 text-[13px] bg-white rounded border border-[#c6c6cd] font-mono text-[#191c1e]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Transparent Pricing Breakdown */}
            <div className="p-4 rounded-xl bg-[#f2f4f6] space-y-2 text-[13px]">
              <div className="flex justify-between text-[#45464d]">
                <span>
                  Oda Tutarı ({nights} gece x {formatPrice(room.pricePerNight, currency)})
                </span>
                <span className="font-semibold text-[#191c1e]">
                  {formatPrice(rawBaseTotal, currency)}
                </span>
              </div>
              <div className="flex justify-between text-[#45464d]">
                <span>Vergiler & Hizmet Bedelleri</span>
                <span className="text-[#10b981] font-semibold">Dahil (%0 Ek Ücret)</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#10b981] font-bold">
                  <span>Kampanya İndirimi (%{discountPercent})</span>
                  <span>-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#e0e3e5] flex justify-between items-baseline font-bold text-[16px] text-[#191c1e]">
                <span>Toplam Ödenecek</span>
                <span className="text-[20px] text-[#006591]">
                  {formatPrice(finalPrice, currency)}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-[#c6c6cd] text-[#191c1e] font-semibold text-[13px] hover:bg-[#f2f4f6]"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-xl bg-[#006591] hover:bg-[#004666] disabled:opacity-50 text-white font-bold text-[15px] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Rezervasyon Onaylanıyor...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check</span>
                    <span>Rezervasyonu Tamamla</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
