import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAsyncThunk, registerAsyncThunk } from './auth.thunk';

export const AsyncThunks = {
  login: createAsyncThunk('auth/login', loginAsyncThunk),
  register: createAsyncThunk('auth/register', registerAsyncThunk),
};
