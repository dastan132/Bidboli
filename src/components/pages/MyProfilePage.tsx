import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { NavLink } from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'
import { MY_PROFILE } from '../../constants/routes'
import MyProfileTabs from '../Tabs/myProfileTabs/MyProfileTabs'
import Toaster from '../global/Toaster'
import { useGetUserDetailsQuery } from '../../features/api/userApiSlice'

const tabs = [
  {
    value: 1,
    label: 'My Profile',
    href: MY_PROFILE.PROFILE,
    icon: 'fa fa-list'
  },
  {
    value: 7,
    label: 'Notifications',
    href: MY_PROFILE.NOTIFICATIONS,
    icon: 'fa fa-bell'
  },
  {
    value: 3,
    label: 'My Events',
    href: MY_PROFILE.MY_EVENTS,
    icon: 'fa fa-calendar-week'
  },
  {
    value: 4,
    label: 'Company Profile',
    href: MY_PROFILE.COMPANY_PROFILE,
    icon: 'fa fa-person'
  },
  {
    value: 5,
    label: 'Interested Events',
    href: MY_PROFILE.INTERESTED_EVENTS,
    icon: 'fa fa-calendar'
  },
  {
    value: 6,
    label: 'Watchlist',
    href: MY_PROFILE.WATCHLIST,
    icon: 'fa fa-stopwatch'
  },

  {
    value: 2,
    label: 'Preferences',
    href: MY_PROFILE.PREFRENCES,
    icon: 'fa fa-gear'
  }
]

export default function MyProfilePage() {
  const { data } = useGetUserDetailsQuery()
  //console.log(data)

  const { pathname } = useLocation()
  const path = pathname.split('/')

  const [selectedOptions, setSelectedOptions] = useState({})
  const [currentTab, setCurrentTab] = useState(path[path.length - 1])


  function handleOptionSelect(type: any, value: any) {
    setSelectedOptions((currentOptions) => ({ ...currentOptions, type: value }))
  }
  console.log(selectedOptions)

  const userData: any = data?.data

  return (
    <div className="wrapper overflow-hidden">
      <div className="container-fluid">
        <Header />
        <section className="pt-5">
          <div className="container-fluid p-0 mx-xl-5 ps-lg-3 ps-xl-5">
            <div className="row">
              <div className="col-12 col-lg-3 col-xl-2 p-0">
                <div className="bg-lite pt-3">
                  <ul className="p-0">
                    <div className="row">
                      <div className="col-xl-12 display_slid user_sidebar">
                        <div className="bg-primary-lite lite_blue_box mx-3 mb-4">
                          <div>
                            <img src={userData?.profileImage} alt="/" />
                          </div>
                        </div>
                        {tabs.map(({ value, label, href, icon }) => (
                          
                          <NavLink
                            className="py-3 d-block"
                            key={value}
                            style={({ isActive }) =>
                              isActive || href === currentTab
                                ? { backgroundColor: '#FF663E', color: '#FFFFFF' }
                                : undefined
                            }
                            id="account"
                            to={`/myProfile/${href}`}
                            onClick={() => setCurrentTab(href)}
                          >
                            <div
                              className="h6 m-0 ps-3 navLink-div "
                              style={
                                href === currentTab ? { backgroundColor: '', color: '' } : undefined
                              }
                            >
                              <span className="pe-3 d-inline-block me-2 text-dark-lite">
                                <i className={'ps-1 ' + icon}></i>
                              </span>
                              {label}
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
              <MyProfileTabs tab={currentTab} handleOptionSelect={handleOptionSelect} />
            </div>
          </div>
        </section>
        <Footer />
        <Toaster />
      </div>
    </div>
  )
}
