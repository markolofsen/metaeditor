import React from 'react'

// ui
import { jss } from 'pixel-streaming'
import Divider from 'rsuite/Divider'

// blocks
import { CommandsUuid } from './CommandsUuid'
import { CommandsAsync } from './CommandsAsync'
import { CommandsSystem } from './CommandsSystem'



const useStyles = jss({
  root: {
    '& h5': {
      marginBottom: 10,
    },
    '& [data-actions]': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 20
    }
  },
})

export const Commands: React.FC<any> = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>

      <CommandsUuid />
      <Divider />
      <CommandsAsync />
      <Divider />
      <CommandsSystem />

    </div>
  )
}