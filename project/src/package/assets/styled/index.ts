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
