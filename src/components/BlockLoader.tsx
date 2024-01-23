import React from 'react'

export default function BlockLoader() {
  return (
    <div className="block-container">
      <div className="box">
        <div className="skeleton">
          <div className="skeleton-left flex1">
            <div className="square"></div>
          </div>
          <div className="skeleton-right flex2">
            <div className="line h17 w40 m10"></div>
            <div className="line"></div>
            <div className="line h8 w50 m10"></div>
            <div className="line  w75"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
