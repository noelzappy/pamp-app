import { api } from '@/Services/api'

export const miscApi = api.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query({
      query: query => {
        const params = new URLSearchParams(query)
        return {
          url: '/categories' + '?' + params,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { getCategories } = miscApi
