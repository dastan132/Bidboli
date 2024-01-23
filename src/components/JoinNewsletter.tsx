import React, { useRef } from 'react'
import toast from 'react-hot-toast'

import { useSubscribeToNewsletterMutation } from '../features/api/homeApiSlice'

export default function JoinNewsletter() {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [subscribeToNewsletter, { isLoading, isError }] = useSubscribeToNewsletterMutation()

  const handlerSubscribe = (e: any) => {
    e.preventDefault()

    toast.promise(subscribeToNewsletter({ email: emailRef.current.value }), {
      loading: 'Adding you to our newsletter...',
      success: (data: Record<string, any>) => {
        if (data.status === true) emailRef.current.value = ''
        return 'Successfully added.'
      },
      error: 'Error while adding to our newsletter.'
    })
  }

  return (
    <section>
      <div className="lite_grey_bg py-5 mt-5 mx-0">
        <div className="text-center px-3 px-xl-0">
          <h1 className="primary_tex fw-bold mx-auto">Join Our Newsletter for Updates.</h1>
          <p className="mx-auto">
            Get the latest event and <i>Bidboli</i> updates into your inbox.
          </p>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-4 mt-3 justify-content-center align-items-center input-nletter">
              <div className="input-group mb-3 flex justify-content-center">
                <form className="d-inline-flex" onSubmit={handlerSubscribe}>
                  <span
                    className="input-group-text bg-lite border-end-0 rounded-0"
                    id="addon-wrapping"
                  >
                    <i className=" text-grey fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 rounded-0"
                    id="header-search"
                    placeholder="Email Address"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    required
                    ref={emailRef}
                  />
                  <button
                    className="btn btn-secondary btn-subscribe lh-sm"
                    type="submit"
                    id="button-addon2"
                  >
                    {isLoading && (
                      <div
                        className="spinner-grow spinner-grow-sm text-light me-3"
                        role="status"
                      ></div>
                    )}
                    {isLoading ? '' : isError ? 'Try again!' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
