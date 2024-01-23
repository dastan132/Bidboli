import { React, createContext, useState, useMemo, useContext } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUserContext = () => useContext(UserContext)

export { useUserContext, UserProvider }
