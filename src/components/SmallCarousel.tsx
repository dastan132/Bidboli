import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default function SmallCarousel({ images }: { images: any }) {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} variant="dark" onSelect={handleSelect}>
      {images.map((image: any) => (
        <Carousel.Item key={image}>
          <img className="h-100 w-100 px-1 px-xl-0" src={images?.[0]} alt="#" />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
