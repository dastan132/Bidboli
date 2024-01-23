import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseApiUrl, homeApiUrl } from '../../constants/url'
import { setEventsWatchlist, setEventsWithInterested } from '../events/eventsSlice'

export const homeApiSlice = createApi({
  reducerPath: 'homeApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl.BASE_URL
  }),
  endpoints: (builder) => ({
    getPopularEvents: builder.query<any, void>({
      query: () => homeApiUrl.GET_POPULAR_EVENTS,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled

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
    }),
    getEventsList: builder.query<any, void>({
      query: () => homeApiUrl.POPULAR_EVENTS
    }),
    getLatestBlogs: builder.query<any, void>({
      query: () => homeApiUrl.GET_LATEST_BLOGS,
      transformResponse: (response: Record<string, any>) => response.data.results.slice(0, -5)
    }),
    subscribeToNewsletter: builder.mutation({
      query: (body) => ({
        url: homeApiUrl.SUBSCRIBE_TO_NEWSLETTER,
        method: 'POST',
        body
      })
    }),
    addToFavorite: builder.mutation({
      query: (body) => ({
        url: homeApiUrl.ADD_PRVATE_WATCHLIST,
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetPopularEventsQuery,
  useGetLatestBlogsQuery,
  useGetEventsListQuery,
  useSubscribeToNewsletterMutation,
  useAddToFavoriteMutation
} = homeApiSlice
