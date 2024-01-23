import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const usePasswordToggle = () => {
  const [visible, setVisiblity] = useState(false)

  const Icon = (
    <button
      onClick={(e) => {
        e.preventDefault()
        setVisiblity((visible) => !visible)
      }}
    >
      <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
    </button>
  )
  const InputType = visible ? 'text' : 'password'

  return [InputType, Icon]
}

export default usePasswordToggle
