import * as React from 'react'

// mui
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

// libs
import { PlayerConfigProps } from 'pixel-streaming'



interface Props {
  setConfig: (config: PlayerConfigProps) => void
  config: PlayerConfigProps
}

export default function ConfigForm({ config, setConfig }: Props) {

  const handleSwitch = (name: string, value: boolean) => {
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
      type: 'switch',
      value: config.debugMode,
      onChange: handleSwitch
    },
    {
      name: 'showToolbar',
      label: 'Show Toolbar',
      type: 'switch',
      value: config.showToolbar,
      onChange: handleSwitch
    },
    // {
    //   name: 'psHost',
    //   label: 'Pixel Streaming Host',
    //   type: 'text',
    //   value: config.psHost,
    //   onChange: handleSwitch
    // },
    {
      name: 'psConfig.autoPlay',
      label: 'Auto Play',
      type: 'switch',
      value: config.psConfig.autoPlay,
      onChange: handleSwitch
    },
    {
      name: 'psConfig.autoConnect',
      label: 'Auto Connect',
      type: 'switch',
      value: config.psConfig.autoConnect,
      onChange: handleSwitch
    },
    {
      name: 'psConfig.startMuted',
      label: 'Start Muted',
      type: 'switch',
      value: config.psConfig.startMuted,
      onChange: handleSwitch
    },
    {
      name: 'psConfig.hoveringMouse',
      label: 'Hovering Mouse',
      type: 'switch',
      value: config.psConfig.hoveringMouse,
      onChange: handleSwitch
    },
    {
      name: 'psConfig.fakeMouseWithTouches',

      label: 'Fake Mouse With Touches',
      type: 'switch',
      value: config.psConfig.fakeMouseWithTouches,
      onChange: handleSwitch
    },
    {
      name: 'psConfig.matchViewportRes',
      label: 'Match Viewport Resolution',
      type: 'switch',
      value: config.psConfig.matchViewportRes,
      onChange: handleSwitch
    },
  ]

  return (
    <div>

      {list.map((item, index) => {
        return (
          <FormGroup key={index}>
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
        )
      })}

    </div>
  )
}