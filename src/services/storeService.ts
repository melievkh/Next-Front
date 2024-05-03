import QueryString from 'qs';
import { TagTypes, api } from './api';
import { endpoints } from './endpoints';

const storeService = api.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: (q) =>
        `store?${QueryString.stringify(q, {
          skipNulls: true,
          allowDots: false,
          strictNullHandling: true,
        })}`,
      providesTags: [TagTypes.GET_STORES],
    }),
    getMe: builder.query({
      query: () => endpoints.me,
      providesTags: [TagTypes.GET_ME],
    }),
  }),
});

export const { useGetMeQuery, useGetStoresQuery } = storeService;
