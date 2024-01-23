import React from 'react'
import { Helmet } from 'react-helmet'

import './assets/stylesheets/media.css'
import './assets/stylesheets/style.css'

import AppRouter from './components/global/AppRouter'

function App() {
  return (
    <>
      <Helmet defaultTitle="Bidboli" titleTemplate="%s | The Asset Bazaar  ">
        <meta
          name="description"
          content="India's no. 1 marketplace for auction with verified buyers and sellers. "
        />
        <meta name="keywords" content="Sell, Auction, Marketplace" />
        <script src="https://kit.fontawesome.com/b962d8bbf0.js" crossOrigin="anonymous"></script>
      </Helmet>

      <AppRouter />
    </>
  )
}

export default App
