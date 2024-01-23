import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import icon from '../../assets/images/icons/png/x.svg'
import toast from 'react-hot-toast'

import { useUpdateProfileApiMutation } from '../../features/api/userApiSlice'
import { useGetImageUrlMutation } from '../../features/api/eventsApiSlice'
import { values } from 'lodash'
import { useAuth } from '../../hooks/useAuth'

export default function DocumentVerificationModal({ doneVerification }: { doneVerification: any }) {
  const user = useAuth()
  const [UpdateProfile] = useUpdateProfileApiMutation()
  const [getImageUrl] = useGetImageUrlMutation()
  const [getPanImageUrl] = useGetImageUrlMutation()

  const [adhaarCard, setAdhaarCard] = useState('')
  const [panCard, setPanCard] = useState('')

  async function updateAdhaarToApi(event: any) {
    const formData = new FormData()
    formData.append('file', event.target.files[0])

    const adhaarResult: any = await getImageUrl(formData)
    setAdhaarCard(adhaarResult.data.data.url)
  }

  async function updatePanToApi(event: any) {
    const formData = new FormData()
    formData.append('file', event.target.files[0])

    const panResult: any = await getPanImageUrl(formData)
    setPanCard(panResult.data.data.url)
  }

  const handelAdhaarUpdate = async (values: any) => {
    toast.promise(UpdateProfile(values), {
      loading: 'Uploading...',
      success: 'Successfully uploaded information',
      error: 'Error'
    })

    //console.log(values)
    let result: Record<string, any> = await UpdateProfile({
      adhaarCard: adhaarCard,
      panCard: panCard,
      adhaarNumber: values.adhaarNumber,
      panNumber: values.panNumber,
      userId: user.id
    })
    console.log(result)
    doneVerification(false)
  }

  // const handlePanUpdate = async (values: any) => {
  //   toast.promise(UpdateProfile(values), {
  //     loading: 'Uploading...',
  //     success: 'Successfully uploaded information',
  //     error: 'Error'
  //   })

  //   //console.log(values)
  //   let result: Record<string, any> = await UpdateProfile({
  //     panCard: values.panCard
  //   })
  //   console.log(result)
  //   doneVerification(false)
  // }

  return (
    <Modal
      open={true}
      className="modal fade"
      show={doneVerification}
      centered={true}
      size="lg"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      centeredbackdrop="static"
      keyboard={false}
    >
      <form onSubmit={handelAdhaarUpdate}>
        <div>
          <div className="row ">
            <div className="col text-center text-xl-start">
              <h4 className=" ps-4 mt-4 fw-bold m-0">Document Verification</h4>
              <div className=" text-center text-md-end text-xl-end my-2 px-3">
                <button
                  type="button"
                  className=" btn-secondary "
                  onClick={() => doneVerification(false)}
                >
                  <p className="m-0">
                    {/* <img src={icon} alt="#" />
                    {''} */}
                    <i className="fa-solid fa-xmark"></i>
                  </p>
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div className="col-6 col-xl-7 ps-xl-3 ps-2">
              <h5 className="fw-bold text-secondary m-0">Aadhar card</h5>
              <input
                type="file"
                id="adhaar_Card"
                name="adhaarCard"
                placeholder="Upload a profile image"
                onChange={updateAdhaarToApi}
              />
              <img src={adhaarCard} alt="" width={200} />
            </div>
          </div>
        </div>
        <br />
        <div className="col-6 col-xl-7 ps-xl-3 ps-2">
          <input type="number" id="adhaar_Number" name="adhaarNumber" placeholder="Adhaar Number" />
        </div>
        <hr />

        <div>
          <div className="col-6 col-xl-7 ps-xl-3 ps-2">
            <h5 className="fw-bold text-secondary m-0">Pan card</h5>
            <div>
              <input
                type="file"
                id="pan_Card"
                name="panCard"
                placeholder="Upload a profile image"
                onChange={updatePanToApi}
              />
              <img src={panCard} alt="" width={200} />
            </div>
          </div>
          <br />
          <div className="col-6 col-xl-7 ps-xl-3 ps-2">
            <input type="text" name="panNumber" id="pan_Number" placeholder="Pan Number" />
          </div>

          <Modal.Footer>
            <Button className="m-0 fw-normal" type="submit" variant="secondary">
              Done
            </Button>
          </Modal.Footer>
        </div>
      </form>
    </Modal>
  )
}
