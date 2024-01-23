import React from 'react'
import { ErrorMessage, Field, Formik } from 'formik'
import { Button, Form, Modal } from 'react-bootstrap'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import icon from '../../assets/images/icons/png/x.svg'

import { useChangePasswordApiMutation } from '../../features/api/userApiSlice'

export default function EditPassword({ doneEditPassword }: { doneEditPassword: any }) {
  const [ChangePasswordApi] = useChangePasswordApiMutation()

  const handelPasswordUpdate = async (values: any) => {
    toast.promise(ChangePasswordApi(values), {
      loading: 'Uploading...',
      success: 'Successfully uploaded information',
      error: 'Error'
    })

    let result: Record<string, any> = await ChangePasswordApi({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword
    })
    console.log(result)
    doneEditPassword(false)
  }
  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Enter Your Old Password'),
    newPassword: Yup.string().required('This field is required'),
    confirmPassword: Yup.string().when('password', {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same')
    })
  })
  return (
    <Modal
      open={false}
      show={doneEditPassword}
      className="modal fade"
      size="lg"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      centeredbackdrop="static"
      keyboard={false}
      centered={true}
    >
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={passwordSchema}
        onSubmit={handelPasswordUpdate}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="bg-lite px-xl-4 px-3 pb-4 profile-container">
                <div className="row ">
                  <div className="col pt-3 text-center text-xl-start">
                    <div className="fw-bold m-0 h5">
                      Update Password
                      <div className=" text-center text-md-end text-xl-end my-2 px-3">
                        <button
                          type="button"
                          className=" btn-secondary "
                          onClick={() => doneEditPassword(false)}
                        >
                          <p className="m-0 ">
                            <i className="fa-solid fa-xmark"></i>
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <p className="text-secondary m-0 fw-bold">Current Password</p>
                <p className="text-dark h6">
                  <Field
                    as="input"
                    type="password"
                    id="current_Password"
                    name="currentPassword"
                    placeholder="Current Password"
                    className="form-control"
                  />
                </p>
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-danger ps-3 pt-2 text-xs italic"
                />
                <hr />
                <p className="text-secondary m-0 fw-bold">New Password</p>
                <p className="text-dark h6">
                  <Field
                    as="input"
                    type="password"
                    id="new_Password"
                    name="newPassword"
                    placeholder="New Password"
                    className="form-control"
                  />
                </p>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-danger ps-3 pt-2 text-xs italic"
                />
                <hr />
                <p className="text-secondary m-0 fw-bold">Confirm Password</p>
                <p className="text-dark h6">
                  <Field
                    as="input"
                    type="password"
                    id="confirm_Password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control"
                  />
                </p>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger ps-3 pt-2 text-xs italic"
                />
                <Modal.Footer>
                  <Button className="m-0 fw-normal" size="sm" type="submit" variant="secondary">
                    Done
                  </Button>
                </Modal.Footer>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
