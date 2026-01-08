import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';

import { Review } from '../../types/review';
import { SendReview } from '../../types/send-review';
import { setServerError } from '../error/action';
import { tokenService } from '../../service/token';

export const fetchReviewsByOfferId = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>(
  'reviews/fetchReviewsByOfferId',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`/comments/${offerId}`, {
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
  }
);

export const sendReview = createAsyncThunk<
  Review,
  SendReview,
  { extra: AxiosInstance }
>(
  'reviews/sendReview',
  async ({ offerId, rating, comment }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Review>(
        `/comments/${offerId}`,
        { comment, rating },
        { headers: tokenService.getAuthHeaders() }
      );

      dispatch(setServerError(null));
      return data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        dispatch(setServerError('Сервер недоступен'));
      } else {
        dispatch(setServerError('Не удалось отправить отзыв'));
      }

      return rejectWithValue(null);
    }
  }
);
