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
    getStore: builder.query({
      query: (id) => endpoints.store(id),
      providesTags: [TagTypes.GET_STORE],
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
    deleteStore: builder.mutation({
      query: (id) => ({
        url: endpoints.storeDelete(id),
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.GET_STORES],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: endpoints.storeChangePassword(data.id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [TagTypes.GET_STORE, TagTypes.GET_STORES],
    }),
  }),
});

export const {
  useGetStoreQuery,
  useGetStoresQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
  useChangePasswordMutation,
} = storeService;
