import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { CityName } from '../../const';
import { OfferPreview } from '../../types/offer-preview';
import { Offer } from '../../types/offer';
import {
  setCity,
  fetchOffers,
  fetchOfferById,
  fetchNearbyOffers,
} from './action';
import { changeFavoriteStatus } from '../favorite/action';
import { fetchLogout } from '../user/action';

const initialState: {
  city: CityName;
  offers: OfferPreview[];
  isOffersLoading: boolean;
  offer: Offer | null;
  isOfferLoading: boolean;
  offersNearby: OfferPreview[];
} = {
  city: CityName.Paris,
  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  offersNearby: [],
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    })
    .addCase(fetchOfferById.pending, (state) => {
      state.offer = null;
      state.isOfferLoading = true;
    })
    .addCase(
      fetchOfferById.fulfilled,
      (state, action: PayloadAction<Offer | null>) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      }
    )
    .addCase(fetchOfferById.rejected, (state) => {
      state.offer = null;
      state.isOfferLoading = false;
    })
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.offersNearby = [];
    })
    .addCase(
      fetchNearbyOffers.fulfilled,
      (state, action: PayloadAction<OfferPreview[]>) => {
        state.offersNearby = action.payload;
      }
    )
    .addCase(fetchNearbyOffers.rejected, (state) => {
      state.offersNearby = [];
    })
    .addCase(
      changeFavoriteStatus.fulfilled,
      (state, action: PayloadAction<OfferPreview | null>) => {
        if (!action.payload) {
          return;
        }

        const updatedOffer = action.payload;

        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id
            ? { ...offer, isFavorite: updatedOffer.isFavorite }
            : offer
        );

        if (state.offer?.id === updatedOffer.id) {
          state.offer = { ...state.offer, isFavorite: updatedOffer.isFavorite };
        }

        state.offersNearby = state.offersNearby.map((offer) =>
          offer.id === updatedOffer.id
            ? { ...offer, isFavorite: updatedOffer.isFavorite }
            : offer
        );
      }
    )
    .addCase(fetchLogout.fulfilled, (state) => {
      state.offers = state.offers.map((offer) => ({
        ...offer,
        isFavorite: false,
      }));
      if (state.offer) {
        state.offer = { ...state.offer, isFavorite: false };
      }
      state.offersNearby = state.offersNearby.map((offer) => ({
        ...offer,
        isFavorite: false,
      }));
    });
});