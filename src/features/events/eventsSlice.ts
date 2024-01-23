import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  eventsWithInterested: {},
  eventsWatchlist: {},
  currentEventId: ''
}

export const eventsSlice = createSlice({
  name: 'eventsSlice',
  initialState,
  reducers: {
    setCurrentEventId: (state, action) => {
      state.currentEventId = action.payload
    },
    setEventsWithInterested: (state, action) => {
      state.eventsWithInterested = action.payload
    },
    setEventsWatchlist: (state, action) => {
      state.eventsWatchlist = action.payload
    }
  }
})

export const { setCurrentEventId, setEventsWithInterested, setEventsWatchlist } =
  eventsSlice.actions

export default eventsSlice.reducer
