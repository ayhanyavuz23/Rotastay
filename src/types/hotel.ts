export interface RoomType {
  id: string;
  name: string;
  bedType: string;
  sizeM2: number;
  capacity: string;
  pricePerNight: number;
  features: string[];
  image: string;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  stayType: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  district: string;
  stars: number;
  category: 'Resort' | 'Butik Otel' | 'Şehir Oteli' | 'Doğa Oteli' | 'Termal & Spa';
  badgeType: '5 Yıldız' | 'Butik Otel' | 'Lüks Resort' | 'Tarihi Konak';
  rating: number;
  ratingLabel: 'Mükemmel' | 'Kusursuz' | 'Harika' | 'Fevkalade' | 'Çok İyi';
  reviewsCount: number;
  pricePerNight: number;
  mainImage: string;
  galleryImages: string[];
  tags: string[];
  hasBreakfast: boolean;
  freeCancellation: boolean;
  beachfront: boolean;
  earlyBooking: boolean;
  description: string;
  amenities: string[];
  rooms: RoomType[];
  reviews: Review[];
  distanceToBeach?: string;
  distanceToAirport?: string;
}

export interface Destination {
  id: string;
  name: string;
  propertyCount: number;
  badge: string;
  subtitle: string;
  image: string;
  colSpanDesktop: number; // For Bento layout
  description: string;
  popularDistricts: string[];
}

export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // vs TRY
  label: string;
}

export interface SearchState {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  childAge: number;
  rooms: number;
  selectedQuickFilters: string[];
  categoryFilter: string | null;
  sortOption: 'recommended' | 'priceAsc' | 'priceDesc' | 'ratingDesc';
}

export interface BookingReservation {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestsText: string;
  roomName: string;
  totalPrice: number;
  currency: Currency;
  status: 'Onaylandı' | 'Beklemede';
  bookingDate: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}
