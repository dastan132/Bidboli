import React from 'react'

import contactImg from '../assets/images/contact.png'

export default function AssistanceBlock() {
  return (
    <section>
      <div className=" row">
        <div className="col-12 col-md-12 mx-5col-lg-12 col-xl-6 p-0">
          <div className="h-100">
            <div className="h-100 d-flex justify-content-center align-items-center bg_blue px-3 px-md-5 py-md-5 py-5 py-xl-0 px-xl-0">
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-8">
                  <h1>Need Assistance?</h1>
                  <p>
                    We understand that buying and selling a digital business isn&apos;t easy, so if
                    you have any questions or require assistance, feel free to contact us anytime.
                  </p>
                  <button className="btn btn-secondary h-xl-25">Contact Support</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-12 col-xl-6 p-0">
          <img className="w-100" src={contactImg} alt="#" />
        </div>
      </div>
    </section>
  )
}
