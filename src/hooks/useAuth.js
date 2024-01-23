import { useUserContext } from '../context/UserContext'

export const useAuth = () => {
  const { currentUser: userDetails } = useUserContext()

  return (
    userDetails ||
    (localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null)
  )
}
