import { CURRENCY_CONFIGS } from '../data/hotelsData';
import { Currency } from '../types/hotel';

export function formatPrice(amountInTRY: number, currency: Currency): string {
  const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.TRY;
  const converted = amountInTRY * config.rate;

  if (currency === 'TRY') {
    return `₺${Math.round(converted).toLocaleString('tr-TR')}`;
  } else if (currency === 'USD') {
    return `$${Math.round(converted).toLocaleString('en-US')}`;
  } else if (currency === 'EUR') {
    return `€${Math.round(converted).toLocaleString('de-DE')}`;
  } else {
    return `£${Math.round(converted).toLocaleString('en-GB')}`;
  }
}
