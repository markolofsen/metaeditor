import * as React from 'react'

// ui
import { jss, colors } from "src/components/styled"



const useStyles = jss({
  '@global': {
    '@keyframes move-left-right': {
      '0%': {
        transform: 'translateX(-20px)',
      },
      '50%': {
        transform: 'translateX(20px)',
      },
      '100%': {
        transform: 'translateX(-20px)',
      }
    },
  },

  rootList: {

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    // bottom: 0,
    height: '100vh',
    zIndex: -1,
    listStyle: 'none none',
    margin: 0,
    padding: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    opacity: .8,
    '& > li': {
      animation: 'move-left-right 1s infinite',
      background: `linear-gradient(0deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
      position: 'absolute',
      transition: '0.5s ease-out',
      overflow: 'hidden',
      borderRadius: '20%',
      filter: 'blur(3px)',
      '&:nth-child(1)': {
        animation: 'move-left-right 4s infinite',
        height: '20vmax',
        width: '20vmax',
        opacity: '0.5',
        left: '3%',
        top: '-21%',
        filter: 'blur(8px)',
      },
      '&:nth-child(2)': {
        animation: 'move-left-right 6s infinite',
        height: '23vmax',
        width: '23vmax',
        opacity: 0.4,
        right: '-5%',
        top: '-12%',
        filter: 'blur(4px)',
      },
      '&:nth-child(3)': {
        animation: 'move-left-right 5s infinite',
        height: '15vmax',
        width: '15vmax',
        opacity: 0.1,
        left: '-5%',
        bottom: '5%',
        filter: 'blur(10px)',
      },
      '&:nth-child(4)': {
        animation: 'move-left-right 10s infinite',
        height: '9vmax',
        width: '9vmax',
        opacity: 0.9,
        right: '27%',
        top: '70%',
      },
      '&:nth-child(5)': {
        animation: 'move-left-right 6s infinite',
        height: '14vmax',
        width: '14vmax',
        opacity: 0.1,
        left: '32%',
        bottom: '29%',
      },
      '&:nth-child(6)': {
        animation: 'move-left-right 9s infinite',
        left: '10%',
        top: '35%',
        height: '7vmax',
        width: '7vmax',
        opacity: 0.8,
      },
      '&:nth-child(7)': {
        animation: 'move-left-right 3s infinite',
        height: '18vmax',
        width: '18vmax',
        right: '-5%',
        bottom: '5%',
        opacity: 0.1,
        filter: 'blur(6px)',
      },
    }
  },
})



function BackgroundSqaure() {
  const classes = useStyles()

  return (
    <ul className={classes.rootList}>
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
  )
}

export default BackgroundSqaure