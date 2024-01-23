import { useState, useEffect } from 'react'

function getStorageValue(key: any, defaultValue: any) {
  const saved = localStorage.getItem(key)
  const initial = saved !== null ? JSON.parse(saved) : defaultValue
  return initial
}

export const useLocalStorage = (key: any, defaultValue: any) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
