import * as React from 'react'

// context
import { useSystem } from '../../context/';

// hooks
import { useHotkeys } from '../../hooks/useHotkeys'

// ui
import { jss } from '../../assets/styled';
import IconButton from 'rsuite/IconButton';
import GearIcon from '@rsuite/icons/Gear';

// components
import { CustomDrawer } from '../../components/Drawer'

// blocks
import { DevMenu } from './DevMenu'
import { Actions } from './Actions/'
import { UpdateMessage } from './UpdateMessage'


const useStyles = jss({
  title: {
    display: 'flex',
    alignItems: 'center',
    '& label': {
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

      const currentVersion = system.cls.apiData?.module?.current

      const title = (
        <div className={classes.title}>
          MetaEditor {currentVersion ? (<span><label>v{currentVersion}</label></span>) : ''}
        </div>
      )

      refDrawer.current.open(title)

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
