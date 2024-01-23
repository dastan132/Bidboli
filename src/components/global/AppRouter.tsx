import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { USER_ROUTES, VISITOR_ROUTES, CREATE_EVENT, MY_PROFILE } from '../../constants/routes'

import RequireUser from '../authentication/RequireUser'
import HomePage from '../../components/pages/HomePage'
import CreateEvensPage from '../../components/pages/CreateEventPage'
import EventsPage from '../../components/pages/EventsPage'
import LoginPage from '../../components/pages/LoginPage'
import RegistrationPage from '../../components/pages/RegistrationPage'
import { UserProvider } from '../../context/UserContext'

import LogoutPage from '../pages/LogoutPage'
import AboutPage from '../pages/AboutPage'
import EventDetailsPage from '../pages/EventDetailsPage'
import VerifyOTPPage from '../pages/VerifyOTPPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Preferencespage from '../pages/PreferancesPage'
import CreateEventTabs from '../Tabs/createEventTabs/CreateEventTabs'
import MyProfileTabs from '../Tabs/myProfileTabs/MyProfileTabs'
import MyProfilePage from '../pages/MyProfilePage'
function AppRouter() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={VISITOR_ROUTES.HOME} element={<HomePage />} />
          <Route path={VISITOR_ROUTES.REGISTER_USER} element={<RegistrationPage />} />
          <Route path={VISITOR_ROUTES.VERIFY_OTP} element={<VerifyOTPPage />} />
          <Route path={VISITOR_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={VISITOR_ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={VISITOR_ROUTES.USER_PREFERENCES} element={<Preferencespage />} />

          <Route element={<RequireUser />}>
            <Route path={USER_ROUTES.MY_PROFILE} element={<MyProfilePage />}>
              {Object.values(MY_PROFILE).map((route) => (
                <Route key={route} path={route} element={<MyProfileTabs tab={route} />} />
              ))}
            </Route>
            <Route path={USER_ROUTES.LOGOUT} element={<LogoutPage />} />
            <Route path={USER_ROUTES.CREATE_EVENT} element={<CreateEvensPage />}>
              {Object.values(CREATE_EVENT).map((route) => (
                <Route key={route} path={route} element={<CreateEventTabs tab={route} />} />
              ))}
            </Route>
          </Route>
          <Route path={USER_ROUTES.EVENT_DETAILS} element={<EventDetailsPage />} />

          <Route path={USER_ROUTES.EVENTS} element={<EventsPage />}></Route>
          <Route path={USER_ROUTES.ABOUT} element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default AppRouter
