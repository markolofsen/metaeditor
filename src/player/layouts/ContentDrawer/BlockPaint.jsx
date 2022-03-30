import * as React from 'react';

// api
import { env } from 'api/'

// context
import { usePlayer } from 'metaeditor/context/'
import { useLayout } from 'player/context/'

// material
import Button from '@mui/material/Button';

// components
import { CardItem } from 'metaeditor/components/';



function DrawerBlock(props) {
  const player = usePlayer()
  const layout = useLayout()

  const tmp = ['Color name']
  const items = Array(5).fill(tmp)
    .map(([name], index) => ({
      name,
      src: env.staticPath('tmp', 'configurator', `paint_${index + 1}.jpg`)
    }))

  return (
    <div>
      {items.map((item, index) => (
        <CardItem
          key={index}
          imageSrc={item.src}
          onClick={() => {
            const title = item.name + ` #${index}`
            layout.draggableCard.open(title, (
              <Button variant="outlined" onClick={() => {
                player.cmd.testCommand({ item: index })
              }}>Call</Button>
            ))
          }}>
          {item.name} #{index}
        </CardItem>
      ))}
    </div>
  );
}

export default DrawerBlock
