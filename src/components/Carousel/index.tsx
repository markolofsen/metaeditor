// mui
import { styled, alpha, lighten } from '@mui/system';
import { ButtonBase } from "@mui/material";

// libs
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const Card = styled((props: any) => <ButtonBase component="div" {...props} />)(({ theme }: any) => ({
  borderRadius: theme.shape.borderRadius,
  width: '100%',

  transition: theme.transitions.create(['background-color', 'border-color']),
  overflow: 'hidden',
  border: `solid 1px rgba(255,255,255, .2)`,
  backgroundColor: 'rgba(0,0,0,.2)',
  backdropFilter: 'blur(4px)',
  '&:hover': {
    borderColor: 'rgba(255,255,255, .5)',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  '& > *': {
    width: '100%',
  }
}));

interface Props {
  items: JSX.Element[]
}

export default function Slider({ items }: Props) {

  return (
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
    }}>
      {items.map((item, index) => (
        <SplideSlide key={index}>
          <Card children={item} />
        </SplideSlide>
      ))}

    </Splide>
  );
}