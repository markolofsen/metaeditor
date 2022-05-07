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
    maxWidth: 2200,
    margin: '0 auto',
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
  // padding: theme.spacing('2px'),
  minHeight: 80,

  [theme.breakpoints.up('md')]: {
    backdropFilter: "blur(5px)",
  },

  '&:hover, &[data-selected="true"]': {
    backgroundColor: 'rgba(0,0,0,1)',
    borderColor: 'rgba(255,255,255,.4)',
    '& > [data-li-preview="icon"] > img': {
      transform: 'scale(1.2)',
      opacity: 1,
    },
  },
  '&[data-selected="true"]': {
    borderColor: 'rgba(255,255,255, .8)', //theme.palette.primary.main,
    borderWidth: 2,
  },
  '& > [data-li-preview]': {
    width: 80,
    overflow: 'hidden',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.background.default,
    // borderRadius: theme.shape.borderRadius / 1.3,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center center',
    // padding: theme.spacing(2),
  },
  '& > [data-li-preview="icon"]': {
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
    padding: theme.spacing(2),
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
          let imageSrc, imageIcon = false

          if (typeof props.image === 'function') {
            imageSrc = props.image(item)
          }
          if (typeof props.imageIcon === 'function') {
            imageIcon = props.imageIcon(item)
          }


          let selected = false
          if (typeof props.onSelected === 'function') {
            selected = props.onSelected(item, index)
          }


          return (
            <ItemList
              key={index}
              onClick={() => {
                if (typeof props.onClickItem === 'function') {
                  props.onClickItem(item, index)
                }
              }}
              data-selected={selected}>

              {imageSrc ? (
                <li data-li-preview="image" style={{ backgroundImage: `url(${imageSrc})` }} />
              ) : ''}
              {imageIcon ? (
                <li data-li-preview="icon">
                  <img src={imageIcon} />
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
  image: PropTypes.func,
  imageIcon: PropTypes.func,
  onClickItem: PropTypes.func,
  onSelected: PropTypes.func,
};

CustomCarousel.defaultProps = {
};

export default CustomCarousel
