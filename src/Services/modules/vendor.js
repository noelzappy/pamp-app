import { api } from '@/Services/api'

export const vendorApi = api.injectEndpoints({
  endpoints: build => ({
    getVendors: build.query({
      query: query => {
        const params = new URLSearchParams(query)
        return {
          url: '/vendors' + '?' + params,
          method: 'GET',
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetVendorsQuery } = vendorApi
