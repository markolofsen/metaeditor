// mui
import { styled, lighten } from '@mui/system';
import { ButtonBase } from "@mui/material";

// libs
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const Card = styled((props: any) => <ButtonBase component="div" {...props} />)(({ theme }: any) => ({
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['background-color']),
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: lighten(theme.palette.background.paper, .05),
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