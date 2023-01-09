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

    getVendor: build.query({
      query: id => {
        return {
          url: `/vendors/${id}`,
          method: 'GET',
        }
      },
    }),

    getVendorServices: build.query({
      query: query => {
        const params = new URLSearchParams(query)
        return {
          url: '/services' + '?' + params,
          method: 'GET',
        }
      },
    }),

    getVendorStaffs: build.query({
      query: query => {
        const params = new URLSearchParams(query)
        return {
          url: '/staffs' + '?' + params,
          method: 'GET',
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetVendorsQuery,
  useLazyGetVendorQuery,
  useLazyGetVendorServicesQuery,
} = vendorApi
