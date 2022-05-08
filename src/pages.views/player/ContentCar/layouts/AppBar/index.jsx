import * as React from 'react';

// material
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Icon from '@mui/material/Icon'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse';

// bridge
import useBridge from './useBridge'

// layouts
import TabsMenu from './TabsMenu/'

// blocks
import HelpPanel from './HelpPanel'
import { SignalQuality } from 'metaeditor/snippets/'
import UserMenu from './UserMenu'



export default function CustomBar() {
  const bridge = useBridge()
  const [showTabs, setShowTabs] = React.useState(true)

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Box sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: { xs: 'block', md: 'none' }
      }}>
        <TabsMenu />
      </Box>

      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          top: 'auto',
          pb: 1,
          pt: 5,
          bottom: 0,
          boxShadow: 'none',
          display: { xs: 'none', md: 'flex' },
          background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
        }}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              onClick={() => setShowTabs(c => !c)}
              sx={{ mr: 2 }}
              size="large"
              edge="start"
              color="inherit"
            >
              <Icon>{showTabs ? 'chevron_left' : 'chevron_right'}</Icon>
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 5, textTransform: 'uppercase',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              {bridge.name}
            </Typography>

            <Collapse orientation='horizontal' in={showTabs}>
              <TabsMenu />
            </Collapse>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>

              <SignalQuality>
                {(button) => (
                  <Tooltip title="Signal Quality">
                    <span>
                      {button}
                    </span>
                  </Tooltip>
                )}
              </SignalQuality>

              <Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                <HelpPanel>
                  {(onClick) => (
                    <Tooltip title="Help">
                      <IconButton size="large" onClick={onClick}>
                        <Icon >help</Icon>
                      </IconButton>
                    </Tooltip>
                  )}
                </HelpPanel>
              </Box>

              <UserMenu />

            </Box>

          </Toolbar>
        </Container>
      </AppBar>

    </Box>
  );
}
