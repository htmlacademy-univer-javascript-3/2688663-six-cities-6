import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';

import { CityName } from '../../const';
import { Offer } from '../../types/offer';
import { OfferPreview } from '../../types/offer-preview';
import { setServerError } from '../error/action';
import { tokenService } from '../../service/token';

export const setCity = createAction<CityName>('city/setCity');

export const fetchOffers = createAsyncThunk<
  OfferPreview[],
  undefined,
  { extra: AxiosInstance }
>('offers/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<OfferPreview[]>('/offers', {
      headers: tokenService.getAuthHeaders(),
    });

    dispatch(setServerError(null));
    return data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      dispatch(setServerError('Сервер недоступен'));
    }

    return [];
  }
});

export const fetchOfferById = createAsyncThunk<
  Offer | null,
  string,
  { extra: AxiosInstance }
>('offer/fetchOfferById', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer>(`/offers/${offerId}`, {
      headers: tokenService.getAuthHeaders(),
    });

    dispatch(setServerError(null));
    return data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      dispatch(setServerError('Сервер недоступен'));
    } else if (error.response.status === 404) {
      return null;
    }

    return null;
  }
});

export const fetchNearbyOffers = createAsyncThunk<
  OfferPreview[],
  string,
  { extra: AxiosInstance }
>('offer/fetchNearbyOffers', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`, {
      headers: tokenService.getAuthHeaders(),
    });

    dispatch(setServerError(null));
    return data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      dispatch(setServerError('Сервер недоступен'));
    }

    return [];
  }
});