import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// components
import { CarouselItems } from 'metaeditor/components/'


const RootDiv = styled.div(theme => ({

  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(0, 2, 2),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(2, 10),
  },
}))

const ItemList = styled.ul(theme => ({
  display: 'flex',
  pointerEvents: 'all',
  cursor: 'pointer',
  border: `solid 1px rgba(255,255,255,.2)`,

  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'border-color', 'border']),
  backgroundColor: 'rgba(0,0,0,.3)',
  padding: theme.spacing('2px'),
  minHeight: 110,

  [theme.breakpoints.up('md')]: {
    backdropFilter: "blur(5px)",
  },

  '&:hover, &[data-selected="true"]': {
    backgroundColor: 'rgba(0,0,0,1)',
    borderColor: 'rgba(255,255,255,.4)',
    '& > [data-li="image"] > img': {
      transform: 'scale(1.2)',
      opacity: 1,
    },
  },
  '&[data-selected="true"]': {
    borderColor: 'rgba(255,255,255, .8)', //theme.palette.primary.main,
    borderWidth: 2,
  },
  '& > [data-li="image"]': {
    minWidth: 100,
    maxWidth: 100,
    // backgroundColor: theme.palette.background.default,
    // borderRadius: theme.shape.borderRadius / 1.3,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center center',
    // padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > img': {
      transition: theme.transitions.create(['transform', 'opacity']),
      width: '50%',
      opacity: .8,
    }
  },
  '& > [data-li="content"]': {
    flex: 1,
  },
}))

function CustomCarousel(props) {
  return (
    <RootDiv>
      <CarouselItems
        numberOfCards={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6, default: 4 }}
        infiniteLoop
        gutter={10}
        items={props.items}>
        {(item, index) => {
          const imageSrc = props.image(item)

          return (
            <ItemList
              key={index}
              onClick={() => props.onClickItem(item, index)}
              data-selected={props.onSelected(item, index)}>
              {imageSrc ? (
                <li data-li="image">
                  <img src={imageSrc} />
                </li>
              ) : ''}
              <li data-li="content">
                {props.children(item, index)}
              </li>
            </ItemList>
          )
        }}
      </CarouselItems>
    </RootDiv>
  )
}

CustomCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  image: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
};

CustomCarousel.defaultProps = {
};

export default CustomCarousel
