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
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: [TagTypes.GET_PRODUCT],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [TagTypes.GET_PRODUCTS],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: [TagTypes.GET_PRODUCTS, TagTypes.GET_PRODUCT],
    }),
    deleteProduct: builder.mutation({
      query: (ids) => ({
        url: `/products/delete`,
        method: 'POST',
        body: ids,
      }),
      invalidatesTags: [TagTypes.GET_PRODUCTS],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productService;
