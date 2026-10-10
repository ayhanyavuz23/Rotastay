import React, { useState, useRef, useEffect } from 'react';
import { SearchState } from '../types/hotel';

interface HeroSearchProps {
  searchState: SearchState;
  onSearchChange: (newState: Partial<SearchState>) => void;
  onExecuteSearch: () => void;
}

const DESTINATION_SUGGESTIONS = [
  { city: 'Antalya, Türkiye', subtitle: 'Lara, Belek, Kemer, Kaş (1.420 Tesis)' },
  { city: 'Bodrum, Muğla', subtitle: 'Yalıkavak, Türkbükü, Gümüşlük (850 Tesis)' },
  { city: 'Kapadokya, Nevşehir', subtitle: 'Göreme, Uçhisar, Ürgüp (390 Tesis)' },
  { city: 'İstanbul, Türkiye', subtitle: 'Beşiktaş, Boğaz, Tarihi Yarımada (2.180 Tesis)' },
  { city: 'Fethiye & Göcek, Muğla', subtitle: 'Ölüdeniz, Göcek Koyu, Faralya (610 Tesis)' },
  { city: 'Çeşme & Alaçatı, İzmir', subtitle: 'Alaçatı Taş Evleri, Ilıca Plajı (480 Tesis)' },
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchState,
  onSearchChange,
  onExecuteSearch,
}) => {
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleFilter = (filterName: string) => {
    const current = [...searchState.selectedQuickFilters];
    const exists = current.includes(filterName);
    const updated = exists ? current.filter((f) => f !== filterName) : [...current, filterName];
    onSearchChange({ selectedQuickFilters: updated });
  };

  return (
    <section className="relative w-full -mt-20 overflow-visible">
      {/* Immersive Turkish Riviera Visual Background */}
      <div
        className="w-full min-h-[680px] lg:min-h-[740px] bg-cover bg-center flex flex-col justify-between relative transition-all duration-700"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBY4USaSjtMR0iY0aTWn15epHjvK09TTKVzBKS3Z3Rm7gYUCBt9uybEmUAr7uP4ihjd3DGAzu1CVLwQpHAB2__VkOspt5pxmSNBxE6sfFTMEf6fsMnuzd-Q3dDa-_NVT9KSb-t7BxxcwsvlpucLf2fcYnurCSz6b_I8hDXeyO6M6izxdIIQbmqyQuVjU6Is2ylYPG7KmHEcNhtHliMpjM3TmNg8q46Svhd4cB-Ik6weap6lUzuXseGT')`,
        }}
      >
        {/* Gradient Scrim for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131b2e]/85 via-[#131b2e]/45 to-[#f7f9fb] pointer-events-none" />

        {/* Hero Header Content */}
        <div className="relative z-10 max-w-[1320px] w-full mx-auto px-6 lg:px-12 pt-36 lg:pt-44 pb-12 flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[#f7f9fb] text-[13px] font-semibold shadow-sm border border-white/20">
            <span className="material-symbols-outlined text-[16px] text-[#71f8e4]">verified</span>
            <span>Türkiye'nin 12.000+ Doğrulanmış Butik ve Resort Oteli</span>
          </div>

          <h1 className="font-extrabold text-[36px] sm:text-[46px] lg:text-[56px] text-white max-w-3xl tracking-tight leading-[1.15] drop-shadow-sm">
            Bir sonraki güzel anın için yerini ayır.
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[#e0e3e5] max-w-2xl leading-relaxed font-normal">
            Şehir kaçamaklarından sahil tatillerine, berrak koyların huzurundan tarihi konaklara kadar sana en uygun konaklamayı keşfet.
          </p>
        </div>

        {/* Floating Search Bar Module */}
        <div className="relative z-30 max-w-[1320px] w-full mx-auto px-6 lg:px-12 pb-8 lg:pb-12">
          <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(19,27,46,0.12)] p-3 lg:p-4 border border-[#e0e3e5]/60 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-3 items-center">
              
              {/* Destination Input Field */}
              <div ref={destRef} className="lg:col-span-4 relative">
                <div
                  onClick={() => setShowDestDropdown(!showDestDropdown)}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-[#f2f4f6] hover:bg-[#eceef0] transition-colors cursor-pointer group border border-transparent hover:border-[#c6c6cd]/50"
                >
                  <span className="material-symbols-outlined text-[24px] text-[#006591] shrink-0">
                    location_on
                  </span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[12px] font-semibold text-[#45464d]">
                      Nereye gidiyorsunuz?
                    </span>
                    <input
                      className="bg-transparent font-semibold text-[16px] text-[#191c1e] focus:outline-none w-full cursor-pointer placeholder:text-[#76777d]"
                      placeholder="Şehir, bölge veya otel adı..."
                      type="text"
                      value={searchState.destination}
                      onChange={(e) => {
                        onSearchChange({ destination: e.target.value });
                        setShowDestDropdown(true);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDestDropdown(true);
                      }}
                    />
                  </div>
                  {searchState.destination && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSearchChange({ destination: '' });
                      }}
                      className="text-[#76777d] hover:text-[#191c1e] p-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>

                {/* Destination Suggestions Popover */}
                {showDestDropdown && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full md:w-96 bg-white rounded-xl shadow-2xl border border-[#eceef0] p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#76777d] uppercase tracking-wider">
                      Popüler Rotalar
                    </div>
                    {DESTINATION_SUGGESTIONS.map((item) => (
                      <button
                        key={item.city}
                        type="button"
                        onClick={() => {
                          onSearchChange({ destination: item.city });
                          setShowDestDropdown(false);
                        }}
                        className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#f2f4f6] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px] text-[#006591] mt-0.5">
                          travel_explore
                        </span>
                        <div>
                          <div className="text-[14px] font-semibold text-[#191c1e]">
                            {item.city}
                          </div>
                          <div className="text-[12px] text-[#76777d]">{item.subtitle}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Range Selector */}
              <div ref={dateRef} className="lg:col-span-4 relative">
                <div
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-[#f2f4f6] hover:bg-[#eceef0] transition-colors cursor-pointer group border border-transparent hover:border-[#c6c6cd]/50"
                >
                  <span className="material-symbols-outlined text-[24px] text-[#006591] shrink-0">
                    calendar_month
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-semibold text-[#45464d]">
                      Giriş - Çıkış Tarihi
                    </span>
                    <div className="flex items-center gap-1.5 font-semibold text-[15px] text-[#191c1e] truncate">
                      <span>{searchState.checkInDate}</span>
                      <span className="text-[#c6c6cd]">–</span>
                      <span>{searchState.checkOutDate}</span>
                      <span className="ml-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#c9e6ff] text-[#001e2f]">
                        {searchState.nights} Gece
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date Selection Dropdown */}
                {showDateDropdown && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full sm:w-80 bg-white rounded-xl shadow-2xl border border-[#eceef0] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="text-[14px] font-bold text-[#191c1e] mb-3 flex items-center justify-between">
                      <span>Konaklama Süresi</span>
                      <span className="text-[12px] text-[#006591] font-semibold">
                        {searchState.nights} Gece Seçildi
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[12px] font-semibold text-[#45464d] block mb-1">
                          Giriş Tarihi
                        </label>
                        <select
                          value={searchState.checkInDate}
                          onChange={(e) => onSearchChange({ checkInDate: e.target.value })}
                          className="w-full px-3 py-2 text-[14px] bg-[#f2f4f6] border border-[#e0e3e5] rounded-lg font-medium text-[#191c1e] focus:outline-none"
                        >
                          <option value="12 Haz 2025">12 Haz 2025 (Perşembe)</option>
                          <option value="15 Haz 2025">15 Haz 2025 (Pazar)</option>
                          <option value="20 Haz 2025">20 Haz 2025 (Cuma)</option>
                          <option value="01 Tem 2025">01 Tem 2025 (Salı)</option>
                          <option value="15 Tem 2025">15 Tem 2025 (Salı)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[12px] font-semibold text-[#45464d] block mb-1">
                          Çıkış Tarihi
                        </label>
                        <select
                          value={searchState.checkOutDate}
                          onChange={(e) => onSearchChange({ checkOutDate: e.target.value })}
                          className="w-full px-3 py-2 text-[14px] bg-[#f2f4f6] border border-[#e0e3e5] rounded-lg font-medium text-[#191c1e] focus:outline-none"
                        >
                          <option value="17 Haz 2025">17 Haz 2025 (Salı - 5 Gece)</option>
                          <option value="19 Haz 2025">19 Haz 2025 (Perşembe - 7 Gece)</option>
                          <option value="22 Haz 2025">22 Haz 2025 (Pazar - 10 Gece)</option>
                          <option value="07 Tem 2025">07 Tem 2025 (Pazartesi - 6 Gece)</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[12px] text-[#76777d]">Esnek İptal Dahil</span>
                        <button
                          type="button"
                          onClick={() => setShowDateDropdown(false)}
                          className="px-4 py-1.5 rounded-lg bg-[#006591] text-white text-[12px] font-semibold hover:bg-[#004666] transition-colors"
                        >
                          Tamam
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Guests & Room Selector */}
              <div ref={guestRef} className="lg:col-span-4 relative">
                <div
                  onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-[#f2f4f6] hover:bg-[#eceef0] transition-colors cursor-pointer border border-transparent hover:border-[#c6c6cd]/50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="material-symbols-outlined text-[24px] text-[#006591] shrink-0">
                      group
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-semibold text-[#45464d]">
                        Misafir & Oda
                      </span>
                      <div className="flex items-center gap-2 font-semibold text-[15px] text-[#191c1e] truncate">
                        <span>
                          {searchState.adults} Yetişkin
                          {searchState.children > 0 ? `, ${searchState.children} Çocuk` : ''}
                        </span>
                        <span className="text-[#c6c6cd]">·</span>
                        <span>{searchState.rooms} Oda</span>
                      </div>
                    </div>
                  </div>
                  {searchState.children > 0 && (
                    <span className="shrink-0 px-2 py-1 rounded-md bg-[#e0e3e5] text-[#191c1e] text-[12px] font-semibold">
                      {searchState.childAge} yaş
                    </span>
                  )}
                </div>

                {/* Guest Customizer Popover */}
                {showGuestDropdown && (
                  <div className="absolute top-[calc(100%+8px)] right-0 w-full sm:w-80 bg-white rounded-xl shadow-2xl border border-[#eceef0] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="text-[14px] font-bold text-[#191c1e] mb-3">
                      Misafir ve Oda Tercihleri
                    </div>

                    {/* Adults */}
                    <div className="flex items-center justify-between py-2 border-b border-[#f2f4f6]">
                      <div>
                        <div className="text-[14px] font-semibold text-[#191c1e]">Yetişkin</div>
                        <div className="text-[11px] text-[#76777d]">13 yaş ve üzeri</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={searchState.adults <= 1}
                          onClick={() =>
                            onSearchChange({ adults: Math.max(1, searchState.adults - 1) })
                          }
                          className="w-8 h-8 rounded-full bg-[#f2f4f6] hover:bg-[#e0e3e5] disabled:opacity-30 text-[#191c1e] font-bold flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold text-[14px] min-w-[16px] text-center">
                          {searchState.adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSearchChange({ adults: searchState.adults + 1 })}
                          className="w-8 h-8 rounded-full bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#191c1e] font-bold flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between py-2 border-b border-[#f2f4f6]">
                      <div>
                        <div className="text-[14px] font-semibold text-[#191c1e]">Çocuk</div>
                        <div className="text-[11px] text-[#76777d]">0-12 yaş</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={searchState.children <= 0}
                          onClick={() =>
                            onSearchChange({ children: Math.max(0, searchState.children - 1) })
                          }
                          className="w-8 h-8 rounded-full bg-[#f2f4f6] hover:bg-[#e0e3e5] disabled:opacity-30 text-[#191c1e] font-bold flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold text-[14px] min-w-[16px] text-center">
                          {searchState.children}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSearchChange({ children: searchState.children + 1 })}
                          className="w-8 h-8 rounded-full bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#191c1e] font-bold flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Child Age if child > 0 */}
                    {searchState.children > 0 && (
                      <div className="flex items-center justify-between py-2 border-b border-[#f2f4f6]">
                        <div className="text-[13px] font-semibold text-[#45464d]">Çocuk Yaşı</div>
                        <select
                          value={searchState.childAge}
                          onChange={(e) => onSearchChange({ childAge: Number(e.target.value) })}
                          className="px-2.5 py-1 text-[13px] bg-[#f2f4f6] rounded border border-[#e0e3e5] font-semibold"
                        >
                          {Array.from({ length: 13 }).map((_, i) => (
                            <option key={i} value={i}>
                              {i} yaş
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Rooms */}
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <div className="text-[14px] font-semibold text-[#191c1e]">Oda Sayısı</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={searchState.rooms <= 1}
                          onClick={() =>
                            onSearchChange({ rooms: Math.max(1, searchState.rooms - 1) })
                          }
                          className="w-8 h-8 rounded-full bg-[#f2f4f6] hover:bg-[#e0e3e5] disabled:opacity-30 text-[#191c1e] font-bold flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold text-[14px] min-w-[16px] text-center">
                          {searchState.rooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSearchChange({ rooms: searchState.rooms + 1 })}
                          className="w-8 h-8 rounded-full bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#191c1e] font-bold flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowGuestDropdown(false)}
                      className="mt-3 w-full py-2 bg-[#006591] hover:bg-[#004666] text-white text-[13px] font-semibold rounded-lg transition-colors"
                    >
                      Uygula
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Filters & Primary Search CTA Trigger */}
            <div className="mt-3 pt-3 flex flex-col lg:flex-row items-center justify-between gap-4 border-t border-[#f2f4f6]">
              {/* Quick Chips */}
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none">
                <span className="text-[12px] font-semibold text-[#45464d] hidden xl:inline shrink-0">
                  Hızlı Filtre:
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleFilter('Kahvaltı Dahil')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer ${
                    searchState.selectedQuickFilters.includes('Kahvaltı Dahil')
                      ? 'bg-[#006591] text-white shadow-sm'
                      : 'bg-[#f2f4f6] hover:bg-[#c9e6ff] text-[#191c1e]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[16px] ${
                    searchState.selectedQuickFilters.includes('Kahvaltı Dahil') ? 'text-white' : 'text-[#006591]'
                  }`}>
                    restaurant
                  </span>
                  Kahvaltı Dahil
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleFilter('Ücretsiz İptal')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer ${
                    searchState.selectedQuickFilters.includes('Ücretsiz İptal')
                      ? 'bg-[#006591] text-white shadow-sm'
                      : 'bg-[#f2f4f6] hover:bg-[#c9e6ff] text-[#191c1e]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[16px] ${
                    searchState.selectedQuickFilters.includes('Ücretsiz İptal') ? 'text-white' : 'text-[#006591]'
                  }`}>
                    event_available
                  </span>
                  Ücretsiz İptal
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleFilter('Denize Sıfır')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer ${
                    searchState.selectedQuickFilters.includes('Denize Sıfır')
                      ? 'bg-[#006591] text-white shadow-sm'
                      : 'bg-[#f2f4f6] hover:bg-[#c9e6ff] text-[#191c1e]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[16px] ${
                    searchState.selectedQuickFilters.includes('Denize Sıfır') ? 'text-white' : 'text-[#006591]'
                  }`}>
                    water
                  </span>
                  Denize Sıfır
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleFilter('Erken Rezervasyon Fırsatları')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer ${
                    searchState.selectedQuickFilters.includes('Erken Rezervasyon Fırsatları')
                      ? 'bg-[#006591] text-white shadow-sm'
                      : 'bg-[#c9e6ff] text-[#001e2f] hover:bg-[#89ceff]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[16px] ${
                    searchState.selectedQuickFilters.includes('Erken Rezervasyon Fırsatları') ? 'text-white' : 'text-[#006591]'
                  }`}>
                    percent
                  </span>
                  Erken Rezervasyon Fırsatları
                </button>
              </div>

              {/* Prominent Booking Search Button */}
              <button
                type="button"
                onClick={onExecuteSearch}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#006591] hover:bg-[#004666] text-white font-semibold text-[14px] shadow-md hover:shadow-lg transition-all shrink-0 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Otel Ara</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
