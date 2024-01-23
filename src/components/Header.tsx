import React, { useEffect, useRef, useState } from 'react'
import { createSearchParams, NavLink, useNavigate } from 'react-router-dom'

import { OverlayTrigger } from 'react-bootstrap'

import welcome from '../assets/images/welcome.png'

import { useAuth } from '../hooks/useAuth'
import bidbolilogo from '../assets/images/bidboli.png'
import useOutsideAlerter from '../hooks/useOutsideAlerter'
import { USER_ROUTES, VISITOR_ROUTES, MY_PROFILE } from '../constants/routes'
import { useGetNotificationListQuery } from '../features/api/notificationApiSlice'
import ToolTipPopover from './TooltipPopover'

function Header() {
  const { data: notificationData, isSuccess } = useGetNotificationListQuery()

  const user = useAuth()
  const navigate = useNavigate()

  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const { outsideClicked, setOutsideClicked } = useOutsideAlerter(wrapperRef)

  useEffect(() => {
    if (outsideClicked) setOutsideClicked(false)
    setIsDropdownVisible(false)
  }, [outsideClicked])

  const handleClickAvatar = () => {
    if (user) setIsDropdownVisible(!isDropdownVisible)
    else navigate(VISITOR_ROUTES.LOGIN)
  }

  const handleSearch = () => {
    if (inputRef.current.value)
      navigate({
        pathname: USER_ROUTES.EVENTS,
        search: createSearchParams({
          query: inputRef.current.value
        }).toString()
      })
  }

  const NotificationsList = (
    <ul className="list-unstyled mb-0">
      <div className="px-3 pt-3"><strong> <i className="fa fa-bell"></i> Notifications</strong></div>
      <div className="">
        <hr className='pb-0 mb-0' />
      </div>
      {isSuccess &&
        notificationData?.data?.results.slice(0, 3).map((list: any) => (
          <li key={list.id} className="col-12 col-xl-12 h6 row border-bottom m-0 py-2 pt-3">
            <NavLink to={USER_ROUTES.MY_PROFILE + '/' + MY_PROFILE.NOTIFICATIONS} className="d-flex">
              {/* <img
                className="notification-image"
                src={list.profileImage || welcome}
                height="50px"
                width=" 50px"
                alt="profile_image"
              /> */}
              <div>
                <i className="fa fa-bell d-inline-block me-2"></i>
              </div>
              <div>
                <p className="text-dark mb-2">{list.reciverFirstName} accepted your interested request for event (Plastic ) <br />
                  <span className="curs_point text-secondary d-inline-block mt-2">{list.action}</span>
                </p>
              </div>
            </NavLink>
          </li>
        ))}
      <button className="notification-button">
        <NavLink to={USER_ROUTES.MY_PROFILE + '/' + MY_PROFILE.NOTIFICATIONS}>
          VIEW ALL NOTIFICATIONS
        </NavLink>
      </button>
    </ul>
  )
  return (
    <>

      {/* Header Desktop */}
      <header id="" className="d-none d-xl-block py-2 px-5 shadow-sm bg-lite">
        <div className="container mx-0">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="row">
                <div className="col-3 ps-0">
                  <NavLink to={VISITOR_ROUTES.HOME} id="brandlogo">
                    <img src={bidbolilogo} alt="" />
                  </NavLink>
                </div>

                <div className="col d-flex align-items-center ps-0">
                  <ul className="list-unstyled list-inline mb-0">
                    <li className="list-inline-item mx-3 link-hover">
                      <NavLink to={USER_ROUTES.EVENTS} className="text-dark fw-bold text-sm ">
                        <span>Events</span>
                      </NavLink>
                    </li>
                    <li className="list-inline-item mx-3 link-hover">
                      <a href="./" className="text-dark fw-bold text-sm ">
                        <span>Services</span>
                      </a>
                    </li>
                    <li className="list-inline-item mx-3 link-hover">
                      <a href="./" className="text-dark fw-bold text-sm ">
                        <span>Buy</span>
                      </a>
                    </li>
                    <li className="list-inline-item mx-3 link-hover">
                      <NavLink to={USER_ROUTES.CREATE_EVENT} className="text-dark fw-bold text-sm ">
                        <span>Sell</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-6 position-relative d-flex justify-content-end align-items-center p-0">
              <form>
                <div className="hdr-srch ">
                  <div className="input-group" id="header-search">
                    <input
                      type="text"
                      ref={inputRef}
                      className="form-control border-end-0 bg-primary-lite"
                      placeholder="Event name"
                      aria-label="Event Name"
                      aria-describedby="basic-addon2"
                    />
                    <span
                      role="button"
                      className="input-group-text bg-primary-lite h-100"
                      id="basic-addon2"
                      onClick={handleSearch}
                    >
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </form>
              <ul className="list-unstyled list-inline mb-0 ms-3">
                <li className="list-inline-item">
                  <NavLink
                    to={USER_ROUTES.CREATE_EVENT}
                    className="btn btn-secondary btn-sm d-flex align-items-center justify-content-center rounded-1 btn-header-sell"
                  >
                    Sell Now
                  </NavLink>
                </li>
                <li className="list-inline-item px-3">
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    rootClose={true}
                    overlay={ToolTipPopover({
                      body: NotificationsList
                    })}
                  >
                    <button className="text-dark fs-5 fw-bold border-0 bg-white">
                      <i className="fa fa-bell fs-4"></i>
                    </button>
                  </OverlayTrigger>
                </li>
                <li className="list-inline-item pe-3">
                  <button
                    className="text-dark fs-4 fw-bold border-0 bg-white text-base d-flex align-items-center"
                    onClick={handleClickAvatar}
                  >
                    <i className="fa fa-user-circle fs-3 me-2"></i> {user?.firstName || 'Login'}
                  </button>
                  {isDropdownVisible && (
                    <div className="menu-lg position-relative" ref={wrapperRef}>
                      <div className="position-absolute top-30 start-0 usermenu menubox dropdown pb-3 shadow">
                        <ul className="list-unstyled mb-0">
                          <li className="dropdown-item">
                            <NavLink to={USER_ROUTES.MY_PROFILE}>
                              <span className="pe-1 d-inline-block me-2 text-dark-lite">
                                <i className="ps-1 fa fa-user"></i>
                              </span>
                              My Profile
                            </NavLink>
                          </li>
                          <li className="dropdown-item">
                            <NavLink to={USER_ROUTES.MY_PROFILE + '/' + MY_PROFILE.PROFILE}>
                              <span className="pe-1 d-inline-block me-2 text-dark-lite">
                                <i className="ps-1 fa fa-pencil-alt"></i>
                              </span>
                              Edit Profile
                            </NavLink>
                          </li>
                          <li className="dropdown-item">
                            <NavLink to={USER_ROUTES.MY_PROFILE + '/' + MY_PROFILE.MY_EVENTS}>
                              <span className="pe-1 d-inline-block me-2 text-dark-lite">
                                <i className="ps-1 fa fa-list"></i>
                              </span>
                              My Events
                            </NavLink>
                          </li>
                          <li className="dropdown-item">
                            <NavLink
                              to={USER_ROUTES.MY_PROFILE + '/' + MY_PROFILE.INTERESTED_EVENTS}
                            >
                              <span className="pe-1 d-inline-block me-2 text-dark-lite">
                                <i className="ps-1 fa fa-heart"></i>
                              </span>
                              Interested Events
                            </NavLink>
                          </li>

                          <li className="dropdown-item">
                            <NavLink to={USER_ROUTES.MY_PROFILE + '/' + MY_PROFILE.WATCHLIST}>
                              <span className="pe-1 d-inline-block me-2 text-dark-lite">
                                <i className="ps-1 fas fa-eye"></i>
                              </span>
                              Watchlist
                            </NavLink>
                          </li>
                          <li className="dropdown-item">
                            <NavLink to={USER_ROUTES.LOGOUT}>
                              <span className="pe-1 d-inline-block me-2 text-dark-lite">
                                <i className="ps-1 fa fa-sign-out"></i>
                              </span>
                              Logout
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
