import * as React from 'react';
import PropTypes from 'prop-types';

// api
import { env } from 'api/'

// hooks
import { useMedia } from 'metalib/common/hooks/'

// data
import { MetaData } from 'metaeditor'

// context
import { useSystem } from 'metaeditor/context/';
import { useLayout } from 'src/context/';

// styles
import { styled } from 'metalib/styles/'

// material
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import MuiButton from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

// blocks
import HelpPanel from './HelpPanel'
import { SignalQuality } from 'metaeditor/snippets/'



const pages = [
  ['Configurator', 'configurator'],
  ['Rendering', 'rendering'],
  ['Description', 'description'],
  ['Contacts', 'contacts'],
].map(([label, slug]) => ({ label, slug }));




const AppBar = styled.custom(MuiAppBar, theme => ({
  // background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.4) 30%, rgba(0,0,0,1) 100%)',
  background: 'transparent',
  boxShadow: 'none',
}))

const MenuButton = styled.custom(MuiButton, theme => ({
  border: `solid 1px transparent`,
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,.1)',
  },
  '&[data-selected="true"]': {
    backgroundColor: 'rgba(255,255,255,.05)',
    borderColor: 'rgba(255,255,255,.1)',
  }
}))



const ResponsiveAppBar = () => {
  const system = useSystem()
  const layout = useLayout()
  const media = useMedia();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isMobile = media.down.sm

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenu = slug => event => {
    layout.handleMenu(slug)
    handleCloseNavMenu()
  }

  const isMenuSelected = item => item.slug === layout.state.current_menu

  const LibVersion = () => {
    return (
      <Box component="small" sx={{ ml: 1, opacity: .5, fontSize: 11 }}>
        {MetaData.version}
      </Box>
    )
  }

  const demoLinks = system.state.metaeditor?.links || []

  const settings = [
    ...demoLinks,
    [false, false],
    ['Logout', false],
  ].map(([label, href]) => ({ label, href }));

  const renderAppBar = () => {

    return (
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'default' }}
            >
              {env.data.siteLogoName}
              <LibVersion />
            </Typography>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <Icon>menu</Icon>
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((item, index) => (
                  <MenuItem
                    key={index}
                    selected={isMenuSelected(item)}
                    onClick={handleMenu(item.slug)}>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              {env.data.siteLogoName}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((item, index) => {
                const selected = isMenuSelected(item)
                return (
                  <MenuButton
                    data-selected={selected}
                    endIcon={(selected && <Icon>close</Icon>)}
                    key={index}
                    onClick={handleMenu(item.slug)}
                    sx={{ my: 0, mx: 1, color: 'white' }}
                  >
                    {item.label}
                  </MenuButton>
                )
              })}
            </Box>

            <SignalQuality>
              {(button) => (
                <Tooltip title="Signal Quality">
                  <span>
                    {button}
                  </span>
                </Tooltip>
              )}
            </SignalQuality>

            <Tooltip title={layout.state.ui_visible ? 'Hide UI' : 'Show UI'}>
              <span>
                <IconButton onClick={() => layout.handleUiVisible()}>
                  <Icon>{layout.state.ui_visible ? 'visibility' : 'visibility_off'}</Icon>
                </IconButton>
              </span>
            </Tooltip>

            {!isMobile && (
              <HelpPanel>
                {(onClick) => (
                  <Tooltip title="Help">
                    <IconButton onClick={onClick}>
                      <Icon>help</Icon>
                    </IconButton>
                  </Tooltip>
                )}
              </HelpPanel>
            )}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Icon>settings</Icon>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((item, index) => {
                  if (item.label) {
                    return (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          if (item.href) {
                            handleCloseUserMenu()
                            window.open(item.href)
                          }
                        }}
                        disabled={!item.href}>
                        {item.label}
                      </MenuItem>
                    )
                  }

                  return (
                    <Divider key={index} />
                  );
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  return (
    <div>
      {renderAppBar()}
    </div>
  )
};

ResponsiveAppBar.propTypes = {
  // state: PropTypes.object.isRequired,
};

ResponsiveAppBar.defaultProps = {
};

export default ResponsiveAppBar;
