import * as React from 'react';

// context
import { useSystem, usePlayer } from '../../context/';

// hooks
import { useMedia } from '../../hooks/useMedia';

// ui
import { jss, media } from '../../assets/styled';
import Navbar from 'rsuite/Navbar';
import Dropdown from 'rsuite/Dropdown';
import Animation from 'rsuite/Animation';
import Nav from 'rsuite/Nav';
import Popover from 'rsuite/Popover';
import Whisper from 'rsuite/Whisper';

// bridge
import useBridge from './useBridge'


const useStyles = jss({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1050 - 10, //modal
    display: 'flex',
    justifyContent: 'center',

    [media.up.sm]: {
      left: 10,
      right: 10,
      bottom: 10,
    },
    '& > div': {
      opacity: ({ isMoving }: any) => isMoving ? .3 : 1,
      backgroundColor: 'rgba(0,0,0,.8)',

      [media.down.sm]: {
        width: '100%',
        borderTop: `solid 1px rgba(255,255,255,.1)`,
      },
      [media.up.sm]: {
        backdropFilter: 'blur(5px)',
        border: `solid 1px rgba(255,255,255,.1)`,
        borderRadius: 5,
        transition: 'opacity .5s ease-in-out',
        padding: '0 10px',
      },
    }
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 150,
    maxWidth: 200,
    '& > img': {
      width: 50,
      borderRadius: 5,
      marginRight: 10
    }
  },

  mobileNavbar: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: '0 10px',
    // minHeight: 56,
    '& > [data-li="logo"]': {
      fontWeight: 600,
      minWidth: 100,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: '15px 10px',
    },
    '& > [data-li="menu"]': {
      flex: 1,
      overflowY: 'auto',
    }
  },
  mobileMenu: {
    display: 'flex',
    '& > li': {
      padding: '15px 10px',
      '& label': {
        fontSize: '.8rem',
        textTransform: 'uppercase',
      }
    }
  }
})

// interface MobilePopoverProps {

// }

const MenuPopover = React.forwardRef(({ onClose, items, ...rest }: any, ref: any) => {
  const classes = useStyles({ isMoving: false })

  return (
    <Popover ref={ref} {...rest} full>
      <Dropdown.Menu>
        {items.map((item: any, index: number) => (
          <Dropdown.Item key={index} onClick={() => {
            item.onClick()
            onClose()
          }}>
            <div className={classes.dropdownItem}>
              {item.preview_small ? (
                <img src={item.preview_small} />
              ) : ''}
              {item.name}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Popover>
  )
});

const Panel = React.forwardRef((props: any, ref: any) => {
  const system = useSystem()
  const player = usePlayer()
  const bridge = useBridge()
  const _media = useMedia()

  const refMobilePopover = React.useRef<any>();

  const [activeKey, setActiveKey] = React.useState<any>(null);

  const isDisabled = !player.computed.streaming.active
  const isMoving = player.computed.mouse.moving

  const classes = useStyles({ isMoving })

  const isMobile = _media.xs || _media.sm

  const renderMobileMenu = () => {

    const closeMobileMenu = () => {
      refMobilePopover.current.close()
    }

    return (
      <div>
        <ul className={classes.mobileNavbar}>
          <li data-li="logo">
            {system.project.name}
          </li>
          <li data-li="menu">
            <ul className={classes.mobileMenu}>
              {bridge.menu.map((item: any, index: number) => {
                if (item.subitems.length > 0) {
                  return (
                    <li key={index}>
                      <Whisper
                        controlId="mobile-menu-popover"
                        placement={index < bridge.menu.length - 3 ? "top" : "topEnd"}
                        trigger="click"
                        ref={refMobilePopover}
                        speaker={(
                          <MenuPopover
                            items={item.subitems}
                            onClose={closeMobileMenu}
                          />
                        )}
                      >
                        <label>
                          {item.name}
                        </label>
                      </Whisper>
                    </li>
                  )
                }

                return (
                  <li key={index}
                    onClick={(event) => {
                      event.preventDefault()
                      item.onClick()
                      closeMobileMenu()
                    }}>
                    <label>
                      {item.name}
                    </label>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </div>
    )
  }

  const renderContent = () => {

    return (

      <Navbar appearance='subtle'>
        <Navbar.Brand style={{ cursor: 'default' }}>
          <strong>
            {system.project.name}
          </strong>
        </Navbar.Brand>
        <Nav
          onSelect={setActiveKey}
          activeKey={activeKey}
          style={{
            whiteSpace: 'unset',
          }}>
          {bridge.menu.map((item: any, index: number) => {

            if (item.subitems.length > 0) {
              return (
                <Dropdown
                  key={index}
                  eventKey={index}
                  placement="topStart"
                  title={item.name}>
                  {item.subitems.map((subitem: any, i: number) => {
                    const key = `${index}-${i}`
                    return (
                      <Dropdown.Item
                        key={key}
                        eventKey={key}
                        disabled={isDisabled}
                        onClick={() => subitem.onClick()}>
                        <div className={classes.dropdownItem}>
                          {subitem.preview_small ? (
                            <img src={subitem.preview_small} />
                          ) : ''}
                          {subitem.name}
                        </div>
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown>
              )
            }

            return (
              <Nav.Item
                key={index}
                eventKey={index.toString()}
                disabled={isDisabled}
                onClick={(event) => {
                  event.preventDefault()
                  item.onClick()
                }}>
                {item.name}
              </Nav.Item>
            )

          })}

        </Nav>
        {/* <Nav pullRight>
            <Nav.Item>Settings</Nav.Item>
          </Nav> */}

      </Navbar >

    )
  }

  return (
    <div className={classes.root}>
      <div>
        <div {...props} ref={ref}>
          {isMobile ? renderMobileMenu() : renderContent()}
        </div>
      </div>
    </div>
  );
})


export const QuickMenu: React.FC<any> = () => {
  const system = useSystem()

  if (!system.project.exist) {
    return (<div />)
  }

  return (
    <Animation.Slide in={true} placement='bottom'>
      {(props, ref) => <Panel {...props} ref={ref} />}
    </Animation.Slide>
  )
}