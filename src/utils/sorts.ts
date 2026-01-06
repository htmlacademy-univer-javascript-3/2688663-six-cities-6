import { OfferPreview } from '../types/offer-preview';
import { SortingType } from '../const';

export function sortOffers(offers: OfferPreview[], sortType: SortingType): OfferPreview[] {
  switch (sortType) {
    case SortingType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);

    case SortingType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);

    case SortingType.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);

    default:
      return offers;
  }
}
