import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CatDto } from "@client-rtkquery/dto";

export const catApi = createApi({
    reducerPath: 'cat',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/cats' }),
    endpoints: (builder) => ({
      getAll: builder.query<Array<CatDto>, void>({
        query: () => ``,
      }),
      get: builder.query<CatDto, number>({
        query: (id) => `${id}`,
      }),
      create: builder.mutation<number, CatDto>({
        query: (cat) => ({
          url: ``,
          body: cat,
          method: 'POST'
        }),
        
      }),
      update: builder.mutation<void, CatDto>({
        query: (cat) => ({
          url: `${cat.id}`,
          body: cat,
          method: 'PUT'
        })
      }),
      delete: builder.mutation<void, number>({
        query: (message) => ({
          url: `/${message}`,
          method: 'DELETE'
        }),
        
      })
    }),
  })

  export const { useGetAllQuery, useCreateMutation, useDeleteMutation, useGetQuery, useUpdateMutation } = catApi;