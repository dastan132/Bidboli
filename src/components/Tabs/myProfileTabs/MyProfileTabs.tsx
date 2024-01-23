import React from 'react'

import { MY_PROFILE } from '../../../constants/routes'

import Toaster from '../../global/Toaster'
import CompanyProfileTab from './CompanyProfileTab'
import InterestedEventsTab from './InterestedEventsTab'
import MyEventTab from './MyEventsTab'
import NotificationsTab from './NotificationsTab'
import WatchListTab from './WatchListTab'
import ProfileTab from './ProfileTab'
import PrefrencesTab from './PrefrencesTab'
interface MyProfileTabsProps {
  tab: any
  handleOptionSelect?: any
}

function Tab({ tabID }: { tabID: any }) {
  if (tabID === MY_PROFILE.NOTIFICATIONS) {
    return <NotificationsTab />
  } else if (tabID === MY_PROFILE.PREFRENCES) {
    return <PrefrencesTab />
  } else if (tabID === MY_PROFILE.COMPANY_PROFILE) {
    return <CompanyProfileTab />
  } else if (tabID === MY_PROFILE.INTERESTED_EVENTS) {
    return <InterestedEventsTab />
  } else if (tabID === MY_PROFILE.WATCHLIST) {
    return <WatchListTab />
  } else if (tabID === MY_PROFILE.MY_EVENTS) {
    return <MyEventTab />
  }
  return <ProfileTab />
}

export default function MyProfileTabs({ tab }: MyProfileTabsProps) {
  return (
    <>
      <Tab tabID={tab} />
      <Toaster />
    </>
  )
}
