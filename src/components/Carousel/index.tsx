import * as React from "react";

// libs
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


interface CarouselItem {
  src: string
  title: string
  onClick: () => void
}
interface Props {
  items: CarouselItem[]
}

export default function Slider({ items }: Props) {

  // const list = Array.from(Array(10).keys()).map((item) => ({
  //   src: 'https://fakeimg.pl/350x230/282828/eae0d0/?retina=1&text=MetaEditor',
  //   title: `Item ${item}`,
  //   onClick: () => {
  //     alert('!')
  //   }
  // }))

  return (
    <Splide options={{
      rewind: true,
      perPage: 5,
      gap: '1rem',
      // height: 230,
      pagination: false,
      padding: {
        bottom: 0,
      },
      breakpoints: {
        640: {
          perPage: 2,
          gap: '.7rem',
          height: '10rem',
        },
        // 480: {
        //   perPage: 1,
        //   gap: '.7rem',
        //   height: '15rem',
        // },
      },
    }}>
      {items.map((item, index) => (
        <SplideSlide key={index}>
          <img
            onClick={item.onClick}
            style={{
              cursor: 'pointer',
              width: '100%',
            }}
            src={item.src}
            alt={item.title} />
        </SplideSlide>
      ))}

    </Splide>
  );
}