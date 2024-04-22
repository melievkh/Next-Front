import { TagTypes, api } from './api';

const productService = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (qs) => `products?${qs && new URLSearchParams(qs).toString()}`,
      providesTags: [TagTypes.GET_PRODUCTS],
    }),
  }),
});

export const { useGetProductsQuery } = productService;
