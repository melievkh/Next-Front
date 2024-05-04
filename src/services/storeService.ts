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
    createStore: builder.mutation({
      query: (store) => ({
        url: endpoints.storeCreate,
        method: 'POST',
        body: store,
      }),
      invalidatesTags: [TagTypes.GET_STORES],
    }),
    updateStore: builder.mutation({
      query: (store) => ({
        url: endpoints.storeUpdate(store.id),
        method: 'PATCH',
        body: store,
      }),
      invalidatesTags: [TagTypes.GET_STORES],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetStoresQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
} = storeService;
