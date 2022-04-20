import * as React from 'react';
import PropTypes from 'prop-types';

// context
import { usePlayer } from '../../../context/';

// styles
import { styled } from 'metalib/styles/'

// blocks
import MyCommands from './MyCommands/'

// snippets
import JsonSourceList from '../components/JsonSourceList'


const DataList = styled.ul(theme => ({
  display: 'flex',
  flexDirection: 'column',
  // height: '100%',
  '& > li': {
    paddingTop: theme.spacing(2),
    '&:nth-child(1)': {
      paddingTop: 0,
    },
    '&:nth-child(n+2)': {
      minHeight: 250,
      maxHeight: '50%',
    }
  }
}))

function CommandsList() {
  const player = usePlayer()

  return (
    <DataList>
      <li>
        <MyCommands />
      </li>
      <li>
        <JsonSourceList
          label="Commands"
          json={player.cls.commands.list}
          onClear={() => player.cls.commands.clear()}
          height={undefined} />
      </li>
      <li>
        <JsonSourceList
          label="Callbacks"
          json={player.cls.callbacks.list}
          onClear={() => player.cls.callbacks.clear()}
          height={undefined} />
      </li>
    </DataList>
  )
}

export default CommandsList
