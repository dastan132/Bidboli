import React from 'react'
import { Helmet } from 'react-helmet'

export default function UnauthorizedPage() {
  return (
    <>
      <Helmet>
        <title>Unauthorized</title>
      </Helmet>
      <div>Unauthorized</div>
    </>
  )
}
