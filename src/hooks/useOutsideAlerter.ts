import { useEffect, useState } from 'react'

export default function useOutsideAlerter(ref: React.MutableRefObject<HTMLInputElement>) {
  const [outsideClicked, setOutsideClicked] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOutsideClicked(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return { outsideClicked, setOutsideClicked }
}
