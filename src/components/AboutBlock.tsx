import React from 'react'

import AboutImg from '../assets/images/blue_circ.png'
import HowItWorks from '../assets/images/how_work.png'

export default function AboutBlock() {
  return (
    <>
      <section>
        <div className="bg_blue mx-0">
          <div className="container p-xl-5 p-4">
            <div className="row text-center">
              <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-md-2">
                <h1 className="fw-bold">What is BIDBOLI ?</h1>
                <p className='mt-3 text-primary-light'>
                  here are many variations of passages of Lorem Ipsum available, but the majority
                  have suffered alteration in some form, by injected humour, or randomised words
                  which don&apos;t look even slightly believable. If you are going to use a passage
                  of Lorem Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden
                  in the middle of text.
                </p>
              </div>
            </div>
            <div className="row mt-xl-5">
              <div className="col-12 col-md-12 col-xl-4">
                <div className="row mt-4 mt-xl-0">
                  <div className="col-12 col-md-1 col-xl-3 p-0 d-flex justify-content-center">
                    <img className="w-xl-100" src={AboutImg} alt="#" />
                  </div>
                  <div className="col-12 col-md-11 col-xl-9 ps-2 pt-xl-2 pt-md-3 text-center text-md-start my-2">
                    <span className="h5 fw-normal m-0">
                      A community of verified sellers and Buyers
                    </span>
                  </div>
                </div>
                <div className="row mt-xl-4">
                  <div className="col-12 col-xl-11 text-center text-md-start">
                    <p className='text-primary-light'>
                      here are many variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by injected humour, or
                      randomised words which don&apos;t look even slightly believable. If you are
                      going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t
                      anything embarrassing hidden in the middle of text.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-xl-4">
                <div className="row mt-4 mt-xl-0">
                  <div className="col-12 col-md-1 col-xl-3 p-0 d-flex justify-content-center">
                    <img className="w-xl-100" src={AboutImg} alt="#" />
                  </div>
                  <div className="col-20 col-md-11 col-xl-9 ps-2 pt-xl-2 pt-md-3 text-center text-md-start my-2">
                    <span className="h5 fw-normal m-0">
                      A community of verified sellers and Buyers
                    </span>
                  </div>
                </div>
                <div className="row mt-xl-4">
                  <div className="col-12 col-xl-11 text-center text-md-start text-primary-light">
                    <p>
                      here are many variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by injected humour, or
                      randomised words which don&apos;t look even slightly believable. If you are
                      going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t
                      anything embarrassing hidden in the middle of text.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-xl-4">
                <div className="row mt-4 mt-xl-0">
                  <div className="col-12 col-md-1 col-xl-3 p-0 d-flex justify-content-center">
                    <img className="w-xl-100" src={AboutImg} alt="#" />
                  </div>
                  <div className="col-12 col-md-11 col-xl-9 ps-2 pt-xl-2 pt-md-3 text-center text-md-start my-2">
                    <span className="h5 fw-normal m-0">
                      A community of verified sellers and Buyers
                    </span>
                  </div>
                </div>
                <div className="row mt-xl-4">
                  <div className="col-12 col-xl-11 text-center text-md-start">
                    <p className='text-primary-light'>
                      here are many variations of passages of Lorem Ipsum available, but the
                      majority have suffered alteration in some form, by injected humour, or
                      randomised words which don&apos;t look even slightly believable. If you are
                      going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t
                      anything embarrassing hidden in the middle of text.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container px-xl-5 py-xl-5">
          <div className="text-center">
            <h1 className="primary_tex fw-bold">How It Works</h1>
          </div>
          <div className="row mt-xl-5 mt-lg-4">
            <div className="col-12 col-md-12 col-lg-12 col-xl-6 text-md-center text-xl-end">
              <img src={HowItWorks} alt="#" />
            </div>
            <div className="col-12 col-md-12 col-lg-12 col-xl-6 p-xl-3">
              <ul className="p-0 p-xl-3 p-md-5 m-md-4 ">
                <li className="list-unstyled text-center text-md-start">
                  <div className="my-3">
                    <span className="text-lite h4 bulletlist d-block d-md-inline m-auto mt-4 mb-1">
                      1
                    </span>
                    <span className="text-lg fw-normal d-inline-block ms-3">
                      Create and Publish an event on BIDBOLI
                    </span>
                  </div>
                </li>
                <li className="list-unstyled text-center text-md-start">
                  <div className="my-3">
                    <span className="text-lite h4 bulletlist d-block d-md-inline m-auto mt-4 mb-1">
                      2
                    </span>
                    <span className="text-lg fw-normal d-inline-block ms-3">
                      Bidders show their interest in your event
                    </span>
                  </div>
                </li>
                <li className="list-unstyled text-center text-md-start">
                  <div className="my-3">
                    <span className="text-lite h4 bulletlist d-block d-md-inline m-auto mt-4 mb-1">
                      3
                    </span>
                    <span className="text-lg fw-normal d-inline-block ms-3">
                      Select qualified bidders from interested ones.
                    </span>
                  </div>
                </li>
                <li className="list-unstyled text-center text-md-start">
                  <div className="my-3">
                    <span className="text-lite h4 bulletlist d-block d-md-inline m-auto mt-4 mb-1">
                      4
                    </span>
                    <span className="text-lg fw-normal d-inline-block ms-3">
                      Selected Bidders placed bid on the auction date.
                    </span>
                  </div>
                </li>
                <li className="list-unstyled text-center text-md-start">
                  <div className="my-3">
                    <span className="text-lite h4 bulletlist d-block d-md-inline m-auto mt-4 mb-1">
                      5
                    </span>
                    <span className="text-lg fw-normal d-inline-block ms-3">
                      Highest bid win the event
                    </span>
                  </div>
                </li>
                <li className="list-unstyled text-center text-md-start">
                  <div className="my-3">
                    <span className="text-lite h4 bulletlist d-block d-md-inline m-auto mt-4 mb-1">
                      6
                    </span>
                    <span className="text-lg fw-normal d-inline-block ms-3">
                      BIDBOLI takes care of all legal and logistic processes.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
