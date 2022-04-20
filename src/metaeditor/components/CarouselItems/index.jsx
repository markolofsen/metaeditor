/* Usage

// components
import CarouselItems from 'components/CarouselItems/'

function Demo() {

  const items = [
    {name: 'Demo 1'},
    {name: 'Demo 2'},
    {name: 'Demo 3'},
    {name: 'Demo 4'},
  ]

  return (
    <CarouselItems
      numberOfCards={{xs: 1, md: 2, default: 4}}
      infiniteLoop
      gutter={10}
      items={items}>
      {(item, index) => {
        return (
          <div>
            {item.name}
          </div>
        )
      }}
    </CarouselItems>
  )
}
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// hooks
import { useMedia } from 'metalib/common/hooks/';

// styles
import { styled } from 'metalib/styles/'

// material
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';


// libs
// https://www.npmjs.com/package/react-items-carousel
import ItemsCarousel from 'react-items-carousel';


const RootDiv = styled.custom(Box, theme => ({
  userSelect: 'none',
  maxWidth: '100vw',
}))

function ArrowButton({ type }) {

  return (
    <IconButton>
      <Icon fontSize="large">
        {type === 'left' ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}
      </Icon>
    </IconButton>
  )
}


function CarouselItems(props) {
  const media = useMedia();

  const [show, setShow] = React.useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  React.useEffect(() => {
    setShow(true)
  }, [])

  const outsideChevron = media.up.lg

  let numberOfCards = props.numberOfCards.default || 4
  for (let key of ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']) {
    if (props.numberOfCards[key] && (media.down[key] || media.only[key])) {
      numberOfCards = props.numberOfCards[key]
      break
    }
  }


  if (!show) {
    const list = props.items.filter((item, index) => index < numberOfCards)
    return (
      <RootDiv style={{
        display: 'flex',
        overflow: 'hidden',
      }}>
        {list.map((item, index) => props.children(item, index))}
      </RootDiv>
    );
  }

  return (
    <RootDiv>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={numberOfCards}
        gutter={props.gutter}
        leftChevron={<ArrowButton type="left" />}
        rightChevron={<ArrowButton type="right" />}
        outsideChevron={outsideChevron}
        chevronWidth={props.chevronWidth}
        infiniteLoop={props.infiniteLoop}
      >

        {props.items.map((item, index) => props.children(item, index))}

      </ItemsCarousel>
    </RootDiv>
  );
};


CarouselItems.propTypes = {
  children: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  infiniteLoop: PropTypes.bool,
  numberOfCards: PropTypes.shape({
    default: PropTypes.number,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
  chevronWidth: PropTypes.number,
  gutter: PropTypes.number,
};

CarouselItems.defaultProps = {
  infiniteLoop: false,
  numberOfCards: {
    xs: 1,
    md: 2,
    default: 4,
  },
  chevronWidth: 60,
  gutter: 20,
};


export default CarouselItems
