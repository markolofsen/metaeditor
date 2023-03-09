import * as React from 'react'
import { useRouter } from 'next/router';

// mui
import { Box, Divider, Container, Typography } from "@mui/material"
import { TextField, InputAdornment, Button, Stack } from '@mui/material';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

// libs
import { PlayerConfigProps } from 'pixel-streaming'

// configs
import project from "src/configs/project"
import defaultConfig from '../Player/defaultConfig'

// blocks
import ConfigForm from './ConfigForm'
import EmbedSample from './EmbedSample'


export default function ConnectionForm() {

  const router = useRouter();

  // states
  const [address, setAddress] = React.useState('test.domain.com')
  const [localhost, setLocalhost] = React.useState(true)
  const [config, setConfig] = React.useState<PlayerConfigProps>(defaultConfig)

  React.useEffect(() => {
    const playerConfig = localStorage.getItem('playerConfig')
    if (playerConfig) {
      const config = JSON.parse(playerConfig) as PlayerConfigProps

      if (config.psHost) {
        if (config.psHost.includes('127.0.0.1')) {
          setLocalhost(true)
        } else {
          const ss = config.psHost.split('://').slice(-1)[0]
          setAddress(ss)
          setLocalhost(false)
        }
      }

      setConfig(config)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    localStorage.setItem('playerConfig', JSON.stringify(mergeConfig))
    router.push(`/player?ss=${psHost}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const psHost = (() => {
    if (localhost) {
      return 'ws://127.0.0.1:80'
    }
    return 'wss://' + address
  })()

  const mergeConfig: PlayerConfigProps = {
    ...config,
    psHost,
  }

  // render
  return (
    <Container sx={{
      py: 10
    }}>
      <Typography variant="h3" component="h1">
        {project.name} v{project.version}
      </Typography>

      <Box sx={{
        py: 5
      }}>
        <Divider />
      </Box>

      <div>

        <Stack spacing={2} direction="column" component="form" onSubmit={handleSubmit}>

          <FormGroup>
            <FormControlLabel
              onChange={(e: any, checked: boolean) => {
                setLocalhost(checked)
              }}
              control={<Switch checked={localhost} />} label="Use localhost" />
          </FormGroup>

          {!localhost && (
            <TextField
              disabled={localhost}
              label="Address"
              variant="outlined"
              value={address}
              type="text"
              onChange={handleChange}
              helperText="Enter the address of the server"
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  https://
                </InputAdornment>,
              }}
            />
          )}

          <Typography variant="body2" sx={{ py: 2 }}>
            <strong>Pixel Streaming Host:</strong> {psHost}
          </Typography>

          <ConfigForm config={config} setConfig={setConfig} />

          <Box sx={{
            py: 10
          }}>
            <Divider />
            <Button
              type="submit"
              size="large"
              variant="contained">
              Connect
            </Button>
          </Box>

          <EmbedSample config={mergeConfig} />

        </Stack>


      </div>
    </Container>
  )
}