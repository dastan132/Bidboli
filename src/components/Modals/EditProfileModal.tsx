import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import * as yup from 'yup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import icon from '../../assets/images/icons/png/x.svg'

import {
  useUpdateProfileApiMutation,
  useLazyGetCountryApiQuery
} from '../../features/api/userApiSlice'
import { useAuth } from '../../hooks/useAuth'
import { useGetImageUrlMutation } from '../../features/api/eventsApiSlice'
import Select from 'react-select'
import _ from 'lodash'
import toast from 'react-hot-toast'

export default function EditProfileModal({
  doneEdit,
  handleOptionSelect,
  selectedOptions
}: {
  doneEdit: any
  handleOptionSelect: any
  selectedOptions: any
}) {
  const user = useAuth()
  const [UpdateProfile] = useUpdateProfileApiMutation()
  const [getImageUrl] = useGetImageUrlMutation()

  const [getCountryApi] = useLazyGetCountryApiQuery()

  //const [isOpen, setOpen] = useState(false)

  const [profileImages, setProfileImages] = useState('')
  const [query, setQuery] = useState('')
  const [countryList, setCountryList] = useState<any>([])
  const [countryType, setCountryType] = useState<any>([])

  useEffect(() => {
    getCountryApi()
      .unwrap()
      .then((data: any) => {
        setCountryList(data)
        if (selectedOptions.countryCode?.length > 0 && !countryList?.length) {
          setCountryType(
            data.filter((o: any) =>
              selectedOptions.countryCode.some(({ id }: { id: any }) => o.id === id)
            )
          )
        }
      })
  }, [countryList.length, getCountryApi, query, selectedOptions.countryCode])

  async function onUpdateToApi(event: any) {
    const formData = new FormData()
    formData.append('file', event.target.files[0])

    const imageResult: any = await getImageUrl(formData)
    setProfileImages(imageResult.data.data.url)
  }

  function handleListChange(value: string) {
    if (value.length > 2) {
      const debouncedSetState = _.debounce(function () {
        setQuery(value)
      }, 500)
      debouncedSetState()
    }
  }

  const handelProfileUpdate = async (values: any) => {
    toast.promise(UpdateProfile(values), {
      loading: 'Uploading...',
      success: 'Successfully uploaded information',
      error: 'Error'
    })

    console.log(countryType[0].phonecode, 'ashgklhkjd')
    let result: Record<string, any> = await UpdateProfile({
      countryCode: countryType[0].isoCode,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobileNo: values.mobileNo,
      address: values.address,
      userId: user.id,
      profileImage: profileImages
    })
    console.log(result)
    doneEdit(false)
  }
  const profileSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(1, '* Too Short!')
      .max(15, '* Too Long!')
      .required('* Enter Your Name'),
    lastName: yup
      .string()
      .min(1, '* Too Short!')
      .max(15, ' * Too Long!')
      .required('* Enter Your Name'),
    email: yup.string().email('* Invalid email').required('* Enter Your Email'),
    mobileNo: yup
      .number()
      .min(0, '* Please Enter your Contact Number')
      .required('* Please Enter your Contact Number'),
    address: yup.string().min(10).required('* Enter Your Complete Address').max(200),
    countryCode: yup
      .array()
      .min(1, '* Select your Country name from list.')
      .required('* Select your Country name from list.')
  })
  return (
    <Modal
      open={true}
      className="modal fade"
      show={doneEdit}
      centered={true}
      size="lg"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      centeredbackdrop="static"
      keyboard={false}
    >
      {/* <Modal.Body> */}
      <div>
        <div className="bg-lite px-xl-4 px-3 pb-4 profile-container">
          <div className="row ">
            <div className="col-12 pt-3 text-center text-xl-start">
              <h4 className="fw-bold m-0">Edit Profile</h4>
              <div className=" text-center text-md-end text-xl-end my-2 px-3">
                <button type="button" className=" btn-secondary " onClick={() => doneEdit(false)}>
                  <p className="m-0 ">
                    {/* <img src={icon} alt="#" />
                    {''} */}
                    <i className="fa-solid fa-xmark"></i>
                  </p>
                </button>
              </div>
            </div>
          </div>
          <hr />
          <Formik
            initialValues={{
              firstName: '',
              countryCode: '',
              lastName: '',
              email: '',
              mobileNo: '',
              address: '',
              profileImage: ''
            }}
            //validationSchema={profileSchema}
            onSubmit={handelProfileUpdate}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <div className="row">
                    <div className="col-12 col-md-6 col-xl-6 text-center text-md-start text-xl-start mt-md-2">
                      <h4 className="text-secondary fw-bold">Personal Information</h4>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
                      <p className="text-secondary m-0">Name</p>
                      <p className="text-dark h6">
                        <Field
                          as="input"
                          type="text"
                          id="first_Name"
                          name="firstName"
                          placeholder="Reset First Name"
                        />
                      </p>
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-danger ps-3 pt-2 text-xs italic"
                      />
                      <p className="text-dark h6">
                        <Field
                          as="input"
                          type="text"
                          id="last_Name"
                          name="lastName"
                          placeholder="Reset Last Name"
                        />
                      </p>
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-danger ps-3 pt-2 text-xs italic"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
                      <p className="text-secondary m-0">Email</p>
                      <p className="text-dark h6">
                        <Field
                          as="input"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Reset Email Address"
                        />
                      </p>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger ps-3 pt-2 text-xs italic"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
                      <p className="text-secondary m-0">Contact Number</p>
                      <p className="text-dark h6">
                        <Field
                          as="input"
                          type="number"
                          id="mobile_No"
                          name="mobileNo"
                          placeholder="Enter your contact number"
                        />
                      </p>
                      <ErrorMessage
                        name="mobileNo"
                        component="div"
                        className="text-danger ps-3 pt-2 text-xs italic"
                      />
                    </div>
                    <hr />
                    <div>
                      <div className="col-6 col-xl-7 ps-xl-3 ps-2">
                        <h5 className="fw-bold">Upload Profile Image</h5>
                        <input
                          type="file"
                          id="profile_Image"
                          name="profileImage"
                          placeholder="Upload a profile image"
                          onChange={onUpdateToApi}
                        />
                        <img src={profileImages} alt="" width={200} />
                      </div>
                    </div>

                    <div className="row d-flex justify-content-center mt-xl-5 mt-md-5 mt-4">
                      <div className="col-12 col-xl-12">
                        <p className="h6 fw-bold">Select Country</p>
                      </div>

                      <div className="col-12 my-1 text-md-start text-xl-start">
                        <Select
                          key={countryType.id}
                          name="countryCode"
                          id="country_Code"
                          className="bg-primary-lite  mb-3"
                          isMulti
                          options={countryList}
                          placeholder="Please select locations from the list"
                          onChange={(countryCode) => {
                            setFieldValue('countryCode', [...countryCode])
                            setCountryType([...countryCode])

                            setQuery('')
                          }}
                          value={countryType}
                          onInputChange={handleListChange}
                        />

                        <ErrorMessage
                          name="countryCode"
                          component="div"
                          className="text-danger ps-3 pt-2 text-xs italic"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-12 mt-xl-4 pt-2 pt-xl-0">
                      <p className="text-secondary m-0">Address</p>
                      <p className="text-dark h6">
                        <Field
                          as="textarea"
                          type="address"
                          id="address"
                          name="address"
                          placeholder="Full Address"
                        />
                      </p>
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-danger ps-3 pt-2 text-xs italic"
                      />
                    </div>
                  </div>
                  <div>
                    <Modal.Footer>
                      <Button className="m-0 fw-normal" type="submit" variant="secondary">
                        Done
                      </Button>
                    </Modal.Footer>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      {/* </Modal.Body> */}
    </Modal>
  )
}
