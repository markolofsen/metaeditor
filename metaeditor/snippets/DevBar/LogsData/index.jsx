import * as React from 'react';

// context
import { usePlayer } from '../../../context/';

// styles
import { styled } from 'metalib/styles/'

// material
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// snippets
import JsonSourceList from '../components/JsonSourceList'


const ToggleButton = styled.custom(MuiToggleButton, (theme) => ({
  fontSize: 11,
}))



function LogsData() {
  const player = usePlayer()
  const [value, setValue] = React.useState('error');

  const logsList = player.cls.logs.list

  const jsonBuilder = () => {
    return logsList.filter(item => item.type === value).map(item => item.payload)
  }

  const menuList = [
    ['error', 'error'],
    ['warn', 'warning'],
    ['info', 'info'],
    ['log', undefined],
    ['func', undefined],
  ].map(([slug, color]) => ({
    slug,
    color,
    counter: logsList.filter(item => item.type === slug).length,
  }))

  return (
    <div>

      <ToggleButtonGroup
        sx={{ mb: 2 }}
        value={value}
        exclusive
        onChange={((event, newValue) => setValue(newValue))}
        size="small"
        fullWidth
      >
        {menuList.map((item, index) => (
          <ToggleButton key={index} value={item.slug} color={item.color}>
            {item.slug} ({item.counter})
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <JsonSourceList
        label="Logs list"
        json={jsonBuilder()}
        onClear={() => player.cls.logs.clear()}
        height={'72vh'} />
    </div>
  )
}

export default LogsData
