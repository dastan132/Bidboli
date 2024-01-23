import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseApiUrl, eventsApiUrl } from '../../constants/url'
import { setEventsWatchlist, setEventsWithInterested } from '../events/eventsSlice'

const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }

  headers.set('Access-Control-Allow-Origin', '*')

  return headers
}

export const eventsApiSlice = createApi({
  reducerPath: 'eventsApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl.BASE_URL,
    prepareHeaders
  }),
  tagTypes: ['Events', 'Types'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ page = 1, assetType, priceRange,limit, search, userId }) =>
        `${eventsApiUrl.GET_EVENTS}${
          userId ? 'ForUser' : ''
        }?page=${page}&order=latest&limit=${limit}&assetType=${assetType}&priceRange=${priceRange}&search=${search}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(
          setEventsWithInterested(
            data?.data?.results.reduce(
              (obj: any, event: any) =>
                Object.assign(obj, { [event.id]: { isEventInterest: event.isEventInterest } }),
              {}
            )
          )
        )
      },
      providesTags: ['Events']
    }),
    getEventTypes: builder.query({
      query: (id = 0) => `${eventsApiUrl.GET_EVENT_TYPES_WITH_COUNT}${id}`
    }),
    addToPrivateWatchList: builder.mutation({
      query: (body) => ({
        url: eventsApiUrl.ADD_TO_PRIVATE_WATCHLIST,
        method: 'POST',
        body
      })
    }),
    removeFromWatchlist: builder.mutation({
      query: (body) => ({
        url: eventsApiUrl.REMOVE_FROM_PRIVATE_WATCHLIST,
        method: 'DELETE',
        body
      })
    }),
    addToInterestedEvents: builder.mutation({
      query: (body) => ({
        url: eventsApiUrl.ADD_TO_INTERESTED_EVENTS,
        method: 'POST',
        body
      })
    }),
    removeFromInterestedEvents: builder.mutation({
      query: (body) => ({
        url: eventsApiUrl.REMOVE_INTERESTED_EVENTS,
        method: 'DELETE',
        body
      })
    }),
    getCities: builder.query({
      query: (query) => `${eventsApiUrl.GET_CITIES}?search=${query}`,
      transformResponse: (response: Record<string, any>) =>
        response.data.map((city: Record<string, any>) => {
          return { ...city, label: city.name, value: city.id }
        })
    }),
    getEventAvatars: builder.query({
      query: (query) => `${eventsApiUrl.GET_EVENT_AVATARS}?${query}`
    }),
    getEventDetails: builder.query({
      query: (id) => `${eventsApiUrl.GET_EVENT_DETAILS}${id}`
    }),
    getInterestedEvents: builder.query<any, void>({
      query: () => eventsApiUrl.GET_INTERESTED_EVENTS,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(
          setEventsWithInterested(
            data?.data?.results.reduce(
              (obj: any, event: any) =>
                Object.assign(obj, { [event.id]: { isEventInterest: true } }),
              {}
            )
          )
        )
      }
    }),
    getWatchlistEvents: builder.query<any, void>({
      query: () => eventsApiUrl.GET_WATCHLIST_EVENTS,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(
          setEventsWithInterested(
            data?.data?.results.reduce(
              (obj: any, event: any) =>
                Object.assign(obj, { [event.id]: { isEventInterest: !!event.isEventInterest } }),
              {}
            )
          )
        )
        dispatch(
          setEventsWatchlist(
            data?.data?.results.reduce(
              (obj: any, event: any) =>
                Object.assign(obj, { [event.id]: { isEventWatchlist: true } }),
              {}
            )
          )
        )
      }
    }),
    getSimilarEvents: builder.query({
      query: (id) => `${eventsApiUrl.GET_SIMILAR_EVENTS}${id}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data.status) {
          dispatch(
            setEventsWithInterested(
              data.data.reduce(
                (obj: any, event: any) =>
                  Object.assign(obj, { [event.id]: { isEventInterest: event.isEventInterest } }),
                {}
              )
            )
          )
          dispatch(
            setEventsWatchlist(
              data.data.reduce(
                (obj: any, event: any) =>
                  Object.assign(obj, { [event.id]: { isEventWatchlist: event.isWatchlist } }),
                {}
              )
            )
          )
        }
      }
    }),
    getImageUrl: builder.mutation({
      query: (formData) => {
        return {
          url: eventsApiUrl.GET_IMAGE_URL,
          method: 'POST',
          body: formData
        }
      }
    }),
    getEventClassifications: builder.query<any, void>({
      query: () => eventsApiUrl.GET_EVENT_CLASSIFICATIONS
    }),
    getAssetTypes: builder.query<any, void>({
      query: () => eventsApiUrl.GET_ASSET_TYPES,
      transformResponse: (response: Record<string, any>) =>
        response.data.map((asset: Record<string, any>) => {
          return { label: asset.assertName, value: asset.assertName, id: asset.assertId }
        })
    }),
    getAssetClassifications: builder.query<any, void>({
      query: () => eventsApiUrl.GET_ASSET_CLASSIFICATIONS,
      transformResponse: (response: Record<string, any>) =>
        response.data.map((asset: Record<string, any>) => {
          return { label: asset.assertName, value: asset.assertName, id: asset.assertId }
        })
    }),
    removeImage: builder.mutation({
      query: () => ({
        url: eventsApiUrl.REMOVE_IMAGE,
        method: 'DELETE'
      })
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: eventsApiUrl.CREATE_EVENT,
        method: 'POST',
        body
      })
    }),
    getEventsListForUser: builder.query({
      query: ({ page = 1, assetType, priceRange,limit, search, userId }) =>
        `${eventsApiUrl.GET_EVENTS_LIST_FOR_USER}${
          userId ? 'ForUser' : ''
        }?page=${page}&order=latest&limit=${limit}&assetType=${assetType}&priceRange=${priceRange}&search=${search}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(
          setEventsWithInterested(
            data?.data?.results.reduce(
              (obj: any, event: any) =>
                Object.assign(obj, { [event.id]: { isEventInterest: event.isEventInterest } }),
              {}
            )
          )
        )
      },
      providesTags: ['Events']
    })
  })
})

export const {
  useAddToPrivateWatchListMutation,
  useCreateEventMutation,
  useLazyGetAssetClassificationsQuery,
  useLazyGetAssetTypesQuery,
  useGetEventAvatarsQuery,
  useGetEventDetailsQuery,
  useLazyGetCitiesQuery,
  useGetSimilarEventsQuery,
  useAddToInterestedEventsMutation,
  useRemoveFromInterestedEventsMutation,
  useGetEventsQuery,
  useGetEventTypesQuery,
  useGetEventClassificationsQuery,
  useGetImageUrlMutation,
  useGetInterestedEventsQuery,
  useGetWatchlistEventsQuery,
  useRemoveFromWatchlistMutation,
  useRemoveImageMutation,
  useGetEventsListForUserQuery
} = eventsApiSlice
