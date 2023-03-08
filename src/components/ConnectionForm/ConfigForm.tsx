import * as React from 'react'

// mui
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

// libs
import { PlayerConfigProps } from 'pixel-streaming'



interface Props {
  setConfig: (config: PlayerConfigProps) => void
  config: PlayerConfigProps
}

export default function ConfigForm({ config, setConfig }: Props) {

  const handleChange = (name: string, value: boolean) => {
    if (name.startsWith('psConfig.')) {
      const psConfig = config.psConfig
      setConfig({ ...config, psConfig: { ...psConfig, [name.replace('psConfig.', '')]: value } })
    } else {
      setConfig({ ...config, [name]: value })
    }
  }

  const list = [
    {
      name: 'debugMode',
      label: 'Debug Mode',
      type: 'select',
      value: config.debugMode,
      onChange: handleChange,
      options: ['on', 'off', 'commands', 'responses'].map((item) => ({
        label: item,
        value: item,
      }))
    },
    {
      name: 'showToolbar',
      label: 'Show Toolbar',
      type: 'switch',
      value: config.showToolbar,
      onChange: handleChange
    },
    // {
    //   name: 'psHost',
    //   label: 'Pixel Streaming Host',
    //   type: 'text',
    //   value: config.psHost,
    //   onChange: handleChange
    // },
    {
      name: 'psConfig.autoPlay',
      label: 'Auto Play',
      type: 'switch',
      value: config.psConfig.autoPlay,
      onChange: handleChange
    },
    {
      name: 'psConfig.autoConnect',
      label: 'Auto Connect',
      type: 'switch',
      value: config.psConfig.autoConnect,
      onChange: handleChange
    },
    {
      name: 'psConfig.startMuted',
      label: 'Start Muted',
      type: 'switch',
      value: config.psConfig.startMuted,
      onChange: handleChange
    },
    {
      name: 'psConfig.hoveringMouse',
      label: 'Hovering Mouse',
      type: 'switch',
      value: config.psConfig.hoveringMouse,
      onChange: handleChange
    },
    {
      name: 'psConfig.fakeMouseWithTouches',

      label: 'Fake Mouse With Touches',
      type: 'switch',
      value: config.psConfig.fakeMouseWithTouches,
      onChange: handleChange
    },
    {
      name: 'psConfig.matchViewportRes',
      label: 'Match Viewport Resolution',
      type: 'switch',
      value: config.psConfig.matchViewportRes,
      onChange: handleChange
    },
  ]

  return (
    <div>
      <Typography variant='h4' sx={{ pt: 10, pb: 6 }} color="secondary">
        Additional Config
      </Typography>


      <Stack spacing={5} direction="column">
        {list.map((item, index) => {
          if (item.type == 'select') {
            // return item.value
            return (
              <div key={index}>
                <TextField
                  sx={{ minWidth: 300 }}
                  size="small"
                  select
                  label={item.label}
                  value={item.value}
                  onChange={(event: any) => {
                    item.onChange(item.name, event.target.value)
                  }}
                >
                  {item.options?.map((option, i) => (
                    <MenuItem key={`${index}-${i}`} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            )
          }

          if (item.type == 'switch' && typeof item.value === 'boolean') {
            return (
              <div key={index}>
                <FormGroup>
                  <FormControlLabel
                    sx={{
                      userSelect: 'none',
                    }}
                    name={item.name}
                    onChange={(e: any, checked: boolean) => {
                      item.onChange(item.name, checked)
                    }}
                    control={<Switch checked={item.value} />} label={item.label} />
                </FormGroup>
              </div>
            )
          }

          return null

        })}
      </Stack>

    </div>
  )
}