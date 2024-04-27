import QueryString from 'qs';
import { TagTypes, api } from './api';
import { endpoints } from './endpoints';

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
      query: (id) => endpoints.product(id),
      providesTags: [TagTypes.GET_PRODUCT],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: endpoints.productCreate,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [TagTypes.GET_PRODUCTS],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: endpoints.productUpdate(product._id),
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: [TagTypes.GET_PRODUCTS, TagTypes.GET_PRODUCT],
    }),
    deleteProduct: builder.mutation({
      query: (ids) => ({
        url: endpoints.productDelete,
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
