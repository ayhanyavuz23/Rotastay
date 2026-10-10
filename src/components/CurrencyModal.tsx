import React from 'react';
import { Currency } from '../types/hotel';
import { CURRENCY_CONFIGS } from '../data/hotelsData';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  onSelectCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#eceef0]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eceef0] bg-[#f7f9fb]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#006591]">
              currency_exchange
            </span>
            <h3 className="font-bold text-[16px] text-[#191c1e]">Para Birimi Seçimi</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eceef0] hover:bg-[#e0e3e5] flex items-center justify-center text-[#191c1e] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-2">
          {Object.entries(CURRENCY_CONFIGS).map(([code, config]) => {
            const isSelected = currentCurrency === code;

            return (
              <button
                key={code}
                onClick={() => {
                  onSelectCurrency(code as Currency);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-[#006591] bg-[#c9e6ff]/20 font-bold'
                    : 'border-[#eceef0] hover:bg-[#f2f4f6]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#eceef0] font-extrabold text-[15px] flex items-center justify-center text-[#006591]">
                    {config.symbol}
                  </span>
                  <div className="text-left">
                    <div className="text-[14px] text-[#191c1e] font-semibold">{config.label}</div>
                    <div className="text-[11px] text-[#76777d]">{config.code}</div>
                  </div>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-[20px] text-[#006591]">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-[#f7f9fb] border-t border-[#eceef0] text-center">
          <p className="text-[12px] text-[#76777d]">
            Fiyatlar anlık TCMB gösterge kurları ile dönüştürülmektedir.
          </p>
        </div>
      </div>
    </div>
  );
};
