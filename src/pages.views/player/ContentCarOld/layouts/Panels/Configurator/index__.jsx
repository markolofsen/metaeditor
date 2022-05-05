import * as React from 'react';

// config
import { env } from 'config/'

// context
import { useLayout } from '../../../context/'

// styles
import { styled } from 'metalib/styles/'

// player components
import CarouselItems from 'src/components/CarouselItems'

// commands
import useBridge from '../../../useBridge'


const ContentList = styled.ul(theme => ({
  // flex: 1,
  // height: '100%',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // ...theme.typography.h6,
  // borderLeft: `solid 1px ${theme.palette.divider}`,
  // paddingLeft: theme.spacing(2),
  // marginLeft: theme.spacing(-2),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  '& > li': {
    backgroundColor: 'rgba(0,0,0,.3)',
    backdropFilter: "blur(5px)",
    padding: theme.spacing(2, 3),
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'all',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'rgba(255,255,255, .3)',
    },
    '& > img': {
      width: 23,
      marginRight: theme.spacing(2),
    }
  }
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
      <ContentList
      // imageIcon={(item) => item.src}
      // onClickItem={(item, index) => {
      //   if (layout.handleDrawer.slug !== item.slug) {
      //     item.cmd.onClick()
      //   }

      //   layout.handleDrawer.open(item.slug)
      // }}
      // onSelected={(item, index) => layout.handleDrawer.slug === item.slug}
      >
        {items.map((item, index) => (
          <li key={index}>
            <img src={item.src} />
            {item.name}
          </li>
        ))}
      </ContentList>
    )
  }

  return (
    <div>
      {renderItems()}
    </div>
  );
}


export default Panel
