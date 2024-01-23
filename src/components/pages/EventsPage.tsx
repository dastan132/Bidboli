import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import toast from 'react-hot-toast'

import ToolTipPopover from '../TooltipPopover'

import {
  useGetEventsQuery,
  useGetEventTypesQuery,
  useAddToInterestedEventsMutation,
  useRemoveFromInterestedEventsMutation,
  useAddToPrivateWatchListMutation,
  useRemoveFromWatchlistMutation
} from '../../features/api/eventsApiSlice'

import {
  setEventsWithInterested,
  setCurrentEventId,
  setEventsWatchlist
} from '../../features/events/eventsSlice'

import { useAuth } from '../../hooks/useAuth'
import usePagination from '../../hooks/usePagination'
import { formatDate, roundToCrores } from '../../utils/helper'

import Footer from '../Footer'
import Header from '../Header'
import { LOADER_ARRAY, PRICE_RANGE_ARRAY } from '../../constants/loaderArray'
import BlockLoader from '../BlockLoader'
import { VISITOR_ROUTES } from '../../constants/routes'
import { RootState } from '../../app/store'
import Toaster from '../global/Toaster'
import SmallCarousel from '../SmallCarousel'

export default function EventsPage() {
  let toastId: any
  const currentUser = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const interestedEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWithInterested
  )

  const watchlistEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWatchlist
  )

  const currentEventId = useSelector((state: RootState) => state.events.currentEventId)

  const dispatch = useDispatch()

  const [addToPrivateWatchList] = useAddToPrivateWatchListMutation()
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation()
  const [addToInterestedEvents, { isLoading: addingToInterestedEvents }] =
    useAddToInterestedEventsMutation()

  const [removeFromInterestedEvents, { isLoading: removingFromInterestedEvents }] =
    useRemoveFromInterestedEventsMutation()

  const [filters, setFilters] = useState({
    userId: currentUser?.id,
    page: 1,
    assetType: '',
    priceRange: '',
    search: searchParams.get('query') || ''
  })

  const [isFullListAllowed, setIsFullListAllowed] = useState(false)

  const setCurrentPage = (n: number) => {
    setFilters({ ...filters, page: n })
  }

  const { data, isFetching, isSuccess } = useGetEventsQuery(filters)
  console.log(data)
  const { data: eventsTypeList } = useGetEventTypesQuery(currentUser?.id)

  const { PaginateComponent } = usePagination(data?.data?.totalPages, filters.page, setCurrentPage)

  const eventTypes = isFullListAllowed ? eventsTypeList?.data : eventsTypeList?.data?.slice(0, 4)

  const handleAddToWishlist = async (id: any) => {
    let result: Record<string, any> = {}

    if (!currentUser) navigate(VISITOR_ROUTES.LOGIN)
    else if (interestedEvents[id].isEventInterest) {
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
        interestedEvents[id].isEventInterest
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

  if (removingFromInterestedEvents || addingToInterestedEvents) {
    toastId = toast.loading(removingFromInterestedEvents ? 'Removing...' : 'Adding...', {
      id: currentEventId
    })
  }

  return (
    <>
      <Helmet>
        <title>Events</title>
      </Helmet>

      <div className="wrapper overflow-hidden">
        <Header />
        <div className="container-fluid">
          <section className="pt-5">
            <div className="container-fluid p-0 mx-xl-5 ps-lg-3 ps-xl-5">
              <div className="row">
                <div className="col-12 col-lg-3 col-xl-2 p-0">
                  <div className="">
                    <ul className="p-0">
                      <div className="row">
                        <div className="col-xl-12 display_slid px-0 bg-lite">
                          <div className="bg-tags-grey">
                            <div className="row px-2 py-2">
                              <div className="col-xl-6">
                                <h6 className="fw-bold m-0">Filters</h6>
                              </div>
                              <div className="col-xl-6 text-end">
                                <button
                                  className="oran_tex m-0 fw-bold h6 border-0 bg-tags-grey"
                                  onClick={() => {
                                    setFilters({
                                      userId: currentUser?.id,
                                      page: 1,
                                      assetType: '',
                                      priceRange: '',
                                      search: ''
                                    })
                                  }}
                                >
                                  Clear All
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="mx-3 my-3">
                            <li className="list-unstyled pb-2">
                              <h6 className="fw-bold">Asset Type</h6>
                            </li>
                            {eventTypes?.map((type: any) => (
                              <li key={type.id} className="list-unstyled pb-0">
                                <input
                                  type="checkbox"
                                  className="mt-1 accent-checkbox"
                                  name={type.AssetType}
                                  id={type.AssetType}
                                  checked={type.id === filters.assetType}
                                  role="button"
                                  onChange={() => {
                                    setFilters({
                                      ...filters,
                                      assetType: filters.assetType === type.id ? '' : type.id
                                    })
                                  }}
                                />
                                <label
                                  htmlFor={type.AssetType}
                                  className="-mt-1 mx-1 sm_tex h6 "
                                  role="button"
                                >
                                  {type.AssetType}&nbsp;
                                  {type.count && `(${type.count})`}
                                  <span className="text-secondary sm_tex"></span>
                                </label>
                              </li>
                            ))}
                            {eventsTypeList?.data?.length > 4 && (
                              <div className="text-end">
                                <button
                                  className="oran_tex m-0 fw-bold h6 border-0 bg-white"
                                  onClick={() => setIsFullListAllowed(!isFullListAllowed)}
                                >
                                  {isFullListAllowed ? 'Show less' : 'Show more'}
                                </button>
                              </div>
                            )}
                            <hr />
                            <li className="list-unstyled pb-2">
                              <h6 className="fw-bold">Pricing</h6>
                            </li>
                            {PRICE_RANGE_ARRAY.map((item: any) => (
                              <li key={item.id} className="list-unstyled pb-0">
                                <input
                                  className="accent-checkbox"
                                  type="checkbox"
                                  name={item.id}
                                  id={item.id}
                                  role="button"
                                  checked={item.id === filters.priceRange}
                                  onChange={() => {
                                    setFilters({
                                      ...filters,
                                      priceRange: filters.priceRange === item.id ? '' : item.id
                                    })
                                  }}
                                />
                                <label
                                  className="mx-1 -mt-1 sm_tex h6"
                                  htmlFor={item.id}
                                  role="button"
                                >
                                  {item.range}
                                </label>
                              </li>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-9 col-xl-9 mx-xl-3 px-lg-3 px-md-3 px-2">
                  <div className="row">
                    <div className="col-12">
                      <h2 className="fw-bold m-0">All Events</h2>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    {isFetching && LOADER_ARRAY.map((loader) => <BlockLoader key={loader} />)}
                    {isSuccess &&
                      data?.data?.results.map((event: any) => (
                        <div key={event.id} className="col-12 col-md-6 col-xl-12">
                          <div className="bg-lite px-xl-4 py-xl-4 py-3 mt-2 px-3 px-md-4">
                            <div className="row ">
                              <div
                                className={`col-12 col-md-12 col-xl-4 position-relative text-xl-start text-center ${
                                  !(event.assetGallery?.length > 1) && 'eventpage-thumbicon'
                                }`}
                              >
                                <div className="position-absolute bottom-0 me-3 mb-2 end-0 heart-circle">
                                  {watchlistEvents[event.id]?.isEventWatchlist ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="red"
                                      className="bi bi-heart-fill"
                                      viewBox="0 0 16 16"
                                      role="button"
                                      onClick={() => {
                                        dispatch(setCurrentEventId(event.id))
                                        handleAddToWatchlist(event.id)
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
                                        dispatch(setCurrentEventId(event.id))
                                        handleAddToWatchlist(event.id)
                                      }}
                                    >
                                      <path
                                        fill="red"
                                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                                      />
                                    </svg>
                                  )}
                                </div>
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
                                    <h3 className="fw-bold">
                                      {formatDate(event.participationDeadline)}
                                    </h3>
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
                                  <div className="col-12 col-xl-4 text-xl-start text-center my-1">
                                    <button
                                      type="submit"
                                      className={
                                        interestedEvents[event.id]?.isEventInterest
                                          ? 'primary_border primary_tex bg-lite w-xl-100 w-100 py-3 text-lg fw-bold'
                                          : 'border-0 btn-secondary w-xl-100 w-100 py-3 fw-bold '
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
                                        ? 'Removing...'
                                        : addingToInterestedEvents && currentEventId === event.id
                                        ? 'Adding...'
                                        : interestedEvents[event.id]?.isEventInterest
                                        ? 'Remove Interest'
                                        : 'Show Interest'}
                                    </button>
                                  </div>
                                  <div className="col-12 col-xl-4 text-center text-xl-start my-1">
                                    <button className="border-0 btn-primary w-xl-100 w-100 py-3 fw-bold">
                                      <Link to={`/eventDetails/${event?.id}`}>
                                        <span className="text-lite">View Details</span>
                                      </Link>
                                    </button>
                                  </div>
                                  <div className="col-12 col-xl-4 text-center text-xl-start my-1">
                                    <button className="primary_border primary_tex bg-lite w-xl-100 w-100 py-3 fw-bold">
                                      Event Dashboard
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
              </div>
            </div>
            <PaginateComponent />
          </section>
          <footer></footer>
        </div>
        <Footer />
      </div>
      <Toaster />
    </>
  )
}
