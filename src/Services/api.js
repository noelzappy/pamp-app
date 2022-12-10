import { Config } from '@/Config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const tokens = getState().auth.tokens
    if (tokens) {
      headers.set('Authorization', `Bearer ${tokens.access.token}`)
    }
    headers.set('Accept', 'application/json')
    headers.set('Content-Type', 'application/json')

    return headers
  },
})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  console.log(args.method, args.url)

  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})
