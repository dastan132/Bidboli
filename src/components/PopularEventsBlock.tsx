import React, { useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import toast from 'react-hot-toast'

import { useGetEventsListQuery, useGetPopularEventsQuery } from '../features/api/homeApiSlice'
import {
  setEventsWithInterested,
  setCurrentEventId,
  setEventsWatchlist
} from '../features/events/eventsSlice'
import {
  useAddToInterestedEventsMutation,
  useAddToPrivateWatchListMutation,
  useRemoveFromInterestedEventsMutation,
  useRemoveFromWatchlistMutation
} from '../features/api/eventsApiSlice'

import { formatDate, getNumberOfRestArgs } from '../utils/helper'

import { EVENTS_LOADER_ARRAY, LOADER_ARRAY } from '../constants/loaderArray'
import { USER_ROUTES, VISITOR_ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { RootState } from '../app/store'

export default function PopularEvents() {
  let toastId: any

  const { data, isLoading } = useGetEventsListQuery()
  const dispatch = useDispatch()

  const { data: popularAssests, error, isLoading: loading, isSuccess } = useGetPopularEventsQuery()
  const [addToPrivateWatchList] = useAddToPrivateWatchListMutation()

  const [removeFromWatchlist] = useRemoveFromWatchlistMutation()

  const [addToInterestedEvents] = useAddToInterestedEventsMutation()
  const [removeFromInterestedEvents] = useRemoveFromInterestedEventsMutation()

  const interestedEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWithInterested
  )

  const watchlistEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWatchlist
  )

  const user = useAuth()
  const navigate = useNavigate()

  const [filter, setFilter] = useState('')

  const filteredEvents = filter
    ? data?.data?.filter((event: any) => event.assetTypes?.includes(filter))
    : data?.data

  const handleAddToWatchlist = async (id: any) => {
    if (!user) navigate(VISITOR_ROUTES.LOGIN)

    let result: Record<string, any> = {}

    if (watchlistEvents[id]?.isEventWatchlist) {
      result = await removeFromWatchlist({
        eventId: id
      })
    } else {
      result = await addToPrivateWatchList({
        eventId: id,
        userId: user.id
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

  const handleAddToWishlist = async (id: any) => {
    if (!user) navigate(VISITOR_ROUTES.LOGIN)

    let result: Record<string, any> = {}

    if (interestedEvents[id]?.isEventInterest) {
      result = await removeFromInterestedEvents({
        eventId: id,
        userId: user.id
      })
    } else {
      result = await addToInterestedEvents({
        eventId: id,
        userId: user.id
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
          [id]: { isEventInterest: !interestedEvents[id]?.isEventInterest }
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
    <>
      <section>
        <div className="row mt-5 mx-5">
          <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-start p-0">
            <div className="sec-title">
              <h2 className="fw-bold">Browse Top Events</h2>
            </div>
          </div>
          {isSuccess && (
            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end p-0">
              <div className="sec-redirector">
                <NavLink to={USER_ROUTES.EVENTS} className="btn btn-primary btn-sm btn-viewall">
                  View All
                </NavLink>
              </div>
            </div>
          )}

          <div className="col-12 ps-0">
            {loading &&
              LOADER_ARRAY.map((loader) => (
                <div key={loader} className="badge badge-pill loading pill mt-4">
                  <div className="content"></div>
                </div>
              ))}
            {!loading && !error && (
              <ul className="list-unstyled list-inline d-block text-center text-lg-start mt-2">
                <li
                  className={`list-inline-item capsule-filters py-1 py-xl-0 pill-hover ${
                    !filter && 'pill-active'
                  }`}
                >
                  <input type="radio" className="radio-capsule" name="homefilters" id="showall" />
                  <label htmlFor="showall" onClick={() => setFilter('')}>
                    Show All
                  </label>
                </li>

                {popularAssests?.data?.map((asset: any) => (
                  <li
                    key={asset.id}
                    className={`list-inline-item capsule-filters pill-hover py-1 py-xl-0 ${
                      filter === asset.AssetType ? 'pill-active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      className="radio-capsule "
                      name="homefilters"
                      id={asset.id}
                    />
                    <label
                      htmlFor={asset.id}
                      onClick={() => {
                        if (filter === asset.AssetType) setFilter('')
                        else setFilter(asset.AssetType)
                      }}
                    >
                      {asset.AssetType}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <section className="mb-4 px-2 mx-xl-5 mx-2">
        <div className="row">
          {isLoading &&
            EVENTS_LOADER_ARRAY.map((loader) => (
              <div key={loader} className="mx-2 mt-3 card-loader loading">
                <div className="image"></div>
                <div className="content">
                  <h4 className="title"></h4>
                  <div className="description"></div>
                </div>
              </div>
            ))}

          {filteredEvents?.map((asset: any) => (
            <div key={asset.id} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 px-1 pt-2">
              <div className="border bg-lite eventbox portrait">
                <div className="px-xl-3 py-xl-2 px-2">
                  <div className="py-2 eventbox-thumb position-relative">
                    <img src={asset.assetGallery?.[0]} height="150px" alt="#" />
                    <div className="position-absolute bottom-0 start-0 ps-2 pe-3 pt-1 rounded-top-right-1 bg-danger text-white">
                      {`Entry closing in ${asset.daysLeft} days`}
                    </div>
                    <div className="position-absolute bottom-0 me-3 mb-2 end-0 heart-circle">
                      {watchlistEvents[asset.id]?.isEventWatchlist ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="red"
                          className="bi bi-heart-fill"
                          viewBox="0 0 16 16"
                          role="button"
                          onClick={() => {
                            dispatch(setCurrentEventId(asset.id))
                            handleAddToWatchlist(asset.id)
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          className="bi bi-heart pe-auto"
                          viewBox="0 0 16 16"
                          role="button"
                          onClick={() => {
                            dispatch(setCurrentEventId(asset.id))
                            handleAddToWatchlist(asset.id)
                          }}
                        >
                          <path
                            fill="red"
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-xl-12 my-2">
                      <p className="m-0 text-lg">{asset.eventName}</p>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6 col-xl-6">
                        <div className="sm_tex text-secondary m-0">Assets Location</div>
                        <div className="m-0 h6 fw-normal">
                          {getNumberOfRestArgs(asset?.assetLocations)}
                        </div>
                      </div>
                      <div className="col-6 col-xl-6">
                        <div className="sm_tex text-secondary m-0">Participation Deadline</div>
                        <div className="m-0 h6 fw-normal">{formatDate(asset.auctionDate)}</div>
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-6 col-xl-6">
                        <div className="sm_tex text-secondary m-0">Auction Date</div>
                        <div className="m-0 h6 fw-normal">{formatDate(asset.auctionDate)}</div>
                      </div>
                      <div className="col-6 col-xl-6">
                        <div className="sm_tex text-secondary m-0">Asking Price</div>
                        <div className="m-0 h6 fw-normal">
                          ₹{Number(asset?.bidboliFee).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="row my-2">
                      <div className="col-12 col-xl-12">
                        <div className="sm_tex text-secondary pb-1 m-0">Asset type</div>
                        <span className="border-0 bg-primary-lite sm_tex py-1 px-1 px-xl-2 h6 text-center">
                          {asset.assetTypes[0] || 'No listed category'}
                        </span>
                      </div>
                    </div>

                    <div className="row my-2">
                      <div className="col-12 col-xl-12">
                        <div className="sm_tex text-secondary pb-1 m-0">Classification</div>

                        <span className="border-0 bg-primary-lite sm_tex py-1 px-1 px-xl-2 h6 text-center">
                          {asset.assetClassifications[0] || 'No listed category'}
                        </span>

                        {asset.assetClassifications?.[1] && (
                          <span className="border-0 bg-primary-lite sm_tex py-1 px-1 px-xl-2 h6 text-center mx-2">
                            {asset.assetClassifications[1]}
                          </span>
                        )}
                        {asset.assetClassifications.length > 1 && (
                          <span className="col-1 col-xl-1 ps-0">
                            <strong>
                              {asset.assetClassifications.length > 1 &&
                                `+${asset.assetClassifications.length}`}
                           </strong>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-xl-6 pe-xl-1 pt-3 ps-xl-0">
                      <button
                        type="submit"
                        className={
                          interestedEvents[asset.id]?.isEventInterest
                            ? 'primary_border primary_tex bg-lite  py-xl-3 w-100 py-3 d-block text-center fw-bold'
                            : 'border-0 btn-secondary w-xl-100 w-100 py-3 fw-bold '
                        }
                        onClick={() => {
                          dispatch(setCurrentEventId(asset.id))
                          handleAddToWishlist(asset.id)
                        }}
                      >
                        {interestedEvents[asset.id]?.isEventInterest
                          ? 'Remove Interest'
                          : 'Show Interest'}
                      </button>
                    </div>
                    <div className="col-12 col-xl-6 ps-xl-1 pt-3 pe-xl-0">
                        <Link to={`/eventDetails/${asset.id}`} className="text-lite btn-primary border-0 py-xl-3 w-100 py-3 d-block text-center fw-bold">
                          View Details
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
