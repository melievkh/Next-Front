import { createSlice } from '@reduxjs/toolkit';
import { AsyncThunks } from '../thunks';
import { AuthState } from '@/common/types/auth.type';

const initialState: AuthState = {
  isLoggedIn: false,
  userId: null,
  error: null,
  pending: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
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
