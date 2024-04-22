import axiosInstance from '@/axios/axiosInstance';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { ApiErrorResponse } from '@/types/api.type';
import { ENDPOINTS } from '@/services/endpoints';
import { storage } from '@/config/storage.config';
import {
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
} from '@/types/auth.type';

export const loginAsyncThunk: AsyncThunkPayloadCreator<
  LoginResponse,
  LoginParams,
  { rejectValue: ApiErrorResponse }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.login, params);

    localStorage.setItem(storage.ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(storage.USER_ID, response.data.userId);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response.data);
  }
};

export const registerAsyncThunk: AsyncThunkPayloadCreator<
  RegisterResponse,
  RegisterParams,
  { rejectValue: ApiErrorResponse }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.register, params);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response.data);
  }
};
