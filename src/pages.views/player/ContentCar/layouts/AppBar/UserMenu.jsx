import * as React from 'react';

// context
import { useSystem } from 'metaeditor/context/';

// material
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';


export default function UserMenu() {
  const system = useSystem()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const demoLinks = system.state.metaeditor?.links || []


  const settings = [
    ...demoLinks,
    [false, false],
    ['Logout', false],
  ].map(([label, href]) => ({ label, href }));

  const open = Boolean(anchorEl)

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Menu">
        <IconButton onClick={handleOpen}>
          <Icon>menu</Icon>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {settings.map((item, index) => {
          if (item.label) {
            return (
              <MenuItem
                key={index}
                onClick={() => {
                  if (item.href) {
                    handleClose()
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
  )
}