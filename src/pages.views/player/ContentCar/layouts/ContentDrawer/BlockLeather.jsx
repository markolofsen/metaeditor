import * as React from 'react';

// config
import { env } from 'config/'

// // context
// import { usePlayer } from 'metaeditor/context/'
// import { useLayout } from 'src/context/'

// components
import { CardItem } from 'metaeditor/components/';

// commands
import useBridge from '../../useBridge'



function DrawerBlock() {
  // const player = usePlayer()
  // const layout = useLayout()
  const bridge = useBridge()

  const c = bridge.leather
  const items = [
    {
      name: 'Leather',
      cmd: c._0,
    },
    {
      name: 'Leather',
      cmd: c._1,
    },
    {
      name: 'Leather',
      cmd: c._2,
    },
    {
      name: 'Leather',
      cmd: c._3,
    },
  ].map((item, index) => ({
    ...item,
    src: env.staticPath('tmp', 'configurator', `leather_${index + 1}.jpg`)
  }))

  return (
    <div>
      {items.map((item, index) => (
        <CardItem
          key={index}
          imageSrc={item.src}
          onClick={() => {
            item.cmd.onClick()
            // const title = item.name + ` #${index}`
            // layout.draggableCard.open(title, (
            //   <Button variant="outlined" onClick={() => {
            //     player.cmd.testCommand({item: index})
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
