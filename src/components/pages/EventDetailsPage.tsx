import React, { useState } from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import { Link, NavLink, useParams } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { useDispatch, useSelector } from 'react-redux'

import toast from 'react-hot-toast'

import {
  useAddToInterestedEventsMutation,
  useAddToPrivateWatchListMutation,
  useGetEventDetailsQuery,
  useGetSimilarEventsQuery,
  useRemoveFromInterestedEventsMutation,
  useRemoveFromWatchlistMutation
} from '../../features/api/eventsApiSlice'
import { formatDate, getDayName, getNumberOfRestArgs, roundToCrores } from '../../utils/helper'

import Header from '../Header'
import ToolTipPopover from '../TooltipPopover'
import CarouselWithThumbs from '../CarouselWithThumbs'
import { EVENTS_LOADER_ARRAY } from '../../constants/loaderArray'
import { RootState } from '../../app/store'
import {
  setEventsWithInterested,
  setCurrentEventId,
  setEventsWatchlist
} from '../../features/events/eventsSlice'
import { useAuth } from '../../hooks/useAuth'
import { USER_ROUTES } from '../../constants/routes'
import Toaster from '../global/Toaster'
import Loader from '../Loader'

export default function EventDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useAuth()

  const [key, setKey] = useState('Overview')

  let toastId: any

  const [addToPrivateWatchList] = useAddToPrivateWatchListMutation()
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation()
  const { data: eventslist, isLoading } = useGetSimilarEventsQuery(id)

  const [addToInterestedEvents] = useAddToInterestedEventsMutation()

  const [removeFromInterestedEvents] = useRemoveFromInterestedEventsMutation()

  const interestedEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWithInterested
  )

  const watchlistEvents: Record<string, any> = useSelector(
    (state: RootState) => state.events.eventsWatchlist
  )

  const { data: { data = {} } = {}, isLoading: loading, isSuccess } = useGetEventDetailsQuery(id)

  const handleAddToWishlist = async (id: any) => {
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

  const handleAddToWatchlist = async (id: any) => {
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

  return (
    <div className="wrapper overflow-hidden bg-lite">
      <Header />
      <div className="container">
        {loading && <Loader />}
        <div className="row d-flex justify-content-center pt-xl-5 pt-3">
          <div className="col-12 col-md-11 col-lg-5 col-xl-5 pt-lg-4">
            <CarouselWithThumbs images={data?.assetGallery} />
          </div>
          {isSuccess && data && (
            <div className="col-12 col-md-11 col-lg-7 col-xl-5 pt-4 px-lg-1">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                  <h2 className="fw-bold">{data?.eventName}</h2>
                  <p className="h6">{data?.eventBio}</p>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 mb-0 text-grey">Indicative Price</p>
                  <h3 className="fw-bold mt-0">₹{roundToCrores(Number(data?.indicativePrice))}</h3>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <h3 className="oran_tex fw-bold mt-xl-3 mt-3">Chat with Owner</h3>
                </div>
                <div className="col-12 col-xl-2"></div>
                <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-1">
                      <button
                        type="submit"
                        className={
                          interestedEvents?.[data.id]?.isEventInterest
                            ? 'btn-primary-outline border-0 py-xl-3 w-100 py-3 text-lg fw-bold'
                            : 'btn-secondary border-0 py-xl-3 w-100 py-3 text-lg fw-bold'
                        }
                        onClick={() => {
                          dispatch(setCurrentEventId(data.id))
                          handleAddToWishlist(data.id)
                        }}
                      >
                        {interestedEvents?.[data.id]?.isEventInterest
                          ? 'Remove interest'
                          : 'Show interest'}
                      </button>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-1">
                      <NavLink
                        to={USER_ROUTES.EVENTS}
                        className="text-dark fw-bold text-lg fw-bold"
                      >
                        <button className="btn-primary border-0 py-xl-3 w-100 py-3 fw-bold">
                          Event Dashboard
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 mb-0 text-grey">Authorized Representative</p>
                  <h4 className="mt-0">{data?.authorizedRepresentative}</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 mb-0 text-grey">Corporate Debtor</p>
                  <h4 className="mt-0">{data?.corporateDebtor}</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 mb-0 text-grey">Term</p>
                  <h4 className="mt-0">Contractual Term</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 mb-0 text-grey">Adjudicating Authority</p>
                  <h4 className="mt-0">{data?.adjudicatingAuthority}</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 text-grey">Assets Location</p>
                  <span className="border-0 rounded-pill sm_tex px-2 py-1 bg-primary-lite">
                    {data?.assetLocations?.[0].name}
                  </span>

                  {data.assetLocations?.[1] && (
                    <span className="border-0 rounded-pill sm_tex px-2 py-1 bg-primary-lite">
                      {data?.assetLocations?.[1].name}
                    </span>
                  )}
                  {data?.assetLocations?.length > 1 && (
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      rootClose={true}
                      overlay={ToolTipPopover({
                        title: 'More Asset Locations',
                        body: data.assetLocations.slice(1)
                      })}
                    >
                      <button className="border-0 bg-lite sm-tex h6">
                        {data.assetLocations?.length > 1 && `+${data.assetLocations?.length - 1}`}
                      </button>
                    </OverlayTrigger>
                  )}
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 mb-0 text-grey">Mode of Action</p>
                  <h4 className="mt-0">Auction</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 mb-0 text-grey">Bid Submission Deadline</p>
                  <h4 className="mt-0">
                    {formatDate(data?.participationDeadline)},&nbsp;
                    {getDayName(data?.participationDeadline)}
                  </h4>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 mb-0 text-grey">Auction Date</p>
                  <h4 className="mt-0">
                    {formatDate(data?.auctionDate)},&nbsp;{getDayName(data?.auctionDate)}
                  </h4>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-8 my-2">
                  <p className="bg-danger text-lite py-2 border rounded text-center d-inline-block px-4">
                    <i className="fa fa-hourglass"></i> {data?.daysLeft} Days Left
                  </p>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 text-grey">Category</p>
                  <span className="border-0 rounded-pill sm_tex px-2 py-1 bg-primary-lite px-3">
                    Advertising
                  </span>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-5 my-2">
                  <p className="h6 text-grey">Assets Location</p>
                  <span className="border-0 rounded-pill sm_tex px-2 py-1 bg-primary-lite px-1 me-1">
                    Land and Building
                  </span>
                  <span className="border-0 rounded-pill sm_tex px-2 py-1 bg-primary-lite px-1">
                    Land and Building
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row d-flex justify-content-xl-center pt-5 ">
        <div className="col-12 col-md-12 col-lg-10 col-xl-9 bg-lite">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k || '')}
            className="mb-3 tab-list"
          >
            <Tab eventKey="Overview" title="Overview">
              <div className="event_tabcontent">
                <p className="h6 lh-base">
                  It is a long established fact that a reader will be distracted by the readable
                  content of a page when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal distribution of letters, as opposed to using
                  Content here, content here, making it look like readable English. Many desktop
                  publishing packages and web page editors now use Lorem Ipsum as their default
                  model text, and a search for lorem ipsum will uncover many web sites still in
                  their infancy. Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose (injected humour and the like).
                </p>
              </div>
            </Tab>
            <Tab eventKey="Lots" title="Lots">
              <div className="event_tabcontent">
                <p className="h6 lh-base">
                  It is a long established fact that a reader will be distracted by the readable
                  content of a page when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal distribution of letters, as opposed to using
                  Content here, content here, making it look infancy. Various versions have evolved
                  over the years, sometimes by accident, sometimes on purpose (injected humour and
                  the like).
                </p>
              </div>
            </Tab>
            <Tab eventKey="Auction Details" title="Auction Details">
              <div className="event_tabcontent">
                <p className="h6 lh-base">
                  It is a long established fact that a reader will be distracted by the readable
                  content of a page when looking at its layout. The point of using Lorem Ipsum is
                  that it has a more-or-less normal distribution of letters
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="row d-flex justify-content-xl-center align-items-center mt-xl-5">
        <div className="col-12 col-md-12 col-lg-12 col-xl-10 ps-xl-5 ms-xl-5 pt-3">
          <h3 className="fw-bold">You might be interested in</h3>

          <section className="mb-4 px-3 mx-xl-5 mx-2">
            <div className="row justify-content-center">
              {isLoading &&
                EVENTS_LOADER_ARRAY.slice(0, 3).map((loader) => (
                  <div key={loader} className="mx-2 mt-3 card-loader loading">
                    <div className="image"></div>
                    <div className="content">
                      <h4 className="title"></h4>
                      <div className="description"></div>
                    </div>
                  </div>
                ))}

              {eventslist?.data?.map((asset: any) => (
                <div
                  key={asset.id}
                  className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 px-1 pt-3"
                >
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
                          <h4 className="m-0">{asset.eventName}</h4>
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
                              <span className="border-0 bg-primary-lite sm_tex py-1 px-1 px-xl-2 h6 text-center">
                                {asset.assetClassifications[1]}
                              </span>
                            )}
                            {asset.assetClassifications.length > 1 && (
                              <div className="col-1 col-xl-1 ps-0">
                                <div>
                                  {asset.assetClassifications.length > 1 &&
                                    `+${asset.assetClassifications.length}`}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-xl-6 pe-xl-1 pt-3 ps-xl-0">
                          <button
                            type="submit"
                            className={
                              interestedEvents[asset.id]?.isEventInterest
                                ? 'border-0 btn-primary-outline w-xl-100 w-100 py-3 fw-bold'
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
                          <button className="btn-primary border-0 py-xl-3 w-100 py-3">
                            <Link to={`/eventDetails/${asset.id}`} className="text-lite fw-bold">
                              View Details
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
