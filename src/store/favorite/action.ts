import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';

import { OfferPreview } from '../../types/offer-preview';
import { setServerError } from '../error/action';
import { tokenService } from '../../service/token';

export const fetchFavorites = createAsyncThunk<
  OfferPreview[],
  undefined,
  { extra: AxiosInstance }
>('favorite/fetchFavorites', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<OfferPreview[]>('/favorite', {
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

export const changeFavoriteStatus = createAsyncThunk<
  OfferPreview | null,
  { offerId: string; status: 0 | 1 },
  { extra: AxiosInstance }
>(
  'favorite/changeStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<OfferPreview>(
        `/favorite/${offerId}/${status}`,
        {},
        { headers: tokenService.getAuthHeaders() }
      );

      dispatch(setServerError(null));
      return data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      }

      return null;
    }
  }
);
