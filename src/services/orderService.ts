import QueryString from 'qs';

import { TagTypes, api } from './api';
import { endpoints } from './endpoints';

const orderService = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (q) =>
        `orders?${QueryString.stringify(q, {
          skipNulls: true,
          allowDots: false,
          strictNullHandling: true,
        })}`,
      providesTags: [TagTypes.GET_ORDERS],
    }),
    acceptOrder: builder.mutation({
      query: (id) => ({
        url: endpoints.orderAccept(id),
        method: 'PATCH',
      }),
      invalidatesTags: [TagTypes.GET_ORDERS],
    }),
    completeOrder: builder.mutation({
      query: (id) => ({
        url: endpoints.orderComplete(id),
        method: 'PATCH',
      }),
      invalidatesTags: [TagTypes.GET_ORDERS],
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: endpoints.orderCancel(id),
        method: 'PATCH',
      }),
      invalidatesTags: [TagTypes.GET_ORDERS],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAcceptOrderMutation,
  useCompleteOrderMutation,
  useCancelOrderMutation,
} = orderService;
