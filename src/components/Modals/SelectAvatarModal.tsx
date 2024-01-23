import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function SelectAvatarModal({
  handleClose,
  avatars,
  show,
  handleOptionSelect,
  images,
  setImages
}: {
  handleClose: any
  avatars: any
  show: any
  handleOptionSelect: any
  images: any
  setImages: any
}) {
  return (
    <Modal show={show} onHide={handleClose} centered={true} backdrop="static" keyboard={false}>
      <Modal.Header>
        <h3>Select Default Image</h3>
      </Modal.Header>
      <Modal.Body>
        <div id="evnt-avatarbox" className="row mt-2">
          <div className="col-12 col-md-12 col-xl-12">
            <p className="text-secondary px-2">
              Don&apos;t have actual images now? Select relevant avatar for the moment and you can upload
              actual images later.
            </p>
          </div>
          {avatars?.data?.map((avatar: any) => (
            <div key={avatar.id} className="col-3 col-md-2 mb-2">
              <div className="radio-evt-avatar">
                <input type="radio" name="getavatar" id="avatar_0" className="d-none getavatar" />
                <label htmlFor="avatar" className="p-2">
                  <img
                    src={avatar.iconurl}
                    alt=""
                    role="button"
                    onClick={() => {
                      handleOptionSelect((currValues: any) => {
                        return { ...currValues, assetGallery: [avatar.iconurl] }
                      })
                      const prevImages = [...images]
                      const index = prevImages.findIndex((el) => el.type === 'dummyImage')

                      if (index > -1) {
                        prevImages.splice(index, 1, { src: avatar.iconurl, type: 'uploaded' })
                        setImages(prevImages)
                      }
                      handleClose()
                    }}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="w-100">
          Upload Actual Images
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
