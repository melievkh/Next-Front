import { TagTypes, api } from './api';
import { endpoints } from './endpoints';

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => endpoints.me,
      providesTags: [TagTypes.GET_ME],
    }),
  }),
});

export const { useGetMeQuery } = userService;
