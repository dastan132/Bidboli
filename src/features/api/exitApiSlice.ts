import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseApiUrl, exitUrl } from '../../constants/url'

const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }

  headers.set('Access-Control-Allow-Origin', '*')

  return headers
}

export const exitApiSlice = createApi({
  reducerPath: 'exitApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl.BASE_URL,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    logout: builder.query({
      query: (id) => `${exitUrl.LOGOUT}${id}`
    })
  })
})

export const { useLogoutQuery } = exitApiSlice
