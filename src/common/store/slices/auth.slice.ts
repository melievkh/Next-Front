import { createSlice } from '@reduxjs/toolkit';
import { AsyncThunks } from '../thunks';
import { AuthState } from '@/common/types/auth.type';
import { storage } from '@/config/storage.config';

const initialState: AuthState = {
  isLoggedIn: false,
  userId: null,
  role: null,
  error: null,
  pending: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem(storage.ACCESS_TOKEN);
      localStorage.removeItem(storage.REFRESH_TOKEN);
      localStorage.removeItem(storage.USER_ID);
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.login.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(AsyncThunks.login.fulfilled, (state, action) => {
      state.pending = false;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.error = null;
    });
    builder.addCase(AsyncThunks.login.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload;
    });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
