import * as React from 'react'

// context
import { useSystem } from '../../../context/';

// ui
import Sidenav from 'rsuite/Sidenav';
import Nav from 'rsuite/Nav';
// import Dropdown from 'rsuite/Dropdown';

// icons
import ListIcon from '@rsuite/icons/List';
import HistoryIcon from '@rsuite/icons/History';
import SettingIcon from '@rsuite/icons/Setting';
import PlayOutlineIcon from '@rsuite/icons/PlayOutline';
import ProjectIcon from '@rsuite/icons/Project';

// components
import { CustomDrawer } from '../../../components/Drawer'

// panels
import { Panel as PanelPlayerData } from './PanelPlayerData'
import { Panel as PanelMetaData } from './PanelMetaData'
import { Panel as PanelMenuProject } from './PanelMenuProject'
import { Panel as PanelMenuSystem } from './PanelMenuSystem'
import { Panel as PanelHistoryCommands } from './PanelHistoryCommands'
import { Panel as PanelHistoryCallbacks } from './PanelHistoryCallbacks'
import { Panel as PanelSettings } from './PanelSettings'
import { Panel as PanelPixelStreaming } from './PanelPixelStreaming'

interface Props {
  onClose: Function,
}

export const DevMenu: React.FC<Props> = (props) => {
  const refDrawer = React.useRef<any>(null)
  const system = useSystem()

  const menuList = [
    ['Player Data', 'playerData', <ListIcon />, <PanelPlayerData />],
    ['Meta Data', 'metaData', <ListIcon />, <PanelMetaData />],
    ['Menu: system', 'menuSystem', <ProjectIcon />, <PanelMenuSystem />],
    ['Menu: project', 'menuProject', <ProjectIcon />, <PanelMenuProject />],
    ['History: commands', 'historyCommands', <HistoryIcon />, <PanelHistoryCommands />],
    ['History: callbacks', 'historyCallbacks', <HistoryIcon />, <PanelHistoryCallbacks />],
    ['Settings', 'settings', <SettingIcon />, <PanelSettings />],
    ['Pixel Streaming', 'pixelStreaming', <PlayOutlineIcon />, <PanelPixelStreaming />],
  ].map(([label, slug, Icon, Component]) => ({ label, slug, Icon, Component }))

  const openPanel = (item: any) => {
    system.dispatch.updateDevBar({ slug: item.slug })
    refDrawer.current.open(item.label, true, item.Component)
  }


  return (
    <div>
      <CustomDrawer
        onClose={() => props.onClose()}
        ref={refDrawer} />

      <Sidenav defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>
          <Nav>
            {menuList.map((item, index) => {
              return (
                <Nav.Item
                  key={index}
                  icon={<>{item.Icon}</>}
                  eventKey={index.toString()}
                  children={item.label}
                  onClick={() => {
                    openPanel(item)
                  }} />
              )
            })}

            {/* <Dropdown eventKey="3" title="Advanced" icon={<Magic />}>
              <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
              <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
              <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
              <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
            </Dropdown> */}
            {/* <Dropdown eventKey="4" title="Settings" icon={undefined}>
              <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
              <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
              <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
            </Dropdown> */}
          </Nav>
        </Sidenav.Body>
      </Sidenav>

      <></>
    </div>
  )
}