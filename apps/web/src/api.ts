import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CatDto } from "@client-rtkquery/dto";

export const catApi = createApi({
    reducerPath: 'cat',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/cats' }),
    tagTypes: ['Cats'],
    endpoints: (builder) => ({
      getAll: builder.query<Array<CatDto>, void>({
        query: () => ``,
        providesTags: ['Cats'],
      }),
      get: builder.query<CatDto, number>({
        query: (id) => `${id}`,
        providesTags: ['Cats'],
      }),
      create: builder.mutation<number, CatDto>({
        query: (cat) => ({
          url: ``,
          body: cat,
          method: 'POST'
        }),
        invalidatesTags: ['Cats']
      }),
      update: builder.mutation<void, CatDto>({
        query: (cat) => ({
          url: `${cat.id}`,
          body: cat,
          method: 'PUT'
        }),
        invalidatesTags: ['Cats']
      }),
      delete: builder.mutation<void, number>({
        query: (message) => ({
          url: `/${message}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Cats']
      })
    }),
  })

  export const { useGetAllQuery, useCreateMutation, useDeleteMutation, useGetQuery, useUpdateMutation } = catApi;