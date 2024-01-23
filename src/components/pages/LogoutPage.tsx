import React, { useEffect } from 'react'

import { useUserContext } from '../../context/UserContext'
import { useLogoutQuery } from '../../features/api/exitApiSlice'
import Loader from '../Loader'

export default function Logout() {
  const { currentUser, setCurrentUser } = useUserContext()

  const { isSuccess } = useLogoutQuery(currentUser?.id)

  useEffect(() => {
    if (isSuccess) {
      localStorage.clear()
      setCurrentUser(null)
    }
  }, [isSuccess])

  return <Loader />
}
