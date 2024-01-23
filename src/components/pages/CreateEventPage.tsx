import React, { useState } from 'react'

import classNames from 'classnames'

import Header from '../Header'
import { CREATE_EVENT } from '../../constants/routes'
import CreateEventTabs from '../Tabs/createEventTabs/CreateEventTabs'
import Toaster from '../global/Toaster'
import { useAuth } from '../../hooks/useAuth'

const tabs = [
  {
    value: 1,
    label: 'Basic Info',
    href: CREATE_EVENT.BASIC_INFO
  },
  {
    value: 2,
    label: 'Event Details',
    href: CREATE_EVENT.EVENT_DETAILS
  },
  {
    value: 3,
    label: 'Review and Publish',
    href: CREATE_EVENT.PUBLISH
  }
]
export default function CreateEventPage() {
  const currentUser = useAuth()

  const [navState, setNavState] = useState(CREATE_EVENT.BASIC_INFO)

  const initialEventValues = {
    sellingFor: 'Personal',
    eventTrack: '',
    assetSellingTypeId: undefined,
    adjudicatingAuthority: '',
    assetTypeIds: [],
    assetClassificationIds: [],
    modeOfSale: 'Auction',
    auctionDate: '',
    participationDeadline: '',
    bidSubmissionDeadline: '',
    indicativePrice: '',
    assetLocations: [],
    eventName: '',
    eventBio: '',
    sellerFirstName: '',
    sellerLastName: '',
    corporateDebtor: '',
    authorizedRepresentative: '',
    assetGallery: [],
    assetVideoUrl: [],
    fee: '',
    userId: currentUser?.id,
    confidential: 0
  }
  const [selectedOptions, setSelectedOptions] = useState(initialEventValues)

  return (
    <div className="wrapper overflow-hidden bg-lite">
      <Header />
      <div className="container-fluid">
        <div className="row bg-grey-lite pt-3">
        <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-12 p-0">
            <div className="create_event_tabs d-flex justify-content-center align-items-center">
               <h3 className="m-0 text-center fw-bold pb-5">CREATE AN EVENT</h3>
            </div>
          </div>

          <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-12 p-0">
            <div className="create_event_tabs d-flex justify-content-center align-items-center">
              <ul id="progressbar" className="list-inline w-100 d-flex justify-content-around">
                {tabs.map(({ value, label, href }) => {
                  return (
                    <li
                      key={value}
                      className={classNames({
                        'list-inline-item': true,
                        active: navState === href,
                        done: value < (tabs.find((tab) => tab.href === navState)?.value || 0)
                      })}
                    >
                      <div
                        className={classNames({
                          'text-center d-flex flex-column align-items-center text-lg': true,
                          active: navState === href,
                          done: value < (tabs.find((tab) => tab.href === navState)?.value || 0)
                        })}
                        id="account"
                      >
                        {value < (tabs.find((tab) => tab.href === navState)?.value || 0) ? (
                          <span className="pregress_num mb-3">
                            <i className="fa fa-check"></i>
                          </span>
                        ) : (
                          <span className="pregress_num mb-3">{value}</span>
                        )}
                        <strong>{label}</strong>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-12 my-1">
              <div className="bg-lite pt-3">
                <div className="container-fluid d-flex align-items-center justify-content-center">
                  <CreateEventTabs
                    tab={navState}
                    setNavState={setNavState}
                    selectedOptions={selectedOptions}
                    handleOptionSelect={setSelectedOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </div >
  )
}
