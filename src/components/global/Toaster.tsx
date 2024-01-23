import React from 'react'
import { toast, Toaster as ToastWrapper, ToastBar } from 'react-hot-toast'

export default function Toaster() {
  return (
    <ToastWrapper
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          backgroundColor: '#FbFbFb'
        },
        success: {
          style: {
            borderLeftWidth: 3,
            borderLeftColor: 'greenyellow'
          }
        },
        error: {
          style: {
            borderLeftWidth: 3,
            borderColor: 'red'
          }
        }
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              <div className="mx-1">{icon}</div>
              {t.type !== 'loading' && (
                <button
                  className="position-absolute border-0 bg-white top-0 end-0 h-4 w-4 border-none hover:cursor-pointer"
                  type="button"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              )}
              <div className="my-4 mx-1">{message}</div>
            </>
          )}
        </ToastBar>
      )}
    </ToastWrapper>
  )
}
