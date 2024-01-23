import React from 'react'
import { NavLink } from 'react-router-dom'

import bidbolilogo from '../assets/images/bidboli.png'
import { USER_ROUTES } from '../constants/routes'

function Footer() {
  return (
    <section className="bg-lite">
      <div className="container">
        <div className="row py-4 py-xl-4 mx-5">
          <div className="col-12 col-md-4 col-lg-4 col-xl-4">
            <img className="w-50" src={bidbolilogo} alt="#" />
            <p>
              here are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which dont
              look even slightly believable.
              <NavLink to={USER_ROUTES.ABOUT}>Read More</NavLink>
            </p>
          </div>
          <div className="col-6 col-md-4 col-lg-2 col-xl-2">
            <ul>
              <li className="list-unstyled fw-bold py-1">Events</li>
              <li className="list-unstyled py-1">Featured Events</li>
              <li className="list-unstyled py-1">Recent Events</li>
              <li className="list-unstyled py-1">Create an Event</li>
              <li className="list-unstyled py-1">Learn about Events</li>
              <li className="list-unstyled py-1">FAQs</li>
            </ul>
          </div>
          <div className="col-6 col-md-4 col-lg-2 col-xl-2">
            <ul>
              <li className="list-unstyled fw-bold py-1">Policies</li>
              <li className="list-unstyled py-1">Privacy Policy</li>
              <li className="list-unstyled py-1">Cookie Policy</li>
              <li className="list-unstyled py-1">Terms of Services</li>
              <li className="list-unstyled py-1">Disclaimer</li>
            </ul>
          </div>
          <div className="col-6 col-md-4 col-lg-2 col-xl-2">
            <ul>
              <li className="list-unstyled fw-bold py-1">About Us</li>
              <li className="list-unstyled py-1">Company Info</li>
              <li className="list-unstyled py-1">News</li>
              <li className="list-unstyled py-1">Investors</li>
              <li className="list-unstyled py-1">Careers</li>
              <li className="list-unstyled py-1">Government Relations</li>
              <li className="list-unstyled py-1">Verified Rights</li>
            </ul>
          </div>
          <div className="col-6 col-md-4 col-lg-2 col-xl-2">
            <ul>
              <li className="list-unstyled fw-bold py-1">Stay Connected</li>
              <li className="list-unstyled py-1">Contact Us</li>
              <li className="list-unstyled py-1">Help and Support</li>
              <li className="list-unstyled py-1">FAQs</li>
              <li className="list-unstyled py-1">Blogs</li>
              <li className="list-unstyled py-1">Join Newsletter</li>
              <li className="list-unstyled py-1">Live Chat</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
