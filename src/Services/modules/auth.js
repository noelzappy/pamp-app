import { api } from '@/Services/api'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useRegisterMutation } = authApi
