import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { homeApiSlice } from '../features/api/homeApiSlice'
import { entryApiSlice } from '../features/api/entryApiSlice'
import { eventsApiSlice } from '../features/api/eventsApiSlice'
import { exitApiSlice } from '../features/api/exitApiSlice'
import { notificationApiSlice } from '../features/api/notificationApiSlice'

import eventsReducer from '../features/events/eventsSlice'
import { userApiSlice } from '../features/api/userApiSlice'

const store = configureStore({
  reducer: {
    [homeApiSlice.reducerPath]: homeApiSlice.reducer,
    [entryApiSlice.reducerPath]: entryApiSlice.reducer,
    [eventsApiSlice.reducerPath]: eventsApiSlice.reducer,
    [exitApiSlice.reducerPath]: exitApiSlice.reducer,
    [notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    events: eventsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      homeApiSlice.middleware,
      eventsApiSlice.middleware,
      entryApiSlice.middleware,
      exitApiSlice.middleware,
      notificationApiSlice.middleware,
      userApiSlice.middleware
    )
})

setupListeners(store.dispatch)

export { store }

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
