import React, { useState, useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Select from 'react-select'
import * as yup from 'yup'
import dayjs from 'dayjs'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import queryString from 'query-string'

import _ from 'lodash'

import toast from 'react-hot-toast'

import classNames from 'classnames'

import dummyImage from '../../../assets/images/dummy.png'

import {
  useGetEventAvatarsQuery,
  useGetImageUrlMutation,
  useRemoveImageMutation,
  useLazyGetCitiesQuery
} from '../../../features/api/eventsApiSlice'
import CarouselWithThumbs from '../../CarouselWithThumbs'
import ToolTipPopover from '../../TooltipPopover'
import SelectAvatarModal from '../../Modals/SelectAvatarModal'
import { CREATE_EVENT } from '../../../constants/routes'

export default function CreateEventTab({
  setNavState,
  handleOptionSelect,
  selectedOptions
}: {
  setNavState: any
  handleOptionSelect: any
  selectedOptions: any
}) {
  const carouselImages = [
    ...selectedOptions.assetGallery.map((i: any) => {
      return { src: i, type: 'uploaded' }
    }),
    ..._.times(5 - selectedOptions.assetGallery.length, () => {
      return { src: dummyImage, type: 'dummyImage' }
    })
  ]

  const [images, setImages] = useState(carouselImages)
  const [maxLimitReached, setMaxLimitReached] = useState(false)
  const [query, setQuery] = useState('')
  const [citiesList, setCitiesList] = useState([])
  const [citiesType, setCitiesType] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const [getCities] = useLazyGetCitiesQuery()

  const [getImageUrl] = useGetImageUrlMutation()
  const [removeImage] = useRemoveImageMutation()
  const { data: avatars } = useGetEventAvatarsQuery(
    queryString.stringify(
      { assetTypeIds: selectedOptions.assetTypeIds },
      { arrayFormat: 'bracket' }
    )
  )

  useEffect(() => {
    getCities(query)
      .unwrap()
      .then((data) => {
        setCitiesList(data)
        if (selectedOptions.assetLocations.length > 0 && !citiesType.length) {
          setCitiesType(
            data.filter((o: any) =>
              selectedOptions.assetLocations.some(({ id }: { id: any }) => o.id === id)
            )
          )
        }
      })
  }, [query])

  const eventDetailsSchema = yup.object().shape(
    {
      eventName: yup
        .string()
        .required('* Required.')
        .max(250, 'Name should be less than 250 characters.'), // MAX 250
      eventBio: yup
        .string()
        .required('* Required.')
        .max(250, 'Name should be less than 500 characters.'), // MAX 500
      corporateDebtor: yup.string().required('* Required.'),
      modeOfSale: yup.string().required('* Required.'),
      authorizedRepresentative: yup.string().required('* Required.'),
      auctionDate: yup.date().required('* Required.'),
      indicativePrice: yup.number().required('* Required.'),
      assetLocations: yup
        .array()
        .min(1, '* Select atleast one asset location from list.')
        .required('* Select a asset location from list.')
    },
    [
      ['assetSellingTypeId', 'assetSellingTypeId'],
      ['adjudicatingAuthority', 'adjudicatingAuthority']
    ]
  )

  async function handleImageUpload(event: any) {
    const formData = new FormData()
    formData.append('file', event.target.files[0])

    toast.promise(getImageUrl(formData), {
      loading: 'Uploading...',
      success: (data: Record<string, any>) => {
        if (data.status === true) event.target.value = null
        const prevImages = [...images]
        const index = prevImages.findIndex((el) => el.type === 'dummyImage')

        if (index > -1) {
          prevImages.splice(index, 1, { src: data.data.data.url, type: 'uploaded' })
          setImages(prevImages)
          return 'Successfully uploaded.'
        }
        setMaxLimitReached(true)
        return 'Maximum 5 images can be uploaded.'
      },
      error: 'Error while uploading the image.'
    })
  }

  async function handleRemoveImage(image: any) {
    toast.promise(removeImage(image), {
      loading: 'Deleting...',
      success: (data: Record<string, any>) => {
        if (data.data.status) {
          const prevImages = [...images]
          prevImages.splice(
            prevImages.findIndex((i) => i.src === image),
            1,
            { src: dummyImage, type: 'dummyImage' }
          )
          setImages(prevImages)
        }
        return 'Image successfully deleted.'
      },
      error: 'Error while deleting the image.'
    })
  }

  function handleListChange(value: string) {
    if (value.length > 2) {
      const debouncedSetState = _.debounce(function () {
        setQuery(value)
      }, 500)
      debouncedSetState()
    }
  }

  function handleSetOpen() {
    setOpen(true)
  }
  return (
    <>
      <Formik
        initialValues={selectedOptions}
        validationSchema={eventDetailsSchema}
        onSubmit={(data) => {
          const assetGallery = images.filter((image) => image.type === 'uploaded').map((i) => i.src)

          if (assetGallery?.length > 0) {
            handleOptionSelect((currValues: any) => {
              return {
                ...currValues,
                ...data,
                participationDeadline: dayjs(data?.auctionDate).add(-1, 'day').format('YYYY-MM-DD'),
                assetGallery
              }
            })
            setNavState(CREATE_EVENT.PUBLISH)
          } else {
            handleSetOpen()
          }
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="container px-lg-2 px-xl-5">
                <div className="row mx-xl-5 px-xl-5 flex-column-reverse flex-lg-row flex-xl-row">
                  <div className="col-12 col-md-12 col-lg-5 col-xl-5">
                    <div id="uploadimgbox" className="h-50 w-100 text-center mb-5">
                      <CarouselWithThumbs
                        images={images.map((i) => i.src)}
                        imagesType={images}
                        maxLimitReached={maxLimitReached}
                        type="input"
                        handleRemoveImage={handleRemoveImage}
                        setImageList={handleImageUpload}
                      />
                    </div>
                    <div className="bg-lite mt-0">
                      <div className="row mt-2">
                        <div className="col-12 px-4">
                          <div className="row mt-5">
                            <div className="mx-0 px-0">
                              <strong>OR Enter Video URL</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="evnt-videourlbox" className="row mt-2 ">
                        <div className="col-12 col-md-12 col-xl-12">
                          <p className="text-secondary">
                            Enter Vimeo/Youtube video URL to show video tour of assets instead of
                            images.
                          </p>
                        </div>
                        <div className="col-12 col-md-12 col-xl-12">
                          <div className="input-group mb-3 vinput ">
                            <Field
                              as="input"
                              type="text"
                              className="form-control py-2 g-primary-lite"
                              name="assetVideoUrl"
                              id="assetVideoUrl"
                              placeholder="Enter YouTube/Vimeo video URL"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-12 col-xl-12">
                          <div className="form-check">
                            <input
                              className="accent-checkbox form-check-input"
                              type="checkbox"
                              name="price_confidental"
                              id="price_confidental"
                            />
                            <label className="sm_tex pointer" htmlFor="price_confidental">
                              I want professional services from
                              <b> BIDBOLI</b>`s trained photography and videography teams.*
                              <a href="/" className="fw-bold">
                                Know More
                              </a>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-7 col-xl-7">
                    <div className="row">
                      <div className="col-12 col-xl-12">
                        <div className="input-group mb-3 vinput">
                          <Field
                            as="input"
                            type="text"
                            className="form-control py-2 bg-primary-lite"
                            name="eventName"
                            id="eventName"
                            placeholder="Event Name"
                          />
                        </div>
                        <ErrorMessage
                          name="eventName"
                          component="div"
                          className="text-danger text-xs italic errmsg"
                        />
                        <div className="input-group mb-3 vinput">
                          <Field
                            as="input"
                            type="text"
                            name="eventBio"
                            id="eventBio"
                            className="form-control py-2 bg-primary-lite"
                            placeholder="Event Description"
                          />
                        </div>
                        <ErrorMessage
                          name="eventBio"
                          component="div"
                          className="text-danger text-xs italic errmsg"
                        />
                        <div className="input-group mb-3 vinput">
                          <Field
                            as="input"
                            type="text"
                            className="form-control py-2 bg-primary-lite"
                            name="corporateDebtor"
                            id="corporateDebtor"
                            placeholder="Corporate Debtor"
                          />
                        </div>
                        <ErrorMessage
                          name="corporateDebtor"
                          component="div"
                          className="text-danger text-xs italic errmsg"
                        />
                        <div className="input-group mb-3 vinput">
                          <Field
                            as="input"
                            type="text"
                            className="form-control py-2 bg-primary-lite"
                            name="authorizedRepresentative"
                            id="authorizedRepresentative"
                            placeholder="Authorized representative"
                          />
                        </div>
                        <ErrorMessage
                          name="corporateDebtor"
                          component="div"
                          className="text-danger text-xs italic errmsg"
                        />
                        <div className="input-group mb-3 vinput">
                          <Field
                            as="input"
                            type="number"
                            className="form-control py-2 bg-primary-lite"
                            name="indicativePrice"
                            id="indicativePrice"
                            placeholder="Indicative Price (INR)"
                          />
                        </div>
                        <ErrorMessage
                          name="indicativePrice"
                          component="div"
                          className="text-danger text-xs italic errmsg"
                        />
                        <div className="form-check mb-3 mt-1">
                          <Field
                            as="input"
                            className="accent-checkbox form-check-input py-2 bg-primary-lite"
                            type="checkbox"
                            name="confidential"
                            id="confidential"
                            checked={!!values.confidential}
                          />
                          <label htmlFor="confidential">Make price confidential</label>
                        </div>
                        <div className="col-12 text-center text-xl-start">
                          <div className="row">
                            <div className="col-12 my-1 text-md-start text-xl-start">
                              <Select
                                name="assetLocations"
                                className="bg-primary-lite  mb-3"
                                onChange={(assetLocations) => {
                                  setFieldValue('assetLocations', [...assetLocations])
                                  setCitiesType([...assetLocations])

                                  setQuery('')
                                }}
                                options={citiesList}
                                isMulti
                                placeholder="Please select locations from the list"
                                value={citiesType}
                                onInputChange={handleListChange}
                              />
                              <ErrorMessage
                                name="assetLocations"
                                component="div"
                                className="text-danger text-xs italic errmsg"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row d-flex justify-content-start mt-xl-3">
                          <div className="col-12 col-xl-12">
                            <h4 className="fw-bold">Select mode of sale</h4>
                          </div>
                          <div className="col-12 col-md-6 col-xl-6 text-center text-xl-start pe-xl-1 my-1">
                            <Field
                              as="div"
                              className={classNames({
                                'p-3 border border-dark shadow-none fs-6 fw-normal text-xl-start mx-md-1':
                                  true,
                                asset_but: values.modeOfSale === 'Auction'
                              })}
                              name="modeOfSale"
                              id="modeOfSale"
                              onClick={() => setFieldValue('modeOfSale', 'Auction')}
                            >
                              Auction
                            </Field>
                          </div>

                          <div className="col-12 col-md-6 col-xl-5 my-1 text-md-start text-xl-start">
                            <Field
                              as="div"
                              className={classNames({
                                'p-3 border border-dark shadow-none fs-6 fw-normal text-xl-start mx-md-1':
                                  true,
                                asset_but: values.modeOfSale === 'Privately'
                              })}
                              name="modeOfSale"
                              id="modeOfSale"
                              onClick={() => setFieldValue('modeOfSale', 'Privately')}
                            >
                              Privately
                            </Field>
                          </div>
                          <ErrorMessage
                            name="modeOfSale"
                            component="div"
                            className="text-danger text-xs italic errmsg"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6 col-xl-6 text-center text-xl-start mt-3 pe-xl-1">
                          <div className="col-12 col-xl-12">
                            <h4 className="fw-bold">
                              {values.modeOfSale === 'Auction'
                                ? 'Auction date'
                                : 'Bid submission deadline'}
                            </h4>
                          </div>
                          <div className="input-group ps-xl-0 vinput mb-3">
                            <Field
                              as="input"
                              type="date"
                              className="form-control py-2 bg-primary-lite"
                              name={
                                values.modeOfSale === 'Auction'
                                  ? 'auctionDate'
                                  : 'bidSubmissionDeadline'
                              }
                              id={
                                values.modeOfSale === 'Auction'
                                  ? 'auctionDate'
                                  : 'bidSubmissionDeadline'
                              }
                              min={dayjs().format('YYYY-MM-DD')}
                            />
                          </div>
                          <ErrorMessage
                            name={
                              values.modeOfSale === 'Auction'
                                ? 'auctionDate'
                                : 'bidSubmissionDeadline'
                            }
                            component="div"
                            className="text-danger text-xs italic errmsg"
                          />
                        </div>
                        {values.participationDeadline && (
                          <div className="col-12 col-md-6 col-xl-6 text-center text-xl-start mt-3 pe-xl-1">
                            <div className="col-12 col-xl-12">
                              <h4 className="fw-bold">Participation deadline</h4>
                            </div>
                            <div className="input-group ps-xl-2 vinput mb-3">
                              <Field
                                as="input"
                                type="date"
                                className="form-control py-2 bg-primary-lite"
                                name="participationDeadline"
                                id="participationDeadline"
                                min={dayjs().format('YYYY-MM-DD')}
                              />
                            </div>
                            <ErrorMessage
                              name="participationDeadline"
                              component="div"
                              className="text-danger text-xs italic errmsg"
                            />
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6 col-xl-6 pe-0">
                          <div className="form-check mt-1 mb-3">
                            <Field
                              as="input"
                              className="accent-checkbox form-check-input py-2 bg-primary-lite"
                              type="checkbox"
                              name="seperateParticipationDeadline"
                              id="seperateParticipationDeadline"
                              checked={!!values.participationDeadline}
                              onChange={() =>
                                setFieldValue(
                                  'participationDeadline',
                                  !values.participationDeadline
                                )
                              }
                            />
                            <label
                              className="sm_tex pointer"
                              htmlFor="seperateParticipationDeadline"
                            >
                              Include a separate <strong>participation deadline</strong>
                            </label>
                            <OverlayTrigger
                              trigger="click"
                              placement="bottom"
                              rootClose={true}
                              overlay={ToolTipPopover({
                                title: 'Participation deadline',
                                body: 'Buyers will not be able to express interest in your event after this date. By default, the participation deadline is set as 1 day before the auction date. You may change it here.'
                              })}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-question-circle ms-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                              </svg>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-xl-12 text-center text-xl-start">
                          <div className="row">
                            <div className="col-12 col-md-5 col-xl-5 my-1">
                              <div
                                className="btn btn-lite border border-dark shadow-none w-100 fs-4 fw-bold text-center"
                                onClick={() => {
                                  handleOptionSelect((currValues: any) => {
                                    return { ...currValues, ...values }
                                  })
                                  setNavState(CREATE_EVENT.BASIC_INFO)
                                }}
                              >
                                Go Back
                              </div>
                            </div>
                            <div className="col-12 col-md-7 col-xl-7 my-1">
                              <button
                                type="submit"
                                className="btn btn-secondary shadow-none asset_but fs-4  w-100 fw-bold text-center"
                              >
                                Create Event
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
      {open && (
        <SelectAvatarModal
          handleOptionSelect={handleOptionSelect}
          avatars={avatars}
          show={open}
          handleClose={() => setOpen(false)}
          images={images}
          setImages={setImages}
        />
      )}
    </>
  )
}
