import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { USER_TYPES } from '../../constants/loaderArray'
import { USER_ROUTES } from '../../constants/routes'
import { useSubmitPreferencesMutation } from '../../features/api/entryApiSlice'
import { useAuth } from '../../hooks/useAuth'

import Footer from '../Footer'
import Toaster from '../global/Toaster'
import Header from '../Header'

export default function Preferencespage() {
  const user = useAuth()
  const navigate = useNavigate()
  const [currentsellerType, setCurrentsellerType] = useState(1)
  const [submitPreferences, { isLoading }] = useSubmitPreferencesMutation()
  const [selectedOptions, setSelectedOptions] = useState([] as number[])

  const currentUser = USER_TYPES.find((user) => user.id === currentsellerType)

  async function handleSubmitPreferences() {
    const result: Record<string, any> = await submitPreferences({
      userId: user.id,
      preferences: currentUser?.options.map((option) => {
        return { ...option, isSelectd: selectedOptions.includes(option.id) }
      }),
      sellerType: currentUser?.sellerType
    })

    if (result.data.status) navigate(USER_ROUTES.EVENTS)
    else toast.error(result.data.msg)
  }

  function selectOption(id: number) {
    setSelectedOptions((currentOptions) => [...currentOptions, id])
  }

  return (
    <>
      <Header />
      <section>
        <div className="bg-primary-lite">
          <div className="container py-5">
            <div className="text-center">
              <h2 className="fw-bold">ANSWER A FEW QUESTIONS FOR BETTER BIDBOLI EXPERIENCE.</h2>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-12 p-0">
              <div className="bg-lite pt-3 min-vh-100">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-12 col-xl-12">
                      <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-12 col-lg-10 col-xl-8 my-md-2">
                          <p className="h6">You&apos;re a</p>
                        </div>
                        <div className="col-12 col-xl-8 col-lg-10">
                          <ul className="list-unstyled list-inline d-block text-md-start text-lg-start">
                            {USER_TYPES.map((user) => (
                              <li
                                key={user.id}
                                className="list-inline-item capsule-filters py-1 py-xl-0"
                                onClick={() => {
                                  setCurrentsellerType(user.id)
                                  setSelectedOptions([])
                                }}
                              >
                                <input
                                  type="radio"
                                  className="you_are_radio"
                                  name={`${user.id}`}
                                  id={`${user.id}`}
                                  role="button"
                                  checked={user.id === currentUser?.id}
                                />
                                <label
                                  className="px-3 py-2 h6"
                                  htmlFor={`${user.id}`}
                                  role="button"
                                >
                                  {user.sellerType}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-center mt-4">
                        <div className="col-12 col-md-12 col-lg-10 col-xl-8 my-md-2 p-0">
                          <p className="h6">{currentUser?.question}</p>
                        </div>
                        <div className="col-12 col-md-12 col-lg-11 col-xl-8 px-xl-1">
                          <div className="row px-lg-5 px-xl-0">
                            {currentUser?.options.map((option) => (
                              <div key={option.name} className="col-12 col-md-6 col-xl-12 my-1">
                                <input
                                  className="p-5"
                                  type="checkbox"
                                  name={option.name}
                                  id={option.name}
                                  role="button"
                                  onClick={() => selectOption(option.id)}
                                  checked={selectedOptions.includes(option.id)}
                                />
                                <label
                                  htmlFor={option.name}
                                  className="text-primary-dark h6"
                                  role="button"
                                >
                                  {option.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-center mt-md-4 mt-4 mt-xl-4">
                        <div className="col-12 col-md-12 col-lg-10 col-xl-8 text-center text-xl-start">
                          <div className="row">
                            <div className="col-12 col-lg-4 col-md-5 text-lg-end text-xl-start col-xl-3 py-2 pe-xl-0 px-md-0">
                              <button
                                className="btn btn-lite border border-dark shadow-none w-100 fs-5 fw-bold text-center"
                                onClick={() => navigate(USER_ROUTES.EVENTS)}
                              >
                                Skip
                              </button>
                            </div>
                            <div className="col-12 col-lg-5 col-md-5 text-lg-start col-xl-3 py-2">
                              <button
                                className="btn btn-secondary shadow-none fs-5 w-100 fw-bold text-center"
                                onClick={handleSubmitPreferences}
                              >
                                {isLoading ? 'Saving your preferences...' : 'Save'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Toaster />
    </>
  )
}
