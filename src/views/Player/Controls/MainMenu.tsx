import * as React from 'react';

// mui
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { ButtonBase } from "@mui/material";

// components
import IconifyIcon from 'src/@core/components/IconifyIcon'
import Carousel from 'src/@core/components/Carousel'


const MenuList = styled('div')(({ theme }: any) => ({
  flex: 1,
}))

const CardItem = styled((props: any) => <ButtonBase component="div" {...props} />)(({ theme }: any) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 6),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color']),
  // ':not(:last-child)': {
  //   borderRight: `1px solid ${theme.palette.divider}`,
  // },
  '&[data-selected="true"]': {
    backgroundColor: 'rgba(255,255,255, .1)',
    '& > svg': {
      color: theme.palette.primary.main,
    },
    '& > h5': {
      color: theme.palette.primary.main,
    }
  },
  '& > svg': {
    transition: theme.transitions.create(['color']),
    fontSize: '1.8rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  '& > h5': {
    transition: theme.transitions.create(['color']),
    display: 'block',
    textAlign: 'center',
    ...theme.typography.caption,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
  }
}))

export default function MainMenu() {

  const [activeIndex, setActiveIndex] = React.useState(-1)

  const handleMenuClick = (index: number) => {
    setActiveIndex(index)
  }

  // render
  const menu = [
    {
      icon: 'ph:car-profile',
      label: 'Exterior',
    },
    {
      icon: 'mdi:car-seat',
      label: 'Interior',
    },
    {
      icon: 'fluent:options-24-regular',
      label: 'Functions',
    },
    {
      icon: 'ion:switch-outline',
      label: 'Modes',
    },
    {
      icon: 'mdi:weather-fog',
      label: 'environment',
    },
    {
      icon: 'ic:outline-music-note',
      label: 'Media',
    },
  ]

  const items = menu.map((item, index) => (
    <CardItem
      key={index}
      data-selected={activeIndex === index}
      onClick={() => handleMenuClick(index)}>
      <IconifyIcon icon={item.icon} />
      <Typography component="h5">{item.label}</Typography>
    </CardItem>
  ))

  return (
    <MenuList>
      <Carousel
        rewind={false}
        // arrows={false}
        perPage={6}
        gap={0}
        breakpoints={{
          1400: {
            perPage: 4,
            gap: 0,
          },
          1200: {
            perPage: 3,
            gap: 0,
          },
          900: {
            perPage: 5,
            gap: 0,
          },
          640: {
            perPage: 4,
            gap: 0,
          },
          430: {
            perPage: 3,
            gap: 0,
          },
        }}
        items={items} />
    </MenuList>
  )
}