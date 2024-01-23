import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { userApiUrl, baseApiUrl } from '../../constants/url'
const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }

  headers.set('Access-Control-Allow-Origin', '*')

  return headers
}
export const userApiSlice = createApi({
  reducerPath: 'userApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl.BASE_URL,
    prepareHeaders
  }),
  tagTypes: ['UserDetails'],
  endpoints: (builder) => ({
    getUserDetails: builder.query<any, void>({
      query: () => ({
        url: userApiUrl.GET_USER_DETAILS
      }),
      providesTags: ['UserDetails']
    }),
    updateProfileApi: builder.mutation({
      query: (body) => ({
        url: userApiUrl.UPDATE_PROFILE_API,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['UserDetails']
    }),
    getCountryApi: builder.query<any, void>({
      query: () => userApiUrl.COUNRTY_API,
      transformResponse: (response: Record<string, any>) =>
        response.data.map((country: Record<string, any>) => {
          return { ...country, label: country.name, value: country.id }
        })
    }),
    changePasswordApi: builder.mutation({
      query: (body) => ({
        url: userApiUrl.CHANGE_PASSWORD,
        method: 'PATCH',
        body
      })
    })
  })
})
export const {
  useGetUserDetailsQuery,
  useUpdateProfileApiMutation,
  useLazyGetCountryApiQuery,
  useChangePasswordApiMutation
} = userApiSlice
