import { Field, Form, Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { CREATE_EVENT } from '../../../constants/routes'
import { useCreateEventMutation } from '../../../features/api/eventsApiSlice'
import { useAuth } from '../../../hooks/useAuth'
import { calculateFee, formatDate, roundToCrores } from '../../../utils/helper'

import CarouselWithThumbs from '../../CarouselWithThumbs'

export default function PublishTab({
  handleOptionSelect,
  selectedOptions,
  setNavState
}: {
  handleOptionSelect: any
  selectedOptions: any
  setNavState: any
}) {
  const [createEvent] = useCreateEventMutation()
  const user = useAuth()

  const { listingFee, bidboliFee } = calculateFee(selectedOptions.indicativePrice)

  function handleSubmit() {
    toast.promise(
      createEvent({
        ...selectedOptions,
        sellerFirstName: user?.firstName,
        sellerLastName: user?.lastName
      }),
      {
        loading: 'Creating...',
        success: (data: Record<string, any>) => {
          if (data.data.status) {
            return 'Event successfully created.'
          }

          return data.data.msg
        },
        error: 'Error while creating the event.'
      }
    )
  }

  return (
    <section className="">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-0">
            <div className="bg-lite pt-3">
              <div className="container px-2">
                <div className="row mx-xl-5">
                  <div className="col-12 col-md-12 col-lg-12 col-xl-8 px-xl-4 px-md-4 px-lg-5">
                    <div className="row bg-primary-lite py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Event Name</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h5 fw-bold">{selectedOptions.eventName}</p>
                      </div>
                    </div>
                    <div className="row py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Description</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h6 lh-base">{selectedOptions.eventBio}</p>
                      </div>
                    </div>
                    <div className="row bg-primary-lite py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Selling as</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h6">{selectedOptions.sellingFor}</p>
                      </div>
                    </div>
                    <div className="row py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Framework</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h6">Contractual Term</p>
                      </div>
                    </div>
                    <div className="row bg-primary-lite py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Adjudicating Authority</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h6">{selectedOptions?.adjudicatingAuthority}</p>
                      </div>
                    </div>
                    <div className="row py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Corporate Debtor</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h6">{selectedOptions?.corporateDebtor}</p>
                      </div>
                    </div>
                    <div className="row bg-primary-lite py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Authorized Representative</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h6">{selectedOptions?.authorizedRepresentative}</p>
                      </div>
                    </div>
                    <div className="row py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Indicative Price</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="fw-bold m-0 h6">
                          ₹{roundToCrores(Number(selectedOptions?.indicativePrice))}
                        </p>
                      </div>
                    </div>
                    <div className="row bg-primary-lite py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 fw-bold h6">Bidboli Fee</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 fw-bold h6">
                          ₹{roundToCrores(Number(selectedOptions?.indicativePrice))}
                        </p>
                      </div>
                    </div>
                    <div className="row py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Asset Locations:</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        {selectedOptions.assetLocations?.map((loc: any) => (
                          <span key={loc.id} className="border-0 rounded-pill sm_tex px-2 py-1">
                            {loc.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="row bg-primary-lite py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Mode of Scale:</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h6">{selectedOptions?.modeOfSale}</p>
                      </div>
                    </div>
                    <div className="row py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Auction Date</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        <p className="m-0 h6">{formatDate(selectedOptions?.auctionDate)}</p>
                      </div>
                    </div>
                    <div className="row bg-primary-lite py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Participation Deadline</p>
                      </div>
                      {selectedOptions?.participationDeadline && (
                        <div className="col-12 col-md-9 col-xl-8">
                          <p className="m-0 h6">
                            {formatDate(selectedOptions?.participationDeadline) || 'Null'}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="row py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Asset Type</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        {selectedOptions.assetTypeIds.map((id: any) => (
                          <span key={id} className="border-0 rounded-pill sm_tex px-xl-2 py-xl-1">
                            {id}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="row bg-primary-lite py-3">
                      <div className="col-12 col-md-3 col-xl-4">
                        <p className="text-secondary m-xl-0 h6">Asset Classification</p>
                      </div>
                      <div className="col-12 col-md-9 col-xl-8">
                        {selectedOptions.assetClassificationIds.map((id: any) => (
                          <span key={id} className="border-0 rounded-pill sm_tex px-xl-2 py-xl-1">
                            {id}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-xl-4 px-xl-4 mt-4 mt-xl-0 px-md-4 px-lg-5 px-xl-0">
                    <div className="row pt-2 px-2 px-xl-2 px-md-5 px-lg-5 mx-lg-5 mx-xl-0 px-xl-0">
                      <CarouselWithThumbs images={selectedOptions.assetGallery} />
                      <Formik
                        initialValues={{ accept: false }}
                        validationSchema={yup.object({
                          accept: yup
                            .boolean()
                            .oneOf([true], '*You must accept the terms and conditions')
                        })}
                        onSubmit={handleSubmit}
                      >
                        {({ values, setFieldValue }) => {
                          return (
                            <Form>
                              <div className="row pt-4 px-md-5 px-xl-0 mx-lg-5 mx-xl-0">
                                <div className="col-12 col-md-8 col-xl-8 mb-2 ">
                                  <h2 className="fw-bold">BIDBOLI FEES</h2>
                                </div>
                                <div className="row">
                                  <div className="col-8 col-md-8 col-xl-6">
                                    <p className="h6">Event Listing Fees</p>
                                  </div>
                                  <div className="col-4 col-md-4 col-xl-6 text-xl-end">
                                    <p className="fw-bold">{listingFee}</p>
                                  </div>
                                  <div className="col-8 col-md-8 col-xl-6">
                                    <p className="h6">Commission FEE (2%)</p>
                                  </div>
                                  <div className="col-4 col-md-4 col-xl-6 text-xl-end">
                                    <p className="fw-bold">{bidboliFee}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="row px-md-5 px-xl-0 mx-lg-5 mx-xl-0">
                                <div className="col-12 col-md-12 col-xl-12">
                                  Know more about BIDBOLI fees
                                </div>
                              </div>
                              <div className="row mt-xl-4 mt-3 px-md-5 px-xl-0 mx-lg-4 mx-xl-0">
                                <div className="col-11 col-md-11 col-lg-11 col-xl-11 p-0 pe-1 ps-3 d-flex">
                                  <Field
                                    as="input"
                                    className="accent-checkbox form-check-input py-2 bg-primary-lite me-2 cursor-pointer"
                                    type="checkbox"
                                    name="accept"
                                    id="accept"
                                    checked={!!values.accept}
                                    onChange={() => setFieldValue('accept', !values.accept)}
                                  />
                                  <label className="sm_tex" htmlFor="accept">
                                    <p className="h6">
                                      I agree to abide by bidboli`s terms of use and privacy policy
                                    </p>{' '}
                                  </label>
                                </div>
                              </div>
                              <div className="row px-md-5 px-xl-0 mx-lg-5 mx-xl-0">
                                <div className="col-12 col-md-12 col-lg-12 col-xl-12 pt-xl-3 pt-3">
                                  <button
                                    className="btn btn-secondary w-100 rounded"
                                    onClick={handleSubmit}
                                    type="submit"
                                  >
                                    <h2 className="m-0 fw-bold">Publish Event</h2>
                                  </button>
                                </div>
                                <div className="col-12 col-md-12 col-lg-12 col-xl-12 pt-xl-4 pt-3">
                                  <button
                                    className="btn shadow-none w-100 rounded border border-dark"
                                    onClick={() => {
                                      handleOptionSelect(selectedOptions)
                                      setNavState(CREATE_EVENT.BASIC_INFO)
                                    }}
                                  >
                                    <h3 className="m-0 fw-bold">Edit Details</h3>
                                  </button>
                                </div>
                              </div>
                            </Form>
                          )
                        }}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
