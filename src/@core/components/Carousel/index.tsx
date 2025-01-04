// mui
import { styled } from '@mui/system';
// import { Box } from "@mui/material";

// libs
import { Splide, SplideSlide, Options } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const RootDiv = styled('div')(({ theme }: any) => ({
  '& .splide__arrow:disabled': {
    display: 'none'
  },
  '& .splide__slide': {
    '& > *': {
      width: '100%'
    }
  }
}))

interface Props extends Options {
  items: React.ReactNode[];
}

export default function Slider({ items, ...props }: Props) {

  return (
    <RootDiv>
      <Splide options={{
        rewind: true,
        perPage: 6,
        gap: '1rem',
        // height: 230,
        pagination: false,
        padding: {
          bottom: 0,
        },
        breakpoints: {
          1200: {
            perPage: 4,
            gap: '.7rem',
            // height: '10rem',
          },
          640: {
            perPage: 2,
            gap: '.7rem',
            // height: '10rem',
          },
          // 480: {
          //   perPage: 1,
          //   gap: '.7rem',
          //   height: '15rem',
          // },
        },
        ...props,
      }}>
        {items.map((item, index) => (
          <SplideSlide key={index}>
            {item}
          </SplideSlide>
        ))}

      </Splide>
    </RootDiv>
  );
}