import React from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../../app/store'

import { LOADER_ARRAY } from '../../../constants/loaderArray'

import {
  useGetWatchlistEventsQuery,
  useAddToInterestedEventsMutation,
  useRemoveFromInterestedEventsMutation,
  useRemoveFromWatchlistMutation,
  useAddToPrivateWatchListMutation
} from '../../../features/api/eventsApiSlice'

import {
  setCurrentEventId,
  setEventsWithInterested,
  setEventsWatchlist
} from '../../../features/events/eventsSlice'
import { useAuth } from '../../../hooks/useAuth'
import { formatDate, roundToCrores } from '../../../utils/helper'
import BlockLoader from '../../BlockLoader'
import SmallCarousel from '../../SmallCarousel'
import ToolTipPopover from '../../TooltipPopover'

export default function WatchListPage() {
  const currentUser = useAuth()

  const { data, isFetching, isSuccess } = useGetWatchlistEventsQuery()

  let toastId: any

  const interestedEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWithInterested
  )
  const currentEventId = useSelector((state: RootState) => state.events.currentEventId)

  const watchlistEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWatchlist
  )

  const dispatch = useDispatch()
  const [addToInterestedEvents, { isLoading: addingToInterestedEvents }] =
    useAddToInterestedEventsMutation()
  const [removeFromInterestedEvents, { isLoading: removingFromInterestedEvents }] =
    useRemoveFromInterestedEventsMutation()

  const [addToPrivateWatchList] = useAddToPrivateWatchListMutation()
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation()

  const handleAddToWishlist = async (id: any) => {
    let result: Record<string, any> = {}
    if (interestedEvents[id]?.isEventInterest) {
      result = await removeFromInterestedEvents({
        eventId: id
      })
    } else {
      result = await addToInterestedEvents({
        eventId: id
      })
    }

    if (result.data.status) {
      toast.dismiss()
      toast.success(
        interestedEvents[id]?.isEventInterest
          ? 'Successfully Removed from Interested events'
          : 'Successfully added to Interested events',
        {
          id: toastId
        }
      )
      dispatch(
        setEventsWithInterested({
          ...interestedEvents,
          [id]: { isEventInterest: !interestedEvents[id].isEventInterest }
        })
      )
    } else {
      toast.dismiss()
      toast.error(result.data.msg, {
        id: toastId
      })
    }
  }
  if (removingFromInterestedEvents || addingToInterestedEvents) {
    toastId = toast.loading(removingFromInterestedEvents ? 'Removing...' : 'Adding...', {
      id: currentEventId
    })
  }

  const handleAddToWatchlist = async (id: any) => {
    let result: Record<string, any> = {}

    if (watchlistEvents[id]?.isEventWatchlist) {
      result = await removeFromWatchlist({
        eventId: id
      })
    } else {
      result = await addToPrivateWatchList({
        eventId: id,
        userId: currentUser.id
      })
    }

    if (result.data.status) {
      toast.dismiss()
      toast.success(
        watchlistEvents[id]?.isEventWatchlist
          ? 'Successfully Removed from watchlist events'
          : 'Successfully added to watchlist events',
        {
          id: toastId
        }
      )
      dispatch(
        setEventsWatchlist({
          ...watchlistEvents,
          [id]: { isEventWatchlist: !watchlistEvents[id]?.isEventWatchlist }
        })
      )
    } else {
      toast.dismiss()
      toast.error(result.data.msg, {
        id: toastId
      })
    }
  }

  return (
    <div className="col-12 col-md-12 col-lg-9 col-xl-9 mx-xl-3 px-lg-3 px-md-3 px-2">
      <div className="row">
        <div className="col-12">
          <h2 className="fw-bold m-0">Watchlist</h2>
        </div>
      </div>
      <hr />
      <div className="row">
        {isFetching && LOADER_ARRAY.map((loader) => <BlockLoader key={loader} />)}
        {isSuccess &&
          data?.data?.results.map((event: any) => (
            <div key={event.id} className="col-12 col-md-6 col-xl-12">
              <div className="bg-lite px-xl-4 py-xl-4 py-3 mt-2 px-3 px-md-4">
                <div className="row">
                  <div
                    className={`col-12 col-md-12 col-xl-4 text-xl-start text-center ${
                      !(event.assetGallery?.length > 1) && 'eventpage-thumbicon'
                    }`}
                  >
                    {event.assetGallery?.length > 1 ? (
                      <SmallCarousel images={event.assetGallery} />
                    ) : (
                      <img
                        className="h-100 w-100 px-1 px-xl-0"
                        src={event.assetGallery?.[0]}
                        alt="#"
                      />
                    )}
                  </div>
                  <div className="col-12 col-xl-8 mt-3 mt-xl-0 eventpage-eventinfo">
                    <div className="row">
                      <div className="col-12 col-xl-12">
                        <h3 className="fw-bold">{event.eventName} </h3>
                      </div>
                    </div>
                    <div className="row mt-sm-2 mt-xl-0">
                      <div className="col-6 col-xl-4">
                        <p className="m-0">Asking Price</p>
                        <h3 className="fw-bold">
                          ₹{roundToCrores(Number(event?.indicativePrice))}
                        </h3>
                      </div>
                      <div className="col-6 col-xl-4">
                        <p className="m-0">Auction Date</p>
                        <h3 className="fw-bold">{formatDate(event.auctionDate)}</h3>
                      </div>
                      <div className="col-7 col-xl-4">
                        <p className="m-0">Participation Deadline</p>
                        <h3 className="fw-bold">{formatDate(event.participationDeadline)}</h3>
                      </div>
                    </div>
                    <div className="row mt-xl-3 mt-2">
                      <div className="w-auto">
                        <p className="m-0">Assets Types</p>
                        <div className="row">
                          <div className="d-flex me-1">
                            <button className="pe-none border-0 bg-primary-lite sm_tex py-2 px-3 h6 me-1">
                              {event.assetTypes?.[0]}
                            </button>

                            {event.assetTypes?.[1] && (
                              <button className="pe-none border-0 bg-primary-lite sm_tex py-2 px-3 h6">
                                {event.assetTypes?.[1]}
                              </button>
                            )}
                            {event.assetTypes?.length > 1 && (
                              <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                rootClose={true}
                                overlay={ToolTipPopover({
                                  title: 'More Asset Types',
                                  body: event.assetTypes.slice(1)
                                })}
                              >
                                <button className="border-0 bg-lite sm-tex h6">
                                  {event.assetTypes?.length > 1 &&
                                    `+${event.assetTypes?.length - 1}`}
                                </button>
                              </OverlayTrigger>
                            )}
                          </div>
                        </div>
                      </div>
                      {event.assetClassifications?.length > 0 && (
                        <div className="w-auto">
                          <p className="m-0">Classifications</p>
                          <div className="row">
                            {event.assetClassifications?.[0] && (
                              <div className="col-12 d-flex">
                                <button className="pe-none border-0 bg-primary-lite sm_tex py-2 px-3 h6 me-1">
                                  {event.assetClassifications?.[0]}
                                </button>
                                {event.assetClassifications?.[1] && (
                                  <button className="pe-none border-0 bg-primary-lite sm_tex py-2 px-3 h6 me-2">
                                    {event.assetClassifications?.[1]}
                                  </button>
                                )}
                                {event.assetClassifications?.length > 1 && (
                                  <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    rootClose={true}
                                    overlay={ToolTipPopover({
                                      title: 'More Classifications',
                                      body: event.assetClassifications.slice(1)
                                    })}
                                  >
                                    <button className="border-0 bg-lite sm-tex h6">
                                      {event.assetClassifications?.length > 1 &&
                                        `+${event.assetClassifications?.length - 1}`}
                                    </button>
                                  </OverlayTrigger>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="row py-2">
                      <div className="col-12 col-xl-3 text-xl-start text-center my-1">
                        {/* <button className="border-0 btn-secondary w-xl-100 w-100 py-2 rounded fw-bold ">
                          Show Interest
                        </button> */}
                        <button
                          className={
                            interestedEvents[event.id]?.isEventInterest
                              ? 'border-0 btn-secondary w-xl-100 w-100 py-2 rounded fw-bold '
                              : 'primary_border primary_tex bg-lite w-xl-100 w-100 py-2 rounded-1 fw-bold'
                          }
                          onClick={() => {
                            dispatch(setCurrentEventId(event.id))
                            handleAddToWishlist(event.id)
                          }}
                        >
                          {(addingToInterestedEvents || removingFromInterestedEvents) &&
                            currentEventId === event.id && (
                              <div
                                className="spinner-grow spinner-grow-sm text-light me-3"
                                role="status"
                              ></div>
                            )}
                          {removingFromInterestedEvents && currentEventId === event.id
                            ? 'Adding...'
                            : addingToInterestedEvents && currentEventId === event.id
                            ? 'Removing...'
                            : interestedEvents[event.id]?.isEventInterest
                            ? 'Remove Interest'
                            : 'Show Interest'}
                        </button>
                      </div>
                      <div className="col-12 col-xl-4 text-center text-xl-start my-1">
                        <button className="border-0 btn-primary w-xl-100 w-100 py-2 rounded-1 fw-bold">
                          <Link to={`/eventDetails/${event?.id}`}>
                            <span className="text-lite">View Details</span>
                          </Link>
                        </button>
                      </div>
                      <div className="col-12 col-xl-4 text-center text-xl-start my-1">
                        <button
                          className={
                            interestedEvents[event.id]?.isEventWatchlist
                              ? 'border-0 btn-secondary w-xl-100 w-100 py-2 rounded fw-bold '
                              : 'primary_border primary_tex bg-lite w-xl-100 w-100 py-2 rounded-1 fw-bold'
                          }
                          onClick={() => {
                            dispatch(setCurrentEventId(event.id))
                            handleAddToWatchlist(event.id)
                          }}
                        >
                          {watchlistEvents[event.id]?.isEventWatchlist
                            ? 'Remove from watchlist'
                            : 'Add to watchlist'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
