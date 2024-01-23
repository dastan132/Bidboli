import React from 'react'
import { Helmet } from 'react-helmet'

import AboutBlock from '../AboutBlock'
import AssistanceBlock from '../AssistanceBlock'
import BlogList from '../BlogList'
import Footer from '../Footer'
import Header from '../Header'
import HeroBlock from '../HeroBlock'
import JoinNewsletter from '../JoinNewsletter'
import PopularEvents from '../PopularEventsBlock'
import Toaster from '../global/Toaster'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div id="wrapper" className="overflow-hidden bg-lite">
        <div className="container-fluid p-0">
          <Header />
          <HeroBlock />
          <PopularEvents />
          <AboutBlock />
          <hr className="mx-xl-5" />
          <BlogList />
          <JoinNewsletter />
          <AssistanceBlock />
          <Footer />
          <Toaster />
        </div>
      </div>
    </>
  )
}
