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

export const media = new class {

  /*
  Usage in css:

  root: {
    [media.down.sm]: {
      height: 28,
    },
  },
  */

  min: Function
  max: Function

  constructor() {
    this.min = (int: number) => `@media (min-width: ${int}px)`
    this.max = (int: number) => `@media (max-width: ${int}px)`
  }

  // {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536}

  get down() {
    return {
      xs: this.max(600),
      sm: this.max(900),
      md: this.max(1200),
      lg: this.max(1536),
      // xl: this.max(1536),
    };
  }
  get up() {
    return {
      xs: this.min(0),
      sm: this.min(600),
      md: this.min(900),
      lg: this.min(1200),
      xl: this.max(1536),
    };
  }
}