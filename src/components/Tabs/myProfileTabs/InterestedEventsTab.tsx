import React, { useState } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import toast from 'react-hot-toast'

import ToolTipPopover from '../../TooltipPopover'
import usePagination from '../../../hooks/usePagination'

import {
  useGetInterestedEventsQuery,
  useAddToInterestedEventsMutation,
  useRemoveFromInterestedEventsMutation
} from '../../../features/api/eventsApiSlice'

import { useAuth } from '../../../hooks/useAuth'

import { formatDate, roundToCrores } from '../../../utils/helper'
import { LOADER_ARRAY } from '../../../constants/loaderArray'
import BlockLoader from '../../BlockLoader'
import { VISITOR_ROUTES } from '../../../constants/routes'
import { RootState } from '../../../app/store'
import { setEventsWithInterested, setCurrentEventId } from '../../../features/events/eventsSlice'

import SmallCarousel from '../../SmallCarousel'

export default function InterestedEventsTab() {
  let toastId: any
  const currentUser = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const interestedEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWithInterested
  )
  const currentEventId = useSelector((state: RootState) => state.events.currentEventId)

  const dispatch = useDispatch()
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
  const setCurrentPage = (n: number) => {
    setFilters({ ...filters, page: n })
  }

  const { data, isFetching, isSuccess } = useGetInterestedEventsQuery()

  const { PaginateComponent } = usePagination(data?.data?.totalPages, filters.page, setCurrentPage)

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

  if (removingFromInterestedEvents || addingToInterestedEvents) {
    toastId = toast.loading(removingFromInterestedEvents ? 'Removing...' : 'Adding...', {
      id: currentEventId
    })
  }

  return (
    <>
      <div className="col-12 col-md-12 col-lg-9 col-xl-9 mx-xl-3 px-lg-3 px-md-3 px-2">
        <div className="row">
          <div className="col-12">
            <h2 className="fw-bold m-0">Interested Events</h2>
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
                          <button className="border-0 btn-primary w-xl-100 w-100 py-2 rounded-1 fw-bold">
                            <Link to={`/eventDetails/${event?.id}`}>
                              <span className="text-lite">View Details</span>
                            </Link>
                          </button>
                        </div>
                        <div className="col-12 col-xl-4 text-center text-xl-start my-1">
                          <button className="primary_border primary_tex bg-lite w-xl-100 w-100 py-2 rounded-1 fw-bold">
                            Event Dashboard
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <PaginateComponent />
        </div>
      </div>
    </>
  )
}
