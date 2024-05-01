import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAsyncThunk } from './auth.thunk';

export const AsyncThunks = {
  login: createAsyncThunk('auth/login', loginAsyncThunk),
};
