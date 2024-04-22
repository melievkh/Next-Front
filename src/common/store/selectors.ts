import { RootState } from './rootReducer';

export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getUserId = (state: RootState) => state.auth.userId;
export const getLoginLoading = (state: RootState) => state.auth.pending;
