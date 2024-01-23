import React from 'react'
import { NavLink } from 'react-router-dom'

import HomeBanner from '../assets/images/bid_banner_img.png'
import { USER_ROUTES } from '../constants/routes'

function HeroBlock() {
  return (
    <section>
      <div className="mt-3 mx-5">
        <div className="col-12">
          <div className="index_banner mt-4">
            <div className="bg-primary-dark py-3">
              <div className="container-fluid mx-xl-5">
                <div className="row align-items-center">
                  <div className="col-12 col-md-7 col-lg-8 col-xl-5 order-1 py-3 px-4 px-md-3 py-md-0">
                    <h2 className="text-lite fw-bold">
                      India&apos;s #1 Marketplace for Auctions with verified buyers and sellers.
                    </h2>
                    <h5 className="text-primary-light fw-normal my-3 my-md-2 my-lg-4">
                      We help you with Auction, Legal and Logistic services
                    </h5>
                    <NavLink to={USER_ROUTES.ABOUT}>
                      <button className="fw-bold border-0 rounded-1 bg-lite primary_tex py-2 px-3 ban_kno_but">
                        Know More
                      </button>
                    </NavLink>
                  </div>
                  <div className="col-12 col-md-5 col-lg-4 col-xl-6 order-xl-1 order-lg-1 order-md-1 text-center">
                    <img className="float-xl-end banner_img" src={HomeBanner} alt="#" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBlock
