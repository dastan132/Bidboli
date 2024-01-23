import React, { useRef, useState } from 'react'

import * as _ from 'lodash'

import toast from 'react-hot-toast'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { useTimer } from 'react-timer-hook'

import bidboliImg from '../../assets/images/bidboli.png'
import { useSendOTPMutation, useVerifyOTPMutation } from '../../features/api/entryApiSlice'
import { useAuth } from '../../hooks/useAuth'
import Toaster from '../global/Toaster'
import { VISITOR_ROUTES } from '../../constants/routes'

export default function VerifyOTP() {
  const navigate = useNavigate()
  const elementsRef: any = useRef([])
  const user = useAuth()
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation()
  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation()
  const [searchParams] = useSearchParams()
  const [expiryTimestamp, setExpiryTimestamp] = useState(() => {
    const time = new Date()
    time.setSeconds(time.getSeconds() + 600)
    return time
  })

  const [isExpired, setIsExpired] = useState(false)

  const { seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsExpired(true)
    }
  })

  async function handleSendOtp() {
    const result: Record<string, any> = await sendOTP({
      userId: user.id,
      emailId: searchParams.get('emailId')
    })

    if (result.data?.status) {
      toast.success(result.data.msg)
      setIsExpired(false)

      setExpiryTimestamp(() => {
        const time = new Date()
        time.setSeconds(time.getSeconds() + 600)
        restart(time)
        return time
      })
    } else toast.error(result.data.msg)
  }

  async function handleChange(e: any) {
    const { target, key } = e
    const currentFieldIndex = parseInt(target.name)

    const currentRef = elementsRef.current[currentFieldIndex]
    const nextRef = currentFieldIndex === 4 ? null : elementsRef.current[currentFieldIndex + 1]
    const prevRef = currentFieldIndex === 1 ? null : elementsRef.current[currentFieldIndex - 1]

    if (key === 'Backspace') {
      if (prevRef) prevRef.focus()
      currentRef.value = ''
    } else if (key === 'ArrowRight' && nextRef) nextRef.focus()
    else if (key === 'ArrowLeft' && prevRef) prevRef.focus()
    else if (parseInt(key) <= 9 && parseInt(key) >= 0) {
      currentRef.value = key
      if (nextRef) {
        nextRef.focus()
      } else {
        const result: Record<string, any> = await verifyOTP({
          userId: user.id,
          otp: elementsRef.current.reduce((a: string, c: any) => a + c.value, ''),

          emailId: searchParams.get('emailId')
        })
        if (!result.data?.status) toast.error(result.data?.msg)
        else navigate(VISITOR_ROUTES.USER_PREFERENCES)
      }
    }
  }

  return (
    <div className="wrapper overflow-hidden m-0">
      <div className="container-fluid">
        <div className="row d-flex flex-column-reverse flex-md-row flex-lg-row flex-xl-row">
          <div className="col-12 col-md-6 col-xl-6 p-0">
            <div className="bg-primary-dark blue_box_hei">
              <div className="row d-flex justify-content-center align-items-center mx-auto">
                <ul className="col-12 col-xl-6">
                  <div className="row d-flex justify-content-center align-items-center">
                    <li className="list-unstyled col-11 col-lg-10 col-xl-12 col-md-11 col-sm-8 my-3 rounded bg-lite">
                      <div className="row">
                        <div className="col-4 col-xl-4 col-lg-4 col-sm-4 py-4 lite_blue rounded-start blo_radi"></div>
                        <div className="col-8 col-xl-8 col-lg-8 col-sm-8 py-4">
                          <h6 className="py-3 m-0 fw-bold text-primary-dark">
                            Become a verified user
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="list-unstyled col-11 col-lg-10 col-xl-12 col-md-11 col-sm-8 my-3 rounded bg-lite">
                      <div className="row">
                        <div className="col-4 col-xl-4 col-sm-4 py-4 lite_blue rounded-start blo_radi"></div>
                        <div className="col-8 col-xl-8 col-sm-8 py-4">
                          <h6 className="py-3 m-0 fw-bold text-primary-dark">
                            Participate in Auctions
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="list-unstyled col-11 col-lg-10 col-xl-12 col-md-11 col-sm-8 my-3 rounded bg-lite">
                      <div className="row">
                        <div className="col-4 col-xl-4 col-sm-4 py-4 lite_blue blo_radi"></div>
                        <div className="col-8 col-xl-8 col-sm-8 py-4">
                          <h6 className="py-3 m-0 fw-bold text-primary-dark">Place Bid</h6>
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-6 p-0">
            <div className="bg-lite white_box_hei px-lg-4">
              <div className="d-flex justify-content-center align-items-center text-center">
                <div className="w-50">
                  <img src={bidboliImg} alt="#" />
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center mx-xl-4">
                <hr className="w-50 my-xl-4 my-3" />
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-12 py-md-0 py-3">
                    <h5 className="text-center text-dark h5">
                      Please enter the OTP sent to your registered E-mail
                    </h5>
                  </div>
                  <div className="col-12 col-xl-8">
                    <div className="position-relative">
                      <div className="border-0 p-xl-4 text-center">
                        <div id="otp" className="d-flex flex-row justify-content-center mt-2">
                          {_.times(4, (i) => (
                            <input
                              key={i}
                              className="m-2 text-center form-control rounded py-3 lite_blue"
                              type="text"
                              name={`${i + 1}`}
                              ref={(el) => (elementsRef.current[i + 1] = el)}
                              onKeyDown={handleChange}
                              onChange={handleChange}
                              maxLength={1}
                              value={elementsRef.current[i + 1]?.value || ''}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 my-xl-3 my-4">
                    <div className="text-center">
                      <p className="text-danger h5">{`Your OTP will be expired in ${
                        hours < 10 ? '0' + hours : hours
                      }:${minutes < 10 ? '0' + minutes : minutes}:${
                        seconds < 10 ? '0' + seconds : seconds
                      }`}</p>
                    </div>
                  </div>
                </div>
                <div className="col-11 col-xl-8 mb-3">
                  <button className="btn btn-block btn-lg w-100 rounded btn-secondary">
                    {isLoading
                      ? 'Verifying...'
                      : isExpired
                      ? 'OTP expired! Please click on resend.'
                      : 'Verify'}
                  </button>
                </div>
                <div className="col-12 col-xl-12 pb-3">
                  <p className="text-center">
                    {isSendingOTP ? '' : 'Not received your code?'}
                    <button className="border-0 fw-bold oran_tex bg-lite" onClick={handleSendOtp}>
                      {isSendingOTP ? 'Sending....' : 'Resend code'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
