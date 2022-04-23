import * as React from 'react';
import PropTypes from 'prop-types';

// hooks
import { useMedia } from 'metalib/common/hooks/';

// context
import { usePlayer, useConnection } from '../../context/';

// material
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';

// styles
import { styled } from 'metalib/styles/'

// blocks
import ConnectionForm from './StateConnection/ConnectionForm'


const AppBar = styled.custom(MuiAppBar, theme => ({
  borderRadius: theme.shape.borderRadius,
  width: 'max-content',
}))

const MenuDesktop = styled.ul(theme => ({
  // sx={{ display: { xs: 'none', sm: 'flex' } }

  '& > *': {

  }
}))

const MenuButton = styled.custom(Button, theme => ({
  width: 48,
  height: 48,
  minWidth: 'auto',
  backgroundColor: theme.palette.background.paper,
  color: 'inherit',
}))


const ResponsiveAppBar = (props) => {
  const media = useMedia()
  const player = usePlayer()
  const connection = useConnection()

  const { state, cls, connector } = player

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const icons = [
    ['play', 'Play/Stop', 'play_arrow'],
    ['state', 'Data state', 'info'],
    ['debug', 'Debug data', 'tune'],
    ['logs', 'Pixel Streaming logs', 'notifications'],
    ['commands', 'Commands', 'flag'],
    ['connection', 'Connection', 'vpn_key'],
  ].map(([slug, label, icon]) => {
    let res = {
      label,
      icon,
      onClick: () => props.handleMenu(slug),
      disabled: false,
    }

    // const isStreamDisabled = !state.loaded && state.closed?.code !== 1005

    switch (slug) {
      case 'play':
        res.icon = state.loaded ? 'pause' : 'play_arrow'
        res.onClick = () => {
          connector.switchConnection()
        }
        // res.disabled = isStreamDisabled
        break;

      // case 'state':
      // case 'debug':
      //   res.disabled = isStreamDisabled

    }

    return res;
  })

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

  const renderMenu = (list) => {

    return (
      <div>
        {list.map((item, index) => (
          <MenuItem
            key={index}
            disabled={item.disabled}
            onClick={() => {
              handleCloseUserMenu()
              item.onClick()
            }}>
            <ListItemIcon>
              <Icon fontSize="small">{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText>
              {item.label}
            </ListItemText>
          </MenuItem>
        ))}
      </div>
    )
  }

  const renderMenuDesktop = () => {
    return (
      <Box
        sx={{ p: 1 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography
          variant="caption"
          noWrap
          color="text.secondary"
          component="div"
          style={{ cursor: 'default' }}
          sx={{ my: 1 }}
        >
          DEV
        </Typography>
        <MenuDesktop>
          {icons.map((item, index) => (
            <li key={index}>
              <Tooltip title={item.label} placement="right">
                <IconButton
                  disabled={item.disabled}
                  onClick={() => {
                    handleCloseNavMenu()
                    item.onClick()
                  }}>
                  <Icon>{item.icon}</Icon>
                </IconButton>
              </Tooltip>
            </li>
          ))}
        </MenuDesktop>
      </Box>
    )
  }

  const renderMenuMobile = () => {
    return (
      <Box>
        <Tooltip title="Additional" placement="bottom">
          <MenuButton
            onClick={handleOpenUserMenu}>
            <Icon>video_settings</Icon>
          </MenuButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {renderMenu(icons)}
        </Menu>
      </Box>
    )
  }


  return (
    <AppBar position="static">

      <Toolbar disableGutters variant="dense">
        {media.up.sm ? renderMenuDesktop() : renderMenuMobile()}
      </Toolbar>

      <ConnectionForm />

    </AppBar>
  );
};


ResponsiveAppBar.propTypes = {
  handleMenu: PropTypes.func.isRequired,
};

export default ResponsiveAppBar;
