import React, { useState } from 'react';
import { BookingReservation, Currency } from '../types/hotel';
import { formatPrice } from '../utils/formatters';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: BookingReservation[];
  currency: Currency;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  reservations,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'reservations'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#eceef0] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eceef0] bg-[#f7f9fb]">
          <h3 className="font-bold text-[16px] text-[#191c1e]">Üye Hesabı & RotaClub</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eceef0] hover:bg-[#e0e3e5] flex items-center justify-center text-[#191c1e] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="p-6 border-b border-[#f2f4f6] flex items-center gap-4">
          <img
            alt="Ayşe Y."
            className="w-16 h-16 rounded-full object-cover ring-4 ring-[#c9e6ff]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoRcmlNzXzm10kQBI4x0MW7Zo8VdktHaFeKJmY_YvMz0muW0cflGpkbWgruPbsxV-KKpW0iOdp9LDHp-H5A9NZz3ntp3tcE_K4P0KS9MqCKZ69PGyx9LSLhEJHmV-tr0XU23XapA44Kw2CSTOVU995eHExKEDDp-qVRi5bK_BbiBpGQUiL2f4hvvl4jkaHClcRAZx37-0BJbgb3sG3SwdyBSDJSVao3myvjrFhRo_7dgDXFuhlWEB-"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] font-bold text-[#191c1e]">Ayşe Yılmaz</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#c9e6ff] text-[#001e2f] text-[11px] font-bold">
                Gezgin Üye
              </span>
            </div>
            <p className="text-[13px] text-[#45464d]">ayse.y@rotastay.com · +90 532 555 0123</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#006591]">
                toll
              </span>
              <span className="text-[13px] font-bold text-[#006591]">
                1.450 RotaClub Puanı (₺1.450 İndirim Değeri)
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#eceef0] px-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 font-bold text-[14px] border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-[#006591] text-[#006591]'
                : 'border-transparent text-[#76777d] hover:text-[#191c1e]'
            }`}
          >
            Ayrıcalıklar & Avantajlar
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-3 px-4 font-bold text-[14px] border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'reservations'
                ? 'border-[#006591] text-[#006591]'
                : 'border-transparent text-[#76777d] hover:text-[#191c1e]'
            }`}
          >
            <span>Rezervasyonlarım</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#eceef0] text-[11px] text-[#191c1e]">
              {reservations.length}
            </span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto max-h-80">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f7f9fb] border border-[#eceef0] space-y-3">
                <h4 className="font-bold text-[14px] text-[#191c1e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#006591]">
                    verified
                  </span>
                  Gezgin Üye Ayrıcalıklarınız
                </h4>
                <ul className="text-[13px] text-[#45464d] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006591]" />
                    Her rezervasyonda net tutarın %10'u kadar nakit puan kazanımı
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006591]" />
                    Müsaitlik doğrultusunda 2 saat erken giriş ve geç çıkış imkanı
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006591]" />
                    Özel müşteri temsilcisi ile öncelikli 7/24 VIP destek hattı
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#c9e6ff]/30 border border-[#89ceff]/50 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-bold text-[#001e2f]">Kayıtlı Kupon</div>
                  <div className="text-[12px] text-[#004c6e]">ROTA2025 (%10 İndirim Kodu)</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#006591] text-white text-[11px] font-bold">
                  Aktif
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {reservations.length === 0 ? (
                <div className="py-8 text-center text-[#76777d]">
                  <p className="text-[14px]">Henüz onaylanmış bir rezervasyonunuz yok.</p>
                </div>
              ) : (
                reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl border border-[#eceef0] bg-[#f7f9fb] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-extrabold text-[#006591]">{res.id}</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#10b981]/15 text-[#10b981]">
                        {res.status}
                      </span>
                    </div>
                    <div className="font-bold text-[15px] text-[#191c1e]">{res.hotelName}</div>
                    <div className="text-[12px] text-[#45464d]">
                      {res.checkInDate} – {res.checkOutDate} ({res.nights} Gece)
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-[#eceef0] text-[13px]">
                      <span className="text-[#76777d]">{res.roomName}</span>
                      <span className="font-bold text-[#191c1e]">
                        {formatPrice(res.totalPrice, currency)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
