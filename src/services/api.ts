import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import { authActions } from '@/common/store/slices/auth.slice';
import { config } from '@/config/app.config';
import { storage } from '@/config/storage.config';

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(storage.ACCESS_TOKEN);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  const error = result.error;

  if ((error && error.status === 401) || error?.status === 500) {
    api.dispatch(authActions.logout());
    window.location.href = '/login';
  }

  if (error && error?.data) {
    toast('Error!', {
      duration: 3000,
      description: error.data.message,
    });
  }

  return result;
};

export const TagTypes = {
  GET_ME: 'GET_ME',
  GET_PRODUCTS: 'GET_PRODUCTS',
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDashboardAnalyticsData: builder.query({
      query: () => '/dashboard-analytics',
    }),
  }),
  tagTypes: Object.values(TagTypes) as string[],
});

export const { useGetDashboardAnalyticsDataQuery } = api;
