import QueryString from 'qs';
import { TagTypes, api } from './api';

const productService = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (q) =>
        `products?${QueryString.stringify(q, {
          skipNulls: true,
          allowDots: false,
          strictNullHandling: true,
        })}`,
      providesTags: [TagTypes.GET_PRODUCTS],
    }),
  }),
});

export const { useGetProductsQuery } = productService;
