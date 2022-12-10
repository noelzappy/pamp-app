import { api } from '@/Services/api'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getMe: build.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),

    updateMe: build.mutation({
      query: body => ({
        url: '/users/me',
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetMeQuery, useUpdateMeMutation } = userApi
