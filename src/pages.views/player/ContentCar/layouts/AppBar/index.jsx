import * as React from 'react';

// material
// import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container'
import Icon from '@mui/material/Icon'
import Tooltip from '@mui/material/Tooltip'

// layouts
import TabsMenu from './TabsMenu/'

// blocks
import HelpPanel from './HelpPanel'
import { SignalQuality } from 'metaeditor/snippets/'



export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Icon>mail</Icon>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Icon>notifications_icon</Icon>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Icon>account_circle</Icon>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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
              sx={{ mr: 2 }}
              size="large"
              edge="start"
              color="inherit"
            >
              <Icon>menu</Icon>
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
              MetaEditor
            </Typography>

            <Box>
              <TabsMenu />
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

              {/* <IconButton size="large" color="inherit">
                <Icon>network_wifi</Icon>
              </IconButton>
              <IconButton size="large" color="inherit">
                <Icon>help</Icon>
              </IconButton> */}

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

            </Box>
            {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
