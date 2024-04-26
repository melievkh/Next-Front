import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { notification } from 'antd';

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

  if (error && error.status === 401) {
    notification.error({
      message: 'Please login again!',
    });
    api.dispatch(authActions.logout());
  }

  if (error && error.status === 'FETCH_ERROR') {
    notification.error({
      message: 'Internal Server Error!',
    });
  }

  if (error && error?.data) {
    notification.error({
      message: error.data?.message,
    });
  }

  return result;
};

export const TagTypes = {
  GET_ME: 'GET_ME',
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_PRODUCT: 'GET_PRODUCT',
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
