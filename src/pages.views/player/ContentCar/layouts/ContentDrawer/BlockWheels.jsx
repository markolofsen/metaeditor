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


function DrawerBlock(props) {
  // const player = usePlayer()
  // const layout = useLayout()
  const bridge = useBridge()

  const c = bridge.wheels
  const items = [
    {
      name: 'Wheel',
      cmd: c._0,
    },
    {
      name: 'Wheel',
      cmd: c._1,
    },
    {
      name: 'Wheel',
      cmd: c._2,
    },
  ].map((item, index) => ({
    ...item,
    src: env.staticPath('tmp', 'configurator', `wheels_${index + 1}.jpg`)
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
