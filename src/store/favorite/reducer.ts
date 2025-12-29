import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { OfferPreview } from '../../types/offer-preview';
import { fetchFavorites, changeFavoriteStatus } from './action';

export interface FavoritesState {
  favorites: OfferPreview[];
  isFavoritesLoading: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  isFavoritesLoading: false,
};

export const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchFavorites.pending, (state) => {
      state.isFavoritesLoading = true;
    })
    .addCase(
      fetchFavorites.fulfilled,
      (state, action: PayloadAction<OfferPreview[]>) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      }
    )
    .addCase(fetchFavorites.rejected, (state) => {
      state.favorites = [];
      state.isFavoritesLoading = false;
    })
    .addCase(
      changeFavoriteStatus.fulfilled,
      (state, action: PayloadAction<OfferPreview | null>) => {
        if (!action.payload) {
          return;
        }

        const updated = action.payload;

        if (updated.isFavorite) {
          const exists = state.favorites.some(
            (offer) => offer.id === updated.id
          );

          if (!exists) {
            state.favorites.push(updated);
          }
        } else {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== updated.id
          );
        }
      }
    );
});