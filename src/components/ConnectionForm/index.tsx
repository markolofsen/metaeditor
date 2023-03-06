import * as React from 'react'
import { useRouter } from 'next/router'

// mui
import { Box, Divider, Container, Typography } from "@mui/material"
import { TextField, Button, Stack } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';


// configs
import project from "src/configs/project"

export default function ConnectionForm() {
  const router = useRouter()

  // states
  const [address, setAddress] = React.useState('test.domain.com')
  const [localhost, setLocalhost] = React.useState(true)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const href = `/player?ss=${getAddress}`
    router.push(href)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const getAddress = (() => {
    if (localhost) {
      return 'ws://127.0.0.1:80'
    }
    return 'wss://' + address
  })()

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
              control={<Switch defaultChecked />} label="Use localhost" />
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
            <strong>Address:</strong> {getAddress}
          </Typography>

          <div>
            <Button
              type="submit"
              size="large"
              variant="contained">
              Connect
            </Button>
          </div>
        </Stack>


      </div>
    </Container>
  )
}