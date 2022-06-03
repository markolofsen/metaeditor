/**
 * Demo usage
 */

// // ui
// import { jss } from '../assets/styled';
// const useStyles = jss({
//   root: {
//     position: (props: any) => props.position,
//   },
// })

// const classes = useStyles({ position: 'absolute' })
// 
// <div className={classes.root} />

import * as React from 'react'

export { createUseStyles as jss } from 'react-jss'


// colors
import {
  blue as primary,
  lightGreen as success,
} from './colors/';

export const colors = {
  primary,
  success,
}

interface MediaSizes {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export const media = new class {

  /*
  Usage in css:

  root: {
    [media.down.sm]: {
      height: 28,
    },
  },
  */

  sizes: MediaSizes
  getMin: Function
  getMax: Function

  constructor() {
    this.getMax = (int: number) => `@media (max-width: ${int}px)`
    this.getMin = (int: number) => `@media (min-width: ${int}px)`

    this.sizes = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    }

  }

  // {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536}

  get down() {
    return {
      xs: this.getMax(this.sizes.sm),
      sm: this.getMax(this.sizes.md),
      md: this.getMax(this.sizes.lg),
      lg: this.getMax(this.sizes.xl),
      // xl: this.getMax(this.sizes.xl),
    };
  }

  get up() {
    return {
      xs: this.getMin(this.sizes.xs),
      sm: this.getMin(this.sizes.sm),
      md: this.getMin(this.sizes.md),
      lg: this.getMin(this.sizes.lg),
      xl: this.getMin(this.sizes.xl),
    };
  }
}