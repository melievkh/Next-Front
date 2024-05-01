import axiosInstance from '@/common/axios/axiosInstance';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { ApiErrorResponse } from '@/common/types/api.type';
import { endpoints } from '@/services/endpoints';
import { storage } from '@/config/storage.config';
import { LoginParams, LoginResponse } from '@/common/types/auth.type';

export const loginAsyncThunk: AsyncThunkPayloadCreator<
  LoginResponse,
  LoginParams,
  { rejectValue: ApiErrorResponse }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.login, params);

    localStorage.setItem(
      storage.ACCESS_TOKEN,
      response.data.tokens.accessToken,
    );
    localStorage.setItem(
      storage.REFRESH_TOKEN,
      response.data.tokens.refreshToken,
    );
    localStorage.setItem(storage.USER_ID, response.data.userId);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response.data);
  }
};
