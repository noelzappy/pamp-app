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

    sendEmailVerification: build.mutation({
      query: () => ({
        url: '/auth/resend-verification-email',
        method: 'POST',
      }),
    }),

    sendPhoneVerification: build.mutation({
      query: () => ({
        url: '/auth/resend-verification-sms',
        method: 'POST',
      }),
    }),

    verifyEmail: build.mutation({
      query: body => ({
        url: '/auth/verify-email',
        method: 'POST',
        body,
      }),
    }),

    verifyPhone: build.mutation({
      query: body => ({
        url: '/auth/verify-phone-number',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendEmailVerificationMutation,
  useSendPhoneVerificationMutation,
  useVerifyEmailMutation,
  useVerifyPhoneMutation,
} = authApi
