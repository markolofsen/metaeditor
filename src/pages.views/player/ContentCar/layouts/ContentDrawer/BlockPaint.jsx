import * as React from 'react';

// config
import { env } from 'config/'

// context
import { useSystem, usePlayer } from 'metaeditor/context/'
// import { useLayout } from 'src/context/'

// // material
// import Button from '@mui/material/Button';

// components
import { CardItem } from 'metaeditor/components/';

// commands
import useBridge from '../../useBridge'


function DrawerBlock() {
  // const player = usePlayer()
  // const system = useSystem()
  // const layout = useLayout()
  const bridge = useBridge()

  const c = bridge.paint
  const items = [
    {
      name: 'Red',
      command_uuid: c.red,
      cmd: c.red,
    },
    {
      name: 'Black',
      cmd: c.black,
    },
    {
      name: 'White',
      cmd: c.white,
    },
    {
      name: 'Metalic',
      cmd: c.metalic,
    },
    {
      name: 'Blue',
      cmd: c.blue,
    },
  ].map((item, index) => ({
    ...item,
    src: env.staticPath('tmp', 'configurator', `paint_${index + 1}.jpg`)
  }))

  return (
    <div>
      {items.map((item, index) => (
        <CardItem
          key={index}
          imageSrc={item.src}
          onClick={() => {

            item.cmd.onClick()
            // system.clsApi.metaEmitAsync(item.command_uuid)

            // const title = item.name + ` #${index}`
            // layout.draggableCard.open(title, (
            //   <Button variant="outlined" onClick={() => {
            //     player.cmd.testCommand({ item: index })
            //   }}>Call</Button>
            // ))
          }}>
          {item.name} #{index}
        </CardItem>
      ))}
    </div>
  );
}

export default DrawerBlock
