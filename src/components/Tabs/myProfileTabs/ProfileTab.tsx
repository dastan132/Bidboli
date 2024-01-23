import React, { useState } from 'react'
import DocumentVerificationModal from '../../Modals/DocumentVerificationModal'
import EditPassword from '../../Modals/EditPassword'
import EditProfileModal from '../../Modals/EditProfileModal'
import Icon from '../../../assets/images/icons/png/edit.png'

import { useGetUserDetailsQuery } from '../../../features/api/userApiSlice'
import { Toaster } from 'react-hot-toast'

export default function ProfileTab() {
  const initialEventValues = {
    userCountry: []
  }
  const [documentVerification, setdocumentVerification] = useState(false)
  const [editPasswordToggle, setEditPasswordToggle] = useState(false)
  const [editProfileModal, setEditProfileModal] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState(initialEventValues)

  const { data } = useGetUserDetailsQuery()
  console.log(data)

  const userData: any = data?.data

  return (
    <>
      <div className="col-12 col-md-12 col-lg-9 col-xl-9 mx-xl-3 px-lg-3 px-2">
        <div className="bg-lite px-xl-4 px-3 pb-4">
          <div className="row">
            <div className="col-12 pt-3 text-center text-xl-start">
              <h4 className="fw-bold m-0">My Profile</h4>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-12 col-md-6 col-xl-6 text-center text-md-start text-xl-start mt-md-2">
              <h4 className="text-secondary fw-bold">Personal Information</h4>
            </div>
            <div className="col-12 col-md-6 col-xl-6 text-center text-md-end text-xl-end my-2 px-3">
              <div className="row ">
                <div className="col-12 pt-3 text-center text-xl-start">
                  <button
                    type="button"
                    className=" btn btn-sm btn-secondary w-xl-75 h-100 float-end "
                    onClick={() => setEditPasswordToggle(!editPasswordToggle)}
                  >
                    <p className="m-0 fw-normal">Change Password</p>
                  </button>
                  {editPasswordToggle && <EditPassword doneEditPassword={setEditPasswordToggle} />}
                </div>
              </div>

              <div className="row ">
                <div className="col mt-2">
                  <button
                    type="button"
                    className="editbtn btn btn-secondary  m-0 fw-normal  "
                    onClick={() => setEditProfileModal(true)}
                  >
                    <span className="pe-1 ">
                      {/* <img src={Icon} alt="/" /> */}
                      <i className=" ps-1 fa fa-pencil"></i>
                    </span>
                    Edit Profile
                  </button>
                  {editProfileModal && (
                    <EditProfileModal
                      doneEdit={setEditProfileModal}
                      selectedOptions={selectedOptions}
                      handleOptionSelect={setSelectedOptions}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
              <p className="text-secondary m-0">Name</p>
              <p className="text-dark h6">
                {userData?.firstName} {userData?.lastName}
              </p>
            </div>
            <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
              <p className="text-secondary m-0">Email</p>
              <p className="text-dark h6">{userData?.emailId}</p>
            </div>
            <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
              <p className="text-secondary m-0">Contact Number</p>
              <p className="text-dark h6">{userData?.mobileNo}</p>
            </div>
            <div className="col-12 col-md-6 col-xl-12 mt-xl-4 pt-2 pt-xl-0">
              <p className="text-secondary m-0">Address</p>
              <p className="text-dark h6">{userData?.address}</p>
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-12 col-md-6 col-xl-6 text-center text-md-start text-xl-start mt-md-2">
              <h4 className="text-secondary fw-bold">Document Verification</h4>
            </div>
            <div className="col-12 col-md-6 col-xl-6 text-center text-md-end text-xl-end my-2 px-3">
              <button
                className="btn btn-sm btn-secondary w-xl-75 h-100"
                onClick={() => setdocumentVerification(!documentVerification)}
              >
                <p className="m-0 fw-normal">+ Add New Document</p>
              </button>
              {documentVerification && (
                <DocumentVerificationModal doneVerification={setdocumentVerification} />
              )}
            </div>
          </div>
          <img src={userData?.adhaarCard} alt="" width={100} />
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-xl-4 mx-xl-2 my-2 px-3">
              <div className="row border rounded px-1 bg-lite shadow-sm py-2 h-100">
                <div className="col-6 col-xl-7 ps-xl-3 ps-2">
                  <h5 className="fw-bold">
                    Aadhar card <span className="verif_tex fw-bold ms-1">Verified</span>
                  </h5>
                </div>
                <div className="col-6 col-xl-5 text-end pe-xl-2 p-0">
                  <button className="border-0 rounded-pill px-3 sm_tex bg-primary-lite">
                    Edit
                  </button>
                  <button className="border-0 rounded-pill px-3 sm_tex text-danger bg-primary-lite">
                    Delete
                  </button>
                </div>
                <div className="col-12 col-xl-6 py-2 text-center text-xl-start"></div>
                <div className="col-12 col-xl-6 px-0 pt-2 px-2">
                  <div className="row">
                    <div className="col-12 col-xl-12 px-0">
                      <div className="text-center">
                        <p className="text-secondary m-0 docum_sm_tex">Your name as per document</p>
                        <h6>
                          {' '}
                          {userData?.firstName} {userData?.lastName}{' '}
                        </h6>
                      </div>
                    </div>
                    <div className="col-12 col-xl-12 px-0 pt-2">
                      <div className="text-center text-xl-start">
                        <p className="text-secondary m-0 docum_sm_tex">Document Number</p>
                        <p className="fw-bold h6">1234 5678 9632</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4 mx-xl-2 my-2 px-3">
              <div className="row border rounded px-1 bg-lite shadow-sm py-2 h-100">
                <div className="col-6 col-xl-7 ps-xl-3 ps-2">
                  <h5 className="fw-bold">
                    PAN card <span className="verif_tex fw-bold ms-1">Verified</span>
                  </h5>
                </div>
                <div className="col-6 col-xl-5 text-end pe-xl-2 p-0">
                  <button className="border-0 rounded-pill px-3 sm_tex bg-primary-lite">
                    Edit
                  </button>
                  <button className="border-0 rounded-pill px-3 sm_tex text-danger bg-primary-lite">
                    Delete
                  </button>
                </div>
                <div className="col-12 col-xl-6 py-2 mt-xl-2 text-center text-xl-start">
                  <img src={userData?.panCard} alt="" width={100} />
                </div>
                <div className="col-12 col-xl-6 px-0 pt-2 px-2">
                  <div className="row">
                    <div className="col-12 col-xl-12 px-0">
                      <div className="text-center">
                        <p className="text-secondary m-0 docum_sm_tex">Your name as per document</p>
                        <h6>
                          {' '}
                          {userData?.firstName} {userData?.lastName}
                        </h6>
                      </div>
                    </div>
                    <div className="col-12 col-xl-12 px-0 pt-2">
                      <div className="text-center text-xl-start">
                        <p className="text-secondary m-0 docum_sm_tex">Document Number</p>
                        <p className="fw-bold h6">ABCDE1234F</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      {/* {editProfileModal && <EditProfileModal doneEdit={setEditProfileModal} />} */}
    </>
  )
}
