import * as React from 'react';

// context
import { useSystem, usePlayer } from '../../context/';

// ui
import { jss } from '../../assets/styled';
import Navbar from 'rsuite/Navbar';
import Dropdown from 'rsuite/Dropdown';
import Animation from 'rsuite/Animation';
import Nav from 'rsuite/Nav';

// bridge
import useBridge from './useBridge'


const useStyles = jss({
  root: {
    position: 'fixed',
    left: 10,
    right: 10,
    bottom: 10,
    zIndex: 1050 - 10, //modal
    display: 'flex',
    justifyContent: 'center',
    '& > div': {
      backdropFilter: 'blur(5px)',
      border: `solid 1px rgba(255,255,255,.1)`,
      backgroundColor: 'rgba(0,0,0,.8)',
      borderRadius: 5,
      opacity: ({ isMoving }: any) => isMoving ? .3 : 1,
      transition: 'opacity .5s ease-in-out',
      padding: '0 10px',
    }
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 150,
    '& > img': {
      width: 50,
      borderRadius: 5,
      marginRight: 10
    }
  },
})

const Panel = React.forwardRef((props: any, ref: any) => {
  const system = useSystem()
  const player = usePlayer()
  const bridge = useBridge()
  const [activeKey, setActiveKey] = React.useState<any>(null);

  const isDisabled = !player.computed.streaming.active
  const isMoving = player.computed.mouse.moving

  const classes = useStyles({ isMoving })

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
          {renderContent()}
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