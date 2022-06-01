import * as React from 'react'

// config
import { config } from '../../assets/config';

// context
import { useSystem } from '../../context/';

// hooks
import { useHotkeys } from '../../hooks/useHotkeys'

// ui
import { jss, media } from '../../assets/styled';
import IconButton from 'rsuite/IconButton';
import GearIcon from '@rsuite/icons/Gear';

// components
import { CustomDrawer } from '../../components/Drawer'

// blocks
import { DevMenu } from './DevMenu'
import { Actions } from './Actions/'
import { UpdateMessage } from './UpdateMessage'


const useStyles = jss({
  titleList: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    '& > li:nth-child(2) > span': {
      marginLeft: 10,
      padding: '3px 5px',
      borderRadius: 4,
      fontSize: 11,
      backgroundColor: 'rgba(255,255,255,.3)',
    }
  }
})

interface Props {
  // children: any
}

export const DevBar: React.FC<Props> = () => {
  const classes = useStyles()
  const system = useSystem()
  const refDrawer = React.useRef<any>(null)

  const setDrawerSlug = () => {
    system.dispatch.updateDevBar({ slug: 'drawer' })
  }

  const openDrawer = () => {
    setDrawerSlug()
    if (refDrawer.current.isOpen) {
      refDrawer.current.close()
    } else {
      refDrawer.current.open()
    }
  }

  useHotkeys('ctrl+z', (e) => {
    if (!e.repeat) {
      openDrawer()
      return;
    }
  }, [])


  return (
    <div>

      <IconButton
        onClick={() => openDrawer()}
        icon={<GearIcon />} circle size="lg" />

      <CustomDrawer
        onClose={() => {
          system.dispatch.updateDevBar({ slug: null })
        }}
        ref={refDrawer}
        withBody={false}
        title={(
          <ul className={classes.titleList}>
            <li>
              <h6>
                MetaEditor
              </h6>
            </li>
            <li>
              <span>v{config.version}</span>
            </li>
          </ul>
        )}
        ActionsComponent={<Actions />}>
        <div>
          <UpdateMessage />
          <DevMenu onClose={() => {
            setDrawerSlug()
          }} />
        </div>
      </CustomDrawer>

    </div>
  );
};
