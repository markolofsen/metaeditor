import * as React from 'react';

// config
import { env } from 'config/'

// context
import { useLayout } from 'src/context/'

// styles
import { styled } from 'metalib/styles/'

// player components
import CarouselItems from 'src/components/CarouselItems'

// commands
import useBridge from '../../../useBridge'


const ContentDiv = styled.div(theme => ({
  flex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  ...theme.typography.h6,
  borderLeft: `solid 1px ${theme.palette.divider}`,
  paddingLeft: theme.spacing(2),
}))


function Panel() {
  const layout = useLayout()
  const bridge = useBridge()

  const renderItems = () => {

    const c = bridge.views
    const items = [
      {
        name: 'Paint',
        slug: 'paint',
        cmd: c.paint,
      },
      {
        name: 'Wheels',
        slug: 'wheels',
        cmd: c.wheels,
      },
      {
        name: 'Trim',
        slug: 'trim',
        cmd: c.trim,
      },
      {
        name: 'Leather',
        slug: 'leather',
        cmd: c.leather,
      },
      {
        name: 'Seats',
        slug: 'seats',
        cmd: c.seats,
      },
    ].map((item) => ({
      ...item,
      src: env.staticPath('tmp', 'icons', `car_${item.slug}.svg`)
    }))

    return (
      <CarouselItems
        image={(item) => item.src}
        onClickItem={(item, index) => {
          if (layout.handleDrawer.slug === item.slug) {
            bridge.views.default.onClick()
          } else {
            item.cmd.onClick()
          }

          layout.handleDrawer.open(item.slug)
        }}
        onSelected={(item, index) => layout.handleDrawer.slug === item.slug}
        items={items}>
        {(item, index) => {
          return (
            <ContentDiv key={index}>
              {item.name}
            </ContentDiv>
          )
        }}
      </CarouselItems>
    )
  }

  return (
    <div>
      {renderItems()}
    </div>
  );
}


export default Panel
