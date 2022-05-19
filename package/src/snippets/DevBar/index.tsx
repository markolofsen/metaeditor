import * as React from 'react'

// context
import { useSystem } from '../../context/';

// hooks
import { useHotkeys } from '../../hooks/useHotkeys'

// ui
import IconButton from 'rsuite/IconButton';
import GearIcon from '@rsuite/icons/Gear';

// components
import { CustomDrawer } from '../../components/Drawer'

// blocks
import { DevMenu } from './DevMenu'
import { Actions } from './Actions/'
import { UpdateMessage } from './UpdateMessage'


interface Props {
  // children: any
}

export const DevBar: React.FC<Props> = () => {
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
      refDrawer.current.open('Menu')
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
