import React from 'react'

import { CREATE_EVENT } from '../../../constants/routes'
import BasicInfoTab from './BasicInfoTab'
import CreateEventTab from './CreateEventTab'
import PublishTab from './PublishTab'

interface CreateEventTabsProps {
  tab: any
  handleOptionSelect?: any
  setNavState?: any
  selectedOptions?: any
}

function Tab({
  tabID,
  setNavState,
  handleOptionSelect,
  selectedOptions
}: {
  tabID: any
  setNavState: any
  handleOptionSelect: any
  selectedOptions: any
}) {
  const props = {
    setNavState,
    handleOptionSelect,
    selectedOptions
  }
  if (tabID === CREATE_EVENT.EVENT_DETAILS) {
    return <CreateEventTab {...props} />
  } else if (tabID === CREATE_EVENT.PUBLISH) {
    return <PublishTab {...props} />
  }
  return <BasicInfoTab {...props} />
}

export default function CreateEventTabs({
  tab,
  setNavState,
  selectedOptions,
  handleOptionSelect
}: CreateEventTabsProps) {
  return (
    <Tab
      tabID={tab}
      setNavState={setNavState}
      selectedOptions={selectedOptions}
      handleOptionSelect={handleOptionSelect}
    />
  )
}
