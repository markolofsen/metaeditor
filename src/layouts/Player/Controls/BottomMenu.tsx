import * as React from 'react';

// mui
import { styled } from '@mui/system';
import { Typography, Button, IconButton, Portal } from '@mui/material';
import { ButtonBase } from "@mui/material";

// components
import IconifyIcon from 'src/@core/components/IconifyIcon'

// blocks
import Gallery from './Gallery'


const RootDiv = styled('div')(({ theme }: any) => ({
  backgroundColor: 'rgba(0,0,0,.5)',
  backdropFilter: 'blur(4px)',
  borderRadius: theme.shape.borderRadius * 1.2,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),

  [theme.breakpoints.up("lg")]: {
    display: 'flex',
    alignItems: 'center',
  },
}))


const GalleryDiv = styled('div')(({ theme }: any) => ({
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
  [theme.breakpoints.down("lg")]: {
    marginTop: theme.spacing(3),
  },
  [theme.breakpoints.up("lg")]: {
    flex: 1,
    marginLeft: '5%',
  },
}))

const MenuList = styled('ul')(({ theme }: any) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,

  display: 'flex',
  overflowX: 'auto',
  '& > li': {
    display: 'flex',
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
  }
}))

export default function BottomMenu() {

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
  return (
    <RootDiv>

      <MenuList>
        {menu.map((item, index) => (
          <ButtonBase
            key={index}
            component="li"
            data-selected={activeIndex === index}
            onClick={() => handleMenuClick(index)}>
            <IconifyIcon icon={item.icon} />
            <Typography component="h5">{item.label}</Typography>
          </ButtonBase>
        ))}
      </MenuList>

      {activeIndex >= 0 && (
        <GalleryDiv>
          <Gallery />
        </GalleryDiv>
      )}

    </RootDiv>
  )
}