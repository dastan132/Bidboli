import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { notificationApiUrl, baseApiUrl } from '../../constants/url'

const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }

  headers.set('Access-Control-Allow-Origin', '*')

  return headers
}
export const notificationApiSlice = createApi({
  reducerPath: 'notificationApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl.BASE_URL,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getNotificationList: builder.query<any, void>({
      query: () => notificationApiUrl.GET_NOTIFICATION_LIST
    }),
    getNotificationCount: builder.query<any, void>({
      query: () => notificationApiUrl.GET_NOTIFICATION_COUNT
    })
  })
})

export const { useGetNotificationListQuery, useGetNotificationCountQuery } = notificationApiSlice
