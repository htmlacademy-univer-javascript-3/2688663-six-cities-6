import { OfferPreview } from '../types/offer-preview';

const EARTH_RADIUS_KM = 6371;

function capitalize(str: string) {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}

function addPluralEnding(count: number) {
  return count !== 1 ? 's' : '';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });
  const year = date.getUTCFullYear();

  return `${month} ${year}`;
}

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

function NearestOffers(
  offers: OfferPreview[],
  referenceOffer: OfferPreview
): OfferPreview[] {
  const { latitude, longitude } = referenceOffer.location;

  return offers
    .map((offer) => ({
      ...offer,
      distance: getDistance(
        latitude,
        longitude,
        offer.location.latitude,
        offer.location.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .map((offerWithDistance) => {
      const { distance, ...rest } = offerWithDistance;
      void distance;
      return rest;
    });
}

export {capitalize, addPluralEnding, formatDate, getDistance, NearestOffers};
