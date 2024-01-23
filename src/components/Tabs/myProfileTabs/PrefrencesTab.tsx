import React from 'react'

export default function PrefrencesTab() {
  return (
    <div className="col-12 col-md-12 col-lg-9 col-xl-9 mx-xl-3 px-lg-3">
      <div className="bg-lite px-xl-4 px-3 pb-4 h-100">
        <div className="row pt-3">
          <div className="col-12 col-md-10 col-xl-9">
            <div className="bg-primary-lite py-1">
              <div className="row pt-xl-3 py-3 ps-3">
                <div className="col-6 col-xl-4">
                  <p className="text-secondary m-0">You&apos;re a</p>
                </div>
                <div className="col-6 col-xl-4">
                  <p className="h6 m-0">Seller</p>
                </div>
              </div>
            </div>
            <div className="bg-grey-lite">
              <div className="row pt-xl-3 py-3 ps-3">
                <div className="col-12 col-xl-4">
                  <p className="text-secondary">What kind of assets are you looking to sell?</p>
                </div>
                <div className="col-12 col-xl-4">
                  <button className="border-0 bg-tags-grey rounded-pill sm_tex fw-normal px-2 py-1">
                    Personal
                  </button>
                  <button className="border-0 bg-tags-grey rounded-pill sm_tex fw-normal px-2 py-1">
                    Corporate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-xl-5 pt-xl-5 pt-4">
          <div className="col-12 col-md-10 col-xl-9 text-center text-md-end text-xl-end">
            <button className="border-0 btn-secondary offcan_but px-4 py-2">
              Edit Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
