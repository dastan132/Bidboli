import React from 'react'
import { createSearchParams, NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { ErrorMessage, Form, Field, Formik } from 'formik'
import { Helmet } from 'react-helmet'

import toast from 'react-hot-toast'

import bidboliImg from '../../assets/images/bidboli.png'
import { useRegisterUserMutation } from '../../features/api/entryApiSlice'

import { VISITOR_ROUTES } from '../../constants/routes'
import { useUserContext } from '../../context/UserContext'
import Toaster from '../global/Toaster'

export default function RegistrationPage() {
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation()
  const navigate = useNavigate()

  const { setCurrentUser } = useUserContext()

  const clientSchema = yup.object({
    firstName: yup.string().required('*First name is required'),
    lastName: yup.string().required('*Last name is required'),
    emailId: yup.string().email('*Invalid email address').required('*Email is required'),
    password: yup.string().required('*Password is required'),
    agree: yup.boolean().oneOf([true], '*You must accept the terms and conditions')
  })

  async function handleRegisterUser(values: any) {
    const result: Record<string, any> = await registerUser(values)

    localStorage.setItem('user', JSON.stringify(result?.data.user))
    localStorage.setItem('accessToken', result?.data.accessToken)
    setCurrentUser(result?.data.user)

    if (result.data.user) {
      navigate({
        pathname: VISITOR_ROUTES.VERIFY_OTP,
        search: createSearchParams({
          emailId: values.emailId
        }).toString()
      })
    } else toast.error(result.data.msg)
  }

  return (
    <>
      <Helmet>
        <title>Register here!</title>
      </Helmet>
      <div className="wrapper overflow-hidden m-0">
        <div className="container-fluid">
          <div className="row d-flex flex-column-reverse flex-md-row flex-lg-row flex-xl-row">
            <div className="col-12 col-md-6 col-xl-6 p-0">
              <div className="bg-primary-dark blue_box_hei">
                <div className="row d-flex justify-content-center align-items-center mx-auto">
                  <ul className="col-12 col-xl-6">
                    <div className="row d-flex justify-content-center align-items-center">
                      <li className="list-unstyled col-11 col-lg-10 col-xl-12 col-md-11 col-sm-8 my-3 rounded bg-lite">
                        <div className="row">
                          <div className="col-4 col-xl-4 col-lg-4 col-sm-4 py-4 lite_blue rounded-start blo_radi"></div>
                          <div className="col-8 col-xl-8 col-lg-8 col-sm-8 py-4">
                            <h6 className="py-3 m-0 fw-bold text-primary-dark">
                              Become a verified user
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="list-unstyled col-11 col-lg-10 col-xl-12 col-md-11 col-sm-8 my-3 rounded bg-lite">
                        <div className="row">
                          <div className="col-4 col-xl-4 col-sm-4 py-4 lite_blue rounded-start blo_radi"></div>
                          <div className="col-8 col-xl-8 col-sm-8 py-4">
                            <h6 className="py-3 m-0 fw-bold text-primary-dark">
                              Participate in Auctions
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="list-unstyled col-11 col-lg-10 col-xl-12 col-md-11 col-sm-8 my-3 rounded bg-lite">
                        <div className="row">
                          <div className="col-4 col-xl-4 col-sm-4 py-4 lite_blue blo_radi"></div>
                          <div className="col-8 col-xl-8 col-sm-8 py-4">
                            <h6 className="py-3 m-0 fw-bold text-primary-dark">Place Bid</h6>
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-6 p-0">
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  emailId: '',
                  password: '',
                  agree: false
                }}
                validationSchema={clientSchema}
                onSubmit={handleRegisterUser}
              >
                {() => {
                  return (
                    <Form>
                      <div className="bg-lite white_box_hei">
                        <div className="d-flex justify-content-center align-items-center text-center">
                          <div className="w-50">
                            <img src={bidboliImg} alt="#" />
                          </div>
                        </div>
                        <div className="row d-flex justify-content-center align-items-center mx-xl-4">
                          <hr className="w-50 my-xl-4 my-3" />
                          <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 py-md-0 py-3">
                              <h5 className="text-center text-dark h5">Create a Free Account</h5>
                            </div>
                            <div className="col-11 col-xl-4 my-2">
                              <div className="input-group">
                                <Field
                                  as="input"
                                  type="text"
                                  className="form-control py-2 bg-primary-lite"
                                  name="firstName"
                                  id="first_name"
                                  placeholder="First Name"
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name="firstName"
                                  component="small"
                                  className="text-danger ps-3 italic"
                                />
                              </div>
                            </div>
                            <div className="col-11 col-xl-4 my-2">
                              <div className="input-group">
                                <Field
                                  as="input"
                                  type="text"
                                  className="form-control py-2 bg-primary-lite"
                                  name="lastName"
                                  id="last_name"
                                  placeholder="Last Name"
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name="lastName"
                                  component="small"
                                  className="text-danger ps-3 italic"
                                />
                              </div>
                            </div>
                            <div className="col-11 col-xl-8 my-2">
                              <div className="input-group">
                                <Field
                                  as="input"
                                  type="email"
                                  className="form-control py-2 bg-primary-lite"
                                  name="emailId"
                                  id="email"
                                  placeholder="Email"
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name="emailId"
                                  component="small"
                                  className="text-danger ps-3 italic"
                                />
                              </div>
                            </div>
                            <div className="col-11 col-xl-8 my-2">
                              <div className="input-group">
                                <Field
                                  as="input"
                                  type="password"
                                  className="form-control py-2 bg-primary-lite"
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name="password"
                                  component="small"
                                  className="text-danger ps-3 italic"
                                />
                              </div>
                            </div>
                            <div className="col-11 col-xl-8 my-2">
                              <Field type="checkbox" name="agree" id="agree" />
                              <label htmlFor="agree">
                                <p className="sm_tex ms-2 mb-0">
                                  I agree to abide by
                                  <a href="./">&nbsp;bidboli`s terms of use and privacy policy</a>
                                </p>
                              </label>
                              <div>
                                <ErrorMessage
                                  name="agree"
                                  component="small"
                                  className="text-danger ps-3 italic"
                                />
                              </div>
                            </div>
                            <div className="col-11 col-xl-8 mb-3">
                              <button
                                type="submit"
                                className="btn btn-block btn-lg w-100 text-lite fw-bold rounded oran_bg sign_btn"
                              >
                                {isLoading && (
                                  <div
                                    className="spinner-grow spinner-grow-sm text-light me-3"
                                    role="status"
                                  ></div>
                                )}
                                {isLoading ? 'Signing up...' : isError ? 'Try again!' : 'Sign up'}
                              </button>
                            </div>
                            <div className="col-12 col-xl-12 pb-3">
                              <p className="text-center">
                                Already have an account?
                                <NavLink to={VISITOR_ROUTES.LOGIN}>
                                  <div className="fw-bold">Log in.</div>
                                </NavLink>
                              </p>
                            </div>
                          </div>
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
      <Toaster />
    </>
  )
}
