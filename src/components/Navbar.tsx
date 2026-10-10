import React from 'react';
import { Currency } from '../types/hotel';

interface NavbarProps {
  activeTab: 'oteller' | 'populer-rotalar' | 'kampanyalar' | 'yardim';
  onTabChange: (tab: 'oteller' | 'populer-rotalar' | 'kampanyalar' | 'yardim') => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  currency: Currency;
  onOpenCurrencyModal: () => void;
  onOpenProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  onOpenFavorites,
  currency,
  onOpenCurrencyModal,
  onOpenProfileModal,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eceef0]/60">
      <div className="h-20 max-w-[1320px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand & Main Nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onTabChange('oteller')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <img
              alt="RotaStay Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA99c2RtZGKTI3dXdJb1oUWFoKwJu8Cnj-aGUw7xqWTZfTDKZ6B_wyXdZxPDH3TJ40fEy3Avnc0-zJOgXspoCzPLfoMJhzPmhqWQz67mI2X5vNYI-W_5VzDj_GIwKUwb-2gyVesWXDRjnnvoLT2oFdkpWd79_TqsYy68t2RjPRcsncJSRs7bkQtnbTLljMjMLnrSss1aQHyRaEmrJpUx_V18VZFF84FB5FycOSkEX-LUqy6l8KUZzOW"
            />
            <span className="font-bold text-[22px] tracking-tight text-[#191c1e] group-hover:text-[#006591] transition-colors">
              RotaStay
            </span>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onTabChange('oteller')}
              className={`px-3.5 py-2 transition-all font-semibold text-[14px] rounded-lg ${
                activeTab === 'oteller'
                  ? 'bg-[#eceef0] text-[#191c1e]'
                  : 'text-[#45464d] hover:text-[#191c1e] hover:bg-[#f2f4f6]'
              }`}
            >
              Oteller
            </button>
            <button
              onClick={() => onTabChange('populer-rotalar')}
              className={`px-3.5 py-2 transition-all font-semibold text-[14px] rounded-lg ${
                activeTab === 'populer-rotalar'
                  ? 'bg-[#eceef0] text-[#191c1e]'
                  : 'text-[#45464d] hover:text-[#191c1e] hover:bg-[#f2f4f6]'
              }`}
            >
              Popüler Rotalar
            </button>
            <button
              onClick={() => onTabChange('kampanyalar')}
              className={`px-3.5 py-2 transition-all font-semibold text-[14px] rounded-lg ${
                activeTab === 'kampanyalar'
                  ? 'bg-[#eceef0] text-[#191c1e]'
                  : 'text-[#45464d] hover:text-[#191c1e] hover:bg-[#f2f4f6]'
              }`}
            >
              Kampanyalar
            </button>
            <button
              onClick={() => onTabChange('yardim')}
              className={`px-3.5 py-2 transition-all font-semibold text-[14px] rounded-lg ${
                activeTab === 'yardim'
                  ? 'bg-[#eceef0] text-[#191c1e]'
                  : 'text-[#45464d] hover:text-[#191c1e] hover:bg-[#f2f4f6]'
              }`}
            >
              Yardım
            </button>
          </nav>
        </div>

        {/* Right Action Icons: Favorites, Language/Currency, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Favorites Button with Badge */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#45464d] hover:bg-[#f2f4f6] hover:text-[#191c1e] transition-colors focus:outline-none"
            title="Favori Otelleriniz"
          >
            <span className="material-symbols-outlined text-[20px] text-[#006591]">
              favorite
            </span>
            <span className="hidden sm:inline font-semibold text-[13px]">
              Favoriler
            </span>
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#006591] text-white text-[12px] font-bold leading-none animate-in fade-in">
              {favoritesCount}
            </span>
          </button>

          <div className="h-5 w-px bg-[#e0e3e5] hidden sm:block" />

          {/* Currency / Language Selector */}
          <button
            onClick={onOpenCurrencyModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#45464d] hover:bg-[#f2f4f6] hover:text-[#191c1e] transition-colors font-semibold text-[13px] focus:outline-none"
          >
            <span className="material-symbols-outlined text-[18px]">language</span>
            <span>
              {currency === 'TRY' ? 'TR / ₺' : `${currency} / ${currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'}`}
            </span>
          </button>

          <div className="h-5 w-px bg-[#e0e3e5]" />

          {/* User Profile Pill */}
          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full hover:bg-[#f2f4f6] transition-colors border border-transparent hover:border-[#eceef0] focus:outline-none"
          >
            <img
              alt="Ayşe Y. Profil"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#006591]/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoRcmlNzXzm10kQBI4x0MW7Zo8VdktHaFeKJmY_YvMz0muW0cflGpkbWgruPbsxV-KKpW0iOdp9LDHp-H5A9NZz3ntp3tcE_K4P0KS9MqCKZ69PGyx9LSLhEJHmV-tr0XU23XapA44Kw2CSTOVU995eHExKEDDp-qVRi5bK_BbiBpGQUiL2f4hvvl4jkaHClcRAZx37-0BJbgb3sG3SwdyBSDJSVao3myvjrFhRo_7dgDXFuhlWEB-"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[13px] font-semibold text-[#191c1e] leading-tight">
                Ayşe Y.
              </span>
              <span className="text-[11px] font-medium text-[#006591] leading-tight">
                Gezgin Üye
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
