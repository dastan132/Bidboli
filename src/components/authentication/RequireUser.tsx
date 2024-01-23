import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { VISITOR_ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

export default function RequireUser(props: any) {
  const auth = useAuth()
  const location = useLocation()

  return auth ? (
    <Outlet {...props} />
  ) : (
    <Navigate to={VISITOR_ROUTES.LOGIN} state={{ from: location }} replace />
  )
}
