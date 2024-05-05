import QueryString from 'qs';
import { TagTypes, api } from './api';
import { endpoints } from './endpoints';

const outfitService = api.injectEndpoints({
  endpoints: (builder) => ({
    getOutfits: builder.query({
      query: (q) =>
        `outfits?${QueryString.stringify(q, {
          skipNulls: true,
          allowDots: false,
          strictNullHandling: true,
        })}`,
      providesTags: [TagTypes.GET_OUTFITS],
    }),
    getOutfit: builder.query({
      query: (id) => endpoints.outfit(id),
      providesTags: [TagTypes.GET_OUTFIT],
    }),
    createOutfit: builder.mutation({
      query: (body) => ({
        url: endpoints.outfitCreate,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TagTypes.GET_OUTFITS],
    }),
    updateOutfit: builder.mutation({
      query: (body) => ({
        url: endpoints.outfitUpdate(body.id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TagTypes.GET_OUTFITS, TagTypes.GET_OUTFIT],
    }),
    deleteOutfit: builder.mutation({
      query: (body) => ({
        url: endpoints.outfitDelete,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TagTypes.GET_OUTFITS],
    }),
    deleteOutfitImage: builder.mutation({
      query: (data) => ({
        url: endpoints.outfitImageDelete,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOutfitsQuery,
  useGetOutfitQuery,
  useCreateOutfitMutation,
  useUpdateOutfitMutation,
  useDeleteOutfitMutation,
  useDeleteOutfitImageMutation,
} = outfitService;
