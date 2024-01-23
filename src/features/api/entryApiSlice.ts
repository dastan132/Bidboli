import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseApiUrl, entryUrl } from '../../constants/url'

const prepareHeaders = (headers: Headers, { endpoint }: { endpoint: string }) => {
  if (['loginUser', 'registerUser', 'forgotPassword'].includes(endpoint)) return headers
  const token = localStorage.getItem('accessToken')

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }

  headers.set('Access-Control-Allow-Origin', '*')

  return headers
}

export const entryApiSlice = createApi({
  reducerPath: 'entryApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl.BASE_URL,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: entryUrl.REGISTER_USER,
        method: 'POST',
        body
      })
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: entryUrl.LOGIN_USER,
        method: 'POST',
        body
      })
    }),
    verifyOTP: builder.mutation({
      query: (body) => ({
        url: entryUrl.VERIFY_OTP,
        method: 'POST',
        body
      })
    }),
    sendOTP: builder.mutation({
      query: (body) => ({
        url: entryUrl.SEND_OTP,
        method: 'POST',
        body
      })
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: entryUrl.FORGOT_PASSWORD,
        method: 'POST',
        body
      })
    }),
    submitPreferences: builder.mutation({
      query: (body) => ({
        url: entryUrl.SUBMIT_PREFERENCES,
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useForgotPasswordMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyOTPMutation,
  useSendOTPMutation,
  useSubmitPreferencesMutation
} = entryApiSlice
