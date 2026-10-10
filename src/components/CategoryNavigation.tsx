import React, { useRef } from 'react';
import { VACATION_CATEGORIES } from '../data/hotelsData';

interface CategoryNavigationProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[12px] font-semibold uppercase tracking-wider text-[#006591] block">
            İlham Al
          </span>
          <h2 className="text-[26px] sm:text-[28px] font-bold text-[#191c1e]">
            Tatil Tarzını Seç
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Geri"
            className="w-10 h-10 rounded-full bg-[#eceef0] hover:bg-[#e6e8ea] active:scale-95 flex items-center justify-center text-[#191c1e] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="İleri"
            className="w-10 h-10 rounded-full bg-[#eceef0] hover:bg-[#e6e8ea] active:scale-95 flex items-center justify-center text-[#191c1e] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Category Pill Cards */}
      <div
        ref={containerRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 overflow-x-auto pb-1 scrollbar-none"
      >
        {VACATION_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`group flex flex-col p-4 rounded-xl text-left transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-white ring-2 ring-[#006591] shadow-md border-transparent scale-[1.02]'
                  : 'bg-white shadow-sm hover:shadow-md border-[#eceef0] hover:border-[#c6c6cd]'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${cat.bgColor} flex items-center justify-center ${cat.textColor} mb-3 group-hover:scale-105 transition-transform`}
              >
                <span className="material-symbols-outlined text-[26px]">
                  {cat.icon}
                </span>
              </div>
              <span className="text-[17px] font-bold text-[#191c1e] group-hover:text-[#006591] transition-colors">
                {cat.label}
              </span>
              <span className="text-[13px] text-[#45464d] mt-1 font-normal">
                {cat.subtitle}
              </span>
              {isSelected && (
                <span className="text-[11px] font-bold text-[#006591] mt-2 inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check</span> Seçildi
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
