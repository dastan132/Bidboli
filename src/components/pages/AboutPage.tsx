import React from 'react'
import { NavLink } from 'react-router-dom'

import { VISITOR_ROUTES } from '../../constants/routes'

export default function AboutPage() {
  return (
    <>
      <div className="object">
        <div className="object-rope"></div>
        <div className="object-shape">
          Coming <span className="soon">Soon</span>
        </div>
      </div>

      <div className="rope-content">
        <p className="message">Page is under construction</p>
        <NavLink to={VISITOR_ROUTES.HOME}>
          <button className="home-button fw-bold border-0 rounded bg-lite primary_tex py-3 px-4 ban_kno_but">
            Home
          </button>
        </NavLink>
      </div>
    </>
  )
}
