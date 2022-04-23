import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// components
import Card from './Card';


const ContentList = styled.ul(theme => ({
  display: 'flex',
  padding: 5,
  minHeight: 100 + (5 * 2),
  cursor: 'pointer',
  '& > [data-li="image"]': {
    width: 100,
    backgroundColor: 'rgba(0,0,0, .4)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: theme.shape.borderRadius,
  },
  '& > [data-li="content"]': {
    flexGrow: 1,
    padding: theme.spacing(1, 2),
  },
}))

function CardItem({ index, onClick, imageSrc, children, ...props }) {

  return (
    <Card key={index}>
      <ContentList onClick={onClick}>

        {imageSrc ? (
          <li data-li="image" style={{
            backgroundImage: `url(${imageSrc})`,
          }} />
        ) : ''}

        <li data-li="content">
          {children}
        </li>
      </ContentList>
    </Card>
  );
}

CardItem.propTypes = {
  index: PropTypes.any,
  imageSrc: PropTypes.string,
  children: PropTypes.node.isRequired,
};


export default CardItem
