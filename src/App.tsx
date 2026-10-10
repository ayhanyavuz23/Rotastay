/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { CategoryNavigation } from './components/CategoryNavigation';
import { PopularDestinations } from './components/PopularDestinations';
import { FeaturedHotels } from './components/FeaturedHotels';
import { PromoBanner } from './components/PromoBanner';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { HotelDetailModal } from './components/HotelDetailModal';
import { BookingModal } from './components/BookingModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { CurrencyModal } from './components/CurrencyModal';
import { UserProfileModal } from './components/UserProfileModal';
import { HelpModal } from './components/HelpModal';
import { DestinationsScreen } from './components/DestinationsScreen';
import { CampaignsScreen } from './components/CampaignsScreen';
import { INITIAL_HOTELS } from './data/hotelsData';
import { Hotel, RoomType, Currency, SearchState, BookingReservation } from './types/hotel';

export default function App() {
  const [activeTab, setActiveTab] = useState<'oteller' | 'populer-rotalar' | 'kampanyalar' | 'yardim'>('oteller');
  const [currency, setCurrency] = useState<Currency>('TRY');
  // Initial 3 favorited hotels as pictured in the design
  const [favorites, setFavorites] = useState<string[]>(['hotel-1', 'hotel-2', 'hotel-3']);

  const [searchState, setSearchState] = useState<SearchState>({
    destination: 'Antalya, Türkiye',
    checkInDate: '12 Haz 2025',
    checkOutDate: '17 Haz 2025',
    nights: 5,
    adults: 2,
    children: 1,
    childAge: 5,
    rooms: 1,
    selectedQuickFilters: [],
    categoryFilter: null,
    sortOption: 'recommended',
  });

  // Modal and drawer states
  const [selectedHotelForModal, setSelectedHotelForModal] = useState<Hotel | null>(null);
  const [bookingFlowData, setBookingFlowData] = useState<{ hotel: Hotel; room: RoomType } | null>(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // User confirmed bookings
  const [reservations, setReservations] = useState<BookingReservation[]>([
    {
      id: 'ROT-2025-4192',
      hotelId: 'hotel-1',
      hotelName: 'Akra Riviera Resort & Spa',
      hotelImage: INITIAL_HOTELS[0].mainImage,
      location: 'Lara, Antalya',
      checkInDate: '12 Haz 2025',
      checkOutDate: '17 Haz 2025',
      nights: 5,
      guestsText: '2 Yetişkin, 1 Çocuk',
      roomName: 'Deluxe Deniz Manzaralı Oda',
      totalPrice: 24250,
      currency: 'TRY',
      status: 'Onaylandı',
      bookingDate: '01.05.2025',
      guestName: 'Ayşe Yılmaz',
      guestEmail: 'ayse.y@rotastay.com',
      guestPhone: '+90 532 555 0123',
    },
  ]);

  const handleToggleFavorite = (hotelId: string) => {
    setFavorites((prev) =>
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  const handleSearchChange = (updates: Partial<SearchState>) => {
    setSearchState((prev) => ({ ...prev, ...updates }));
  };

  const handleSelectDestinationFromBento = (destinationName: string) => {
    handleSearchChange({ destination: destinationName });
    setActiveTab('oteller');
    // Smooth scroll down to hotel listing
    setTimeout(() => {
      document.getElementById('hotels-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleExecuteSearch = () => {
    setActiveTab('oteller');
    setTimeout(() => {
      document.getElementById('hotels-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookNow = (hotel: Hotel, room: RoomType) => {
    setSelectedHotelForModal(null);
    setBookingFlowData({ hotel, room });
  };

  const handleBookingSuccess = (newReservation: BookingReservation) => {
    setReservations((prev) => [newReservation, ...prev]);
  };

  // Filtered and sorted hotel listing
  const filteredHotels = useMemo(() => {
    return INITIAL_HOTELS.filter((hotel) => {
      // 1. Destination filter if specified
      if (searchState.destination && searchState.destination.trim() !== '') {
        const query = searchState.destination.toLowerCase().trim();
        const cityMatch = hotel.city.toLowerCase().includes(query) || query.includes(hotel.city.toLowerCase());
        const locationMatch = hotel.location.toLowerCase().includes(query);
        const nameMatch = hotel.name.toLowerCase().includes(query);
        // If query is specifically one city/destination
        const isBroad = query.includes('türkiye') || query === '';
        if (!isBroad && !cityMatch && !locationMatch && !nameMatch) {
          // If searching Antalya, don't show Bodrum unless broadly matched
          const firstWord = query.split(/[\s,]+/)[0];
          if (!hotel.city.toLowerCase().includes(firstWord) && !hotel.location.toLowerCase().includes(firstWord)) {
            return false;
          }
        }
      }

      // 2. Quick filters
      if (searchState.selectedQuickFilters.includes('Kahvaltı Dahil') && !hotel.hasBreakfast) {
        return false;
      }
      if (searchState.selectedQuickFilters.includes('Ücretsiz İptal') && !hotel.freeCancellation) {
        return false;
      }
      if (searchState.selectedQuickFilters.includes('Denize Sıfır') && !hotel.beachfront) {
        return false;
      }
      if (searchState.selectedQuickFilters.includes('Erken Rezervasyon Fırsatları') && !hotel.earlyBooking) {
        return false;
      }

      // 3. Category filter
      if (searchState.categoryFilter) {
        const cat = searchState.categoryFilter;
        if (cat === 'deniz' && !hotel.beachfront && hotel.category !== 'Resort') return false;
        if (cat === 'sehir' && hotel.category !== 'Şehir Oteli') return false;
        if (cat === 'doga' && hotel.category !== 'Doğa Oteli' && hotel.city !== 'Kapadokya') return false;
        if (cat === 'termal' && !hotel.tags.some((t) => t.toLowerCase().includes('spa') || t.toLowerCase().includes('termal'))) return false;
        if (cat === 'butik' && hotel.category !== 'Butik Otel') return false;
      }

      return true;
    }).sort((a, b) => {
      if (searchState.sortOption === 'priceAsc') return a.pricePerNight - b.pricePerNight;
      if (searchState.sortOption === 'priceDesc') return b.pricePerNight - a.pricePerNight;
      if (searchState.sortOption === 'ratingDesc') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [searchState]);

  const favoriteHotels = useMemo(() => {
    return INITIAL_HOTELS.filter((h) => favorites.includes(h.id));
  }, [favorites]);

  const activeFilterSummary = useMemo(() => {
    const parts = [];
    if (searchState.destination && searchState.destination !== 'Antalya, Türkiye') {
      parts.push(`"${searchState.destination}"`);
    }
    if (searchState.selectedQuickFilters.length > 0) {
      parts.push(searchState.selectedQuickFilters.join(', '));
    }
    if (searchState.categoryFilter) {
      parts.push(`Kategori: ${searchState.categoryFilter}`);
    }
    return parts.length > 0 ? `Aktif Filtreler: ${parts.join(' · ')} (${filteredHotels.length} Tesis)` : undefined;
  }, [searchState, filteredHotels.length]);

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col text-[#191c1e] font-sans">
      {/* Top Fixed Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'yardim') {
            setIsHelpModalOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        currency={currency}
        onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-[#f7f9fb] min-h-[calc(100vh-80px)] flex-1">
        {activeTab === 'populer-rotalar' ? (
          <DestinationsScreen
            onSelectDestination={handleSelectDestinationFromBento}
            onBackToHotels={() => setActiveTab('oteller')}
          />
        ) : activeTab === 'kampanyalar' ? (
          <CampaignsScreen onBackToHotels={() => setActiveTab('oteller')} />
        ) : (
          /* Default Discovery Feed */
          <div className="flex flex-col w-full">
            {/* HERO SECTION WITH INTEGRATED SEARCH */}
            <HeroSearch
              searchState={searchState}
              onSearchChange={handleSearchChange}
              onExecuteSearch={handleExecuteSearch}
            />

            {/* TATİL TARZINI SEÇ (Category Navigation) */}
            <CategoryNavigation
              selectedCategory={searchState.categoryFilter}
              onSelectCategory={(catId) => handleSearchChange({ categoryFilter: catId })}
            />

            {/* POPÜLER DESTİNASYONLAR (Asymmetric Bento Destination Grid) */}
            <PopularDestinations
              onSelectDestination={handleSelectDestinationFromBento}
              onViewAllDestinations={() => setActiveTab('populer-rotalar')}
            />

            {/* ÖNE ÇIKAN OTELLER (Featured Hotel Cards Feed) */}
            <FeaturedHotels
              hotels={filteredHotels}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectHotel={(hotel) => setSelectedHotelForModal(hotel)}
              currency={currency}
              sortOption={searchState.sortOption}
              onSortChange={(option) => handleSearchChange({ sortOption: option })}
              activeFilterSummary={activeFilterSummary}
              onClearFilters={() =>
                handleSearchChange({
                  destination: '',
                  selectedQuickFilters: [],
                  categoryFilter: null,
                  sortOption: 'recommended',
                })
              }
            />

            {/* ROTA KAMPANYALARI & AVANTAJLAR BANNER */}
            <PromoBanner />

            {/* NASIL ÇALIŞIR? (3-Step Trust & Clarity Architecture) */}
            <HowItWorks />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectRoute={handleSelectDestinationFromBento}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Hotel Detail View Modal */}
      {selectedHotelForModal && (
        <HotelDetailModal
          hotel={selectedHotelForModal}
          currency={currency}
          nights={searchState.nights}
          onClose={() => setSelectedHotelForModal(null)}
          onBookNow={handleBookNow}
        />
      )}

      {/* Booking Checkout Flow Modal */}
      {bookingFlowData && (
        <BookingModal
          hotel={bookingFlowData.hotel}
          room={bookingFlowData.room}
          nights={searchState.nights}
          checkInDate={searchState.checkInDate}
          checkOutDate={searchState.checkOutDate}
          guestsText={`${searchState.adults} Yetişkin${searchState.children > 0 ? `, ${searchState.children} Çocuk` : ''}`}
          currency={currency}
          onClose={() => setBookingFlowData(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Favorites Slide-over Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favoriteHotels={favoriteHotels}
        onRemoveFavorite={handleToggleFavorite}
        onSelectHotel={(hotel) => setSelectedHotelForModal(hotel)}
        currency={currency}
      />

      {/* Currency Switcher Modal */}
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        currentCurrency={currency}
        onSelectCurrency={(c) => setCurrency(c)}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        reservations={reservations}
        currency={currency}
      />

      {/* Help & Support Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
