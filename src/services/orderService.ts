import { TagTypes, api } from './api';
import { endpoints } from './endpoints';

const orderService = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => endpoints.orders,
      providesTags: [TagTypes.GET_ORDERS],
    }),
  }),
});

export const { useGetOrdersQuery } = orderService;
