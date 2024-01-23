import React, { useEffect, useState, useRef } from 'react'

export default function CarouselWithThumbs({
  images,
  imagesType,
  type,
  setImageList: handleChange,
  handleRemoveImage,
  maxLimitReached
}: any) {
  const carouselRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [currentImage, setCurrentImage] = useState(images?.[0])

  useEffect(() => {
    if (images?.length) {
      setCurrentImage(type ? images[4] : images[0])
    }
  }, [images])

  return (
    <div className="container">
      <div className="carousel-container position-relative row">
        <div id="myCarousel" className="carousel slide" data-ride="carousel" ref={carouselRef}>
          <div className="carousel-inner">
            <div className="carousel-item active" data-slide-number="0">
              {type ? (
                <>
                  <input
                    name="file"
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    disabled={maxLimitReached}
                    style={{ display: 'none' }}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="image-upload"
                    style={{ display: 'block', position: 'relative' }}
                    role="button"
                  >
                    {maxLimitReached ||
                      (imagesType?.find((i: any) => i.src === currentImage)?.type !==
                        'dummyImage' && (
                        <i
                          className="fa fa-trash text-danger mt-3 me-3 position-absolute top-1 end-0"
                          style={{ color: 'white' }}
                          onClick={(e) => {
                            e.preventDefault()
                            handleRemoveImage(currentImage)
                          }}
                        ></i>
                      ))}
                    <img
                      src={currentImage}
                      className="d-block w-100"
                      alt="..."
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </label>
                </>
              ) : (
                <img
                  src={currentImage}
                  className="d-block w-100"
                  alt="..."
                  data-type="image"
                  data-toggle="lightbox"
                  data-gallery="example-gallery"
                />
              )}
            </div>
          </div>
        </div>

        <div id="carousel-thumbs" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-scroll mx-0 justify-content-center">
                {images?.map((image: string, index: any) => (
                  <div
                    key={index + image}
                    id="carousel-selector-0"
                    className={`thumb col-4 col-sm-2 px-1 py-2 position-relative ${
                      image === currentImage ? 'selected' : ''
                    }`}
                    data-slide-to="0"
                    onClick={() => {
                      setCurrentImage(image)
                    }}
                  >
                    <img src={image} className="img-fluid" alt="..." />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" role="button" data-slide="prev">
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              onClick={() => {
                setCurrentImage((currentImage: string) => {
                  return images.at(
                    images.indexOf(currentImage) === 0
                      ? images.length - 1
                      : images.indexOf(currentImage) - 1
                  )
                })
              }}
            ></span>
          </a>
          <a className="carousel-control-next" role="button" data-slide="next">
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              role="button"
              onClick={() => {
                setCurrentImage((currentImage: string) => {
                  return images.at(
                    images.indexOf(currentImage) === images.length - 1
                      ? 0
                      : images.indexOf(currentImage) + 1
                  )
                })
              }}
            ></span>
          </a>
        </div>
      </div>
    </div>
  )
}
