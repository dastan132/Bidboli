import React from 'react'

import user_aadhar from '../../../assets/images/user_aadhar.png'
import gst_certifi from '../../../assets/images/gst_certifi.png'

export default function CompanyProfilePage() {
  return (
    <div className="col-12 col-md-12 col-lg-9 col-xl-9 mx-xl-3 px-lg-3 px-2">
      <div className="bg-lite px-xl-4 px-3 pb-4">
        <div className="row">
          <div className="col-12 pt-3 text-center text-xl-start">
            <h4 className="fw-bold m-0">Company Profile</h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-md-6 col-xl-10 text-center text-md-start text-xl-start mt-md-2 my-2">
            <h4 className="text-secondary fw-bold">Basic Information</h4>
          </div>
          <div className="col-12 col-md-6 col-xl-2 text-center text-md-end text-xl-end my-2 px-3">
            <button className="border-0 btn-secondary offcan_but px-4 py-1">
              <p className="m-0 fw-normal">Edit Profile</p>
            </button>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
            <p className="text-secondary m-0">Company Name</p>
            <p className="text-dark h6">Relotech India Pvt. Ltd.</p>
          </div>
          <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
            <p className="text-secondary m-0">Email</p>
            <p className="text-dark h6">email@relotech.in</p>
          </div>
          <div className="col-12 col-md-6 col-xl-4 pt-2 pt-xl-0">
            <p className="text-secondary m-0">Contact Number</p>
            <p className="text-dark h6">0731-4205632</p>
          </div>
          <div className="col-12 col-md-6 col-xl-4 mt-xl-4 pt-2 pt-xl-0">
            <p className="text-secondary m-0">GST Number</p>
            <p className="text-dark h6">07AAGFF2194N1Z1</p>
          </div>
          <div className="col-12 col-md-6 col-xl-4 mt-xl-4 pt-2 pt-xl-0">
            <p className="text-secondary m-0">Company Address</p>
            <p className="text-dark h6">
              Peter Parker,
              <br /> 3rd floor, Raheja Platinum, <br />
              Andheri (E), Mumbai, MH, India 400037
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-md-6 col-xl-6 text-center text-md-start text-xl-start mt-md-2">
            <h4 className="text-secondary fw-bold">Document Verification</h4>
          </div>
          <div className="col-12 col-md-6 col-xl-6 text-center text-md-end text-xl-end my-2 px-3">
            <button className="btn btn-sm btn-secondary w-xl-75 h-100">
              <p className="m-0 fw-normal">+ Add New Document</p>
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-md-6 col-xl-4 mx-xl-2 my-2 px-3">
            <div className="row border rounded px-1 bg-lite shadow-sm py-2 h-100">
              <div className="col-6 col-xl-7 ps-xl-2 ps-2 pe-xl-0">
                <h5 className="fw-bold">
                  MCA Certificate <span className="verif_tex fw-bold ms-1">Verified</span>
                </h5>
              </div>
              <div className="col-6 col-xl-5 text-end pe-xl-2 p-0">
                <button className="border-0 rounded-pill px-3 sm_tex bg-primary-lite">Edit</button>
                <button className="border-0 rounded-pill px-3 sm_tex text-danger bg-primary-lite">
                  Delete
                </button>
              </div>
              <div className="col-12 col-xl-6 py-2 text-center text-xl-start">
                {/* <img src="/assets/images/user_aadhar.png" alt="#" /> */}
                <img src={user_aadhar} alt="#" />
              </div>
              <div className="col-12 col-xl-6 px-0 px-3">
                <div className="row">
                  <div className="col-12 col-md-6 col-xl-12 px-0 pt-2">
                    <div className="text-center text-md-start">
                      <p className="text-secondary m-0 docum_sm_tex">Your name as per document</p>
                      <h6>Relotech India Pvt. Ltd.</h6>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-12 px-0 pt-2">
                    <div className="text-center text-md-end text-xl-start">
                      <p className="text-secondary m-0 docum_sm_tex">Document Number</p>
                      <p className="h6 fw-bold">1234 5678 9632</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4 mx-xl-2 my-2 px-3">
            <div className="row border rounded px-1 bg-lite shadow-sm py-2 h-100">
              <div className="col-6 col-xl-7 ps-xl-2 ps-2 pe-xl-0">
                <h5 className="fw-bold">
                  GST Certificate <span className="verif_tex fw-bold ms-1">Verified</span>
                </h5>
              </div>
              <div className="col-6 col-xl-5 text-end pe-xl-2 p-0">
                <button className="border-0 rounded-pill px-3 sm_tex bg-primary-lite">Edit</button>
                <button className="border-0 rounded-pill px-3 sm_tex text-danger bg-primary-lite">
                  Delete
                </button>
              </div>
              <div className="col-12 col-xl-6 py-2 mt-xl-1 text-center text-xl-start">
                {/* <img src="/assets/images/gst_certifi.png" alt="/" /> */}
                <img src={gst_certifi} alt="#" />
              </div>
              <div className="col-12 col-xl-6 px-0 px-3">
                <div className="row">
                  <div className="col-12 col-md-6 col-xl-12 px-0 pt-2">
                    <div className="text-center text-md-start">
                      <p className="text-secondary m-0 docum_sm_tex">Your name as per document</p>
                      <h6>Peter Parker</h6>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-12 px-0 pt-2">
                    <div className="text-xl-start text-md-end text-center">
                      <p className="text-secondary m-0 docum_sm_tex">Document Number</p>
                      <p className="fw-bold h6">07AAGFF2194N1Z1</p>
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
