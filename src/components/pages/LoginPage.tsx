import React from 'react'
import { createSearchParams, NavLink, useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Helmet } from 'react-helmet'

import { ErrorMessage, Form, Field, Formik } from 'formik'

import toast from 'react-hot-toast'

import bidboliImg from '../../assets/images/bidboli.png'
import { useLoginUserMutation } from '../../features/api/entryApiSlice'

import { USER_ROUTES, VISITOR_ROUTES } from '../../constants/routes'
import { useUserContext } from '../../context/UserContext'
import Toaster from '../global/Toaster'
import usePasswordToggle from '../../hooks/usePasswordToggle'

export default function LoginPage() {
  const [inputType, Icon] = usePasswordToggle()
  const [loginUser, { isLoading, isError }] = useLoginUserMutation()
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location?.state?.from?.pathname

  const { setCurrentUser } = useUserContext()

  const clientSchema = yup.object({
    email: yup.string().email('*Invalid email address').required('*Email is required'),
    password: yup.string().required('*Password is required')
  })

  async function handleLoginUser(values: any) {
    const result: Record<string, any> = await loginUser(values)

    localStorage.setItem('user', JSON.stringify(result?.data.user))
    localStorage.setItem('accessToken', result?.data.accessToken)
    setCurrentUser(result?.data.user)

    if (result.data.user) {
      if (!result?.data.user.isVerified)
        navigate({
          pathname: VISITOR_ROUTES.VERIFY_OTP,
          search: createSearchParams({
            emailId: values.email
          }).toString()
        })
      else if (pathname && pathname !== USER_ROUTES.LOGOUT) navigate(location.state.from.pathname)
      else navigate(USER_ROUTES.EVENTS)
    } else toast.error(result.data.msg)
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
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
                  email: '',
                  password: ''
                }}
                validationSchema={clientSchema}
                onSubmit={handleLoginUser}
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
                              <h5 className="text-center text-dark h5">Login to your account</h5>
                            </div>
                            <div className="col-11 col-xl-8 my-2">
                              <div className="input-group">
                                <Field
                                  as="input"
                                  type="email"
                                  className="form-control py-2 bg-primary-lite"
                                  name="email"
                                  id="email"
                                  placeholder="Email"
                                />
                              </div>
                              <ErrorMessage
                                name="emailId"
                                component="div"
                                className="text-danger ps-3 pt-2 text-xs italic"
                              />
                            </div>
                            <div className="col-11 col-xl-8 my-2">
                              <div className="input-group">
                                <Field
                                  as="input"
                                  type={inputType}
                                  className="form-control py-2 bg-primary-lite"
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                />
                                <div style={{ fontSize: 25 }}>{Icon}</div>
                              </div>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger ps-3 pt-2 text-xs italic"
                              />
                            </div>
                            <div className="col-11 col-xl-8 my-3">
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
                                {isLoading ? 'Logging in...' : isError ? 'Try again!' : 'Login'}
                              </button>
                            </div>
                            <div className="col-11 col-xl-8">
                              <div className="row">
                                <div className="col-6 col-xl-8 pe-0">
                                  <Field type="checkbox" name="sign_in" id="sign_in" />
                                  <label className="ms-1" htmlFor="sign_in">
                                    Keep me Signed in
                                  </label>
                                </div>
                                <div className="col-6 col-xl-4 ps-0 text-end">
                                  <NavLink to={VISITOR_ROUTES.FORGOT_PASSWORD}>
                                    <div className="fw-bold">Forget Password?</div>
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <div className="col-11 col-xl-12 text-center mt-5 mt-xl-5 p-0">
                              <h6>
                                Dont have an account?
                                <NavLink to={VISITOR_ROUTES.REGISTER_USER}>
                                  <div className="fw-bold">Register Now.</div>
                                </NavLink>
                              </h6>
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
