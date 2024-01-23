import React, { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import classNames from 'classnames'

import usePagination from '../../../hooks/usePagination'

import { useGetNotificationListQuery } from '../../../features/api/notificationApiSlice'
import { useAuth } from '../../../hooks/useAuth'

export default function NotificationsTab() {
  const currentUser = useAuth()

  const [searchParams] = useSearchParams()
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
  const { data: notificationData, isSuccess } = useGetNotificationListQuery()
  console.log(notificationData)
  const { PaginateComponent } = usePagination(
    notificationData?.data?.totalPages,
    filters.page,
    setCurrentPage
  )
  // const notificationList = isFullListAllowed ? data?.data : data?.data?.slice(0, 9)

  return (
    <div className="col-12 col-md-12 col-lg-9 col-xl-9 mx-xl-3 px-lg-3 px-2">
      <div className="bg-lite pb-4">
        <div className="row px-xl-5 px-md-3 px-2">
          <div className="col-12 pt-3 text-start">
            <h4 className="fw-bold m-0">Notifications</h4>
          </div>
        </div>
        <hr />
        <div className="row px-xl-5 px-md-3 px-2">
          {isSuccess &&
            notificationData?.data?.results.slice(0, 9).map((list: any) => (
              <div
                key={list.id}
                className={classNames({
                  'col-12 col-xl-12': true,
                  'bg-bisque': !list.isRead
                })}
              >
                <div className="row curs_point">
                  <div className="col-12 col-md-10 col-md-10 col-xl-10 m-0">
                    <p className="h6 m-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="orange"
                        className="bi bi-bell-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                      </svg>
                      &nbsp;{list.senderFirstName}&nbsp;{list.senderLastName}
                      {list.notificationText}
                    </p>
                  </div>
                  <div className="col-12 col-md-2 col-xl-2 text-end m-0 mt-2 mt-md-0 mt-xl-0">
                    <p className="text-secondary h6 m-0">{list.timeSince}</p>
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </div>
        <PaginateComponent />
      </div>
    </div>
  )
}
