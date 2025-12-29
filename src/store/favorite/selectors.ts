import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';
import { OfferPreview } from '../../types/offer-preview';
import { CityName } from '../../const';

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavoritesLoadingStatus = (state: RootState) =>
  state.favorites.isFavoritesLoading;
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.favorites.length;

export const selectIsFavorites = createSelector(
  [selectFavoritesCount],
  (count) => count > 0
);

export const selectGroupedFavorites = createSelector(
  [selectFavorites],
  (favorites): Record<string, OfferPreview[]> => {
    const groupCityOffers: Record<string, OfferPreview[]> = {};

    for (const offer of favorites) {
      const city = offer.city.name;
      if (!groupCityOffers[city]) {
        groupCityOffers[city] = [];
      }
      groupCityOffers[city].push(offer);
    }

    const sortedGroup: Record<string, OfferPreview[]> = {};
    Object.values(CityName).forEach((cityName) => {
      if (groupCityOffers[cityName]) {
        sortedGroup[cityName] = groupCityOffers[cityName];
      }
    });

    return sortedGroup;
  }
);