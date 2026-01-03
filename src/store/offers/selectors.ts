import { createSelector } from 'reselect';

import { RootState } from '..';
import { SortingType } from '../../const';
import { Offer } from '../../types/offer';
import { sortOffers } from '../../utils/sorts';
import { NearestOffers } from '../../utils/common';

export const selectCity = (state: RootState) => state.offers.city;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectIsOffersLoading = (state: RootState) =>
  state.offers.isOffersLoading;
export const selectOffer = (state: RootState) => state.offers.offer;
export const selectIsOfferLoading = (state: RootState) =>
  state.offers.isOfferLoading;
export const selectOffersNearby = (state: RootState) =>
  state.offers.offersNearby;

export const selectOffersByCity = createSelector(
  selectOffers,
  selectCity,
  (offers, city) =>
    offers.filter((offer) => offer.city.name === city.toString())
);

export const selectSortedOffers = (sortOption: SortingType) =>
  createSelector(selectOffersByCity, (offers) =>
    sortOffers(offers, sortOption)
  );

export const selectOffersNearbyByOffer = (
  offer: Offer | null,
  limit: number = 3
) =>
  createSelector(selectOffersNearby, (offers) => {
    if (!offer) {
      return [];
    }
    return NearestOffers(offers, offer).slice(0, limit);
  });