import * as React from 'react';

// styles
import { styled } from 'metalib/styles/'

// libs
import { getDevice } from 'metalib/common/funcs/'
import { useMedia } from 'metalib/common/hooks/'

// context
import { useParent } from 'src/context/';

// material
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';
import ButtonBase from "@mui/material/ButtonBase";

// bridge
import useBridge from '../useBridge'

const RootDiv = styled.div(theme => ({
  flexGrow: 1,
  backgroundColor: 'rgba(0,0,0,.7)',
  backdropFilter: 'blur(2px)',
  borderColor: theme.palette.divider,
  borderStyle: 'solid',
  borderWidth: 0,

  [theme.breakpoints.down('sm')]: {
    borderTopWidth: 1,
  },
  [theme.breakpoints.up('md')]: {
    borderRadius: theme.shape.borderRadius,
    borderWidth: 1,
  },

}))

const SubmenuList = styled.div(theme => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1, 0),
  minWidth: 200,
  '& > div': {
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...theme.typography.body1,
    cursor: 'pointer',
    transition: theme.transitions.create(['background-color']),
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, .1)',
    },
    '& > img': {
      width: 60,
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2),
    }
  }
}))


export default function ScrollableTabsButtonVisible() {
  const bridge = useBridge()
  const parent = useParent()
  const media = useMedia()

  const isMediaMobile = media.down.sm

  const [value, setValue] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showSubmenu, setShowSubmenu] = React.useState(false);

  const refPoperTimeout = React.useRef(null)
  const refViewTimeout = React.useRef(null)

  const handleChange = (event, item) => {

    if (value == item.id) {
      setShowSubmenu(c => !c)
    } else {
      setShowSubmenu(true)
    }


    setValue(item.id);
    setAnchorEl(event.currentTarget);

    clearTimeout(refPoperTimeout.current)
    clearTimeout(refViewTimeout.current)
    refViewTimeout.current = setTimeout(() => {
      if (typeof item.onClick === 'function') {
        item.onClick()
      }
    }, 300)

  };

  const handleClose = () => {
    refPoperTimeout.current = setTimeout(() => {
      setShowSubmenu(false)
    }, 500)
  };


  const renderItems = () => {

    let items = []
    for (let item of bridge.menu) {
      if (item.id === value) {
        // console.error('item', item.items)
        items = item.subitems
        break;
      }
    }

    if (!items) {
      return false
    }

    return (
      <SubmenuList>
        {items.map((item, index) => (
          <ButtonBase
            key={index}
            component="div"
            onClick={() => {
              if (typeof item.onClick === 'function') {
                item.onClick()
              }

              parent.cls.soundClick()

              if (isMediaMobile) {
                setShowSubmenu(false)
              }

            }}>
            {item.preview_small ? (
              <img src={item.preview_small} />
            ) : ''}
            {item.name}
          </ButtonBase>
        ))}
      </SubmenuList>
    )
  }

  const renderPopover = () => {
    const open = Boolean(anchorEl) && showSubmenu;
    const items = renderItems()

    if (items === false) {
      return (<div />)
    }

    if (isMediaMobile) {
      return (
        <Collapse orientation="vertical" in={open} timeout={350}>
          <Box
            style={{
              backgroundColor: 'transparent',
            }}
            sx={{
              pointerEvents: 'all',
              borderBottom: theme => `solid 1px ${theme.palette.divider}`,
              borderRadius: 0,
            }}>
            {items}
          </Box>
        </Collapse>
      )
    }

    return (
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} in={showSubmenu} timeout={350}>
            <Paper
              onMouseEnter={() => clearTimeout(refPoperTimeout.current)}
              onMouseLeave={handleClose}
              sx={{
                pointerEvents: 'all',
                bgcolor: 'rgba(0,0,0,.8)',
                backdropFilter: 'blur(2px)',
                border: theme => `solid 1px ${theme.palette.divider}`,
                marginBottom: 1,
                borderRadius: 1,
              }}>
              {items}
            </Paper>
          </Fade>
        )}
      </Popper>
    )
  }

  return (
    <RootDiv>

      {renderPopover()}

      <Tabs
        value={value || bridge.menu[0]?.id}
        // onChange={handleChange}
        variant="scrollable"
        scrollButtons
        sx={{
          pointerEvents: 'all',
          '& .MuiTabs-indicator': {
            top: 0,
          },
          // '& .Mui-selected': {
          // },
          [`& .${tabsClasses.scrollButtons}`]: {
            display: 'flex',
            '&.Mui-disabled': {
              opacity: 0.3
            },
          },
        }}
      >
        {bridge.menu.map((item, index) => (
          <Tab
            value={item.id}
            onClick={(event) => handleChange(event, item)}
            onMouseEnter={(event) => {
              if (getDevice.isBrowser) {
                handleChange(event, item)
                setShowSubmenu(true)
              }
            }}
            onMouseLeave={(event) => {
              if (getDevice.isBrowser) {
                handleClose()
              }
            }}
            sx={{ py: 2, px: 3 }}
            key={index}
            label={item.name} />
        ))}

      </Tabs>
    </RootDiv>
  );
}
