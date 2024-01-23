import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'

import { NavLink, useNavigate } from 'react-router-dom'
import { useTimer } from 'react-timer-hook'

import toast from 'react-hot-toast'

import bidboliImg from '../../assets/images/bidboli.png'
import { VISITOR_ROUTES } from '../../constants/routes'
import { useForgotPasswordMutation } from '../../features/api/entryApiSlice'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [forgotPassword, { isLoading, isError, isSuccess, data }] = useForgotPasswordMutation()
  const [expiryTimestamp, setExpiryTimestamp] = useState(() => {
    const time = new Date()
    time.setSeconds(time.getSeconds())
    return time
  })

  const { seconds, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      if (isSuccess) navigate(VISITOR_ROUTES.LOGIN)
    }
  })

  const clientSchema = yup.object({
    emailId: yup.string().email('*Invalid email address').required('*Email is required')
  })

  useEffect(() => {
    setExpiryTimestamp(() => {
      const time = new Date()
      time.setSeconds(time.getSeconds() + 10)
      restart(time)
      return time
    })
  }, [isSuccess])

  async function handleForgotPassword(values: any) {
    const result: Record<string, any> = await forgotPassword(values)
    if (result.data.status) {
      toast.success(result.data.msg)
    } else toast.error(result.data.msg)
  }

  return (
    <div className="wrapper overflow-hidden m-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-12 col-xl-12 p-0">
            <div className="bg-primary-dark">
              <div className="row d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-10 col-md-8 col-lg-6 col-xl-4 bg-lite text-center rounded">
                  <div className="row d-flex justify-content-center align-items-center mx-xl-4 mx-md-4 mx-lg-4">
                    <div className="col-12 col-xl-12">
                      <div className="w-100">
                        <img className="text-center" src={bidboliImg} alt="" />
                      </div>
                    </div>
                    <hr className="my-4" />
                    {isSuccess ? (
                      <div className="col">
                        <h4 className="oran_tex fw-bold mb-3">{data?.msg}</h4>
                        {seconds && (
                          <div className="mb-5">
                            Redirecting you to Login page in
                            <span className="oran_tex fw-bold mb-3">&nbsp;{seconds}&nbsp;</span>
                            seconds
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="col-12 col-xl-12 text-center">
                          <p className="h5">Forgot Password?</p>
                        </div>
                        <Formik
                          initialValues={{
                            emailId: ''
                          }}
                          validationSchema={clientSchema}
                          onSubmit={handleForgotPassword}
                        >
                          {() => {
                            return (
                              <Form>
                                <div className="col-12 col-xl-12 my-2">
                                  <div className="input-group">
                                    <Field
                                      type="email"
                                      className="form-control py-2 bg-primary-lite"
                                      name="emailId"
                                      id="emailId"
                                      placeholder="Please enter your email address"
                                    />
                                  </div>
                                  <ErrorMessage
                                    name="emailId"
                                    component="div"
                                    className="text-danger ps-3 pt-2 text-xs italic"
                                  />
                                </div>
                                <div className="col-12 col-xl-12 my-3">
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
                                    {isLoading
                                      ? 'Sending you the reset link...'
                                      : isError
                                      ? 'Try again!'
                                      : 'Recover Password'}
                                  </button>
                                </div>
                              </Form>
                            )
                          }}
                        </Formik>
                      </>
                    )}
                    <div className="col-12 col-xl-12 mb-3 text-center">
                      Go back to
                      <NavLink to={VISITOR_ROUTES.LOGIN}>
                        <span className="fw-bold">&nbsp;Log in.</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
