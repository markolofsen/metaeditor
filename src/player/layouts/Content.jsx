import * as React from 'react';
import PropTypes from 'prop-types';

// hooks
import { useContainerDimensions } from 'metalib/common/hooks/'

// context
import { usePlayer } from 'metaeditor/context/';
import { useLayout } from 'player/context/';

// styles
import { styled } from 'metalib/styles/'

// material
import Collapse from '@mui/material/Collapse';

// layouts
import AppBar from './AppBar'
import Panels from './Panels/'
import ContentDrawer from './ContentDrawer/'

// player components
import DraggableCard from 'player/components/DraggableCard'


const RootDiv = styled.div(theme => ({
  '&[data-layout-visible]': {
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '&[data-layout-visible="true"]': {
    opacity: .0,
    pointerEvents: 'none',
  },
}))

const RootList = styled.ul(theme => ({

  position: 'absolute',
  zIndex: theme.zIndex.appBar + 10,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: 'var(--window-height)',
  display: 'flex',
  flexDirection: 'column',

  '& > [data-li="content"]': {
    flex: 1,
    position: 'relative',
  },

  '& > li > [data-list="bottom"]': {
    background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)',

    '& > [data-li="appbar"]': {
      pointerEvents: 'all',
    },

    '& > [data-li="panels"]': {

    },
  }

}))


function Content(props) {
  const player = usePlayer()
  const layout = useLayout()

  const contentRef = React.useRef(null);
  const contentDimension = useContainerDimensions(contentRef);

  const uiVisibleAll = player.state.mouse_moving
  const uiVisible = layout.state.ui_visible

  // const showDrawer = !uiVisibleAll && uiVisible

  return (
    <RootDiv data-layout-visible={uiVisibleAll}>

      <ContentDrawer show={uiVisible} />

      <RootList>
        <li data-li="content" ref={contentRef}>
          <DraggableCard />
        </li>
        <li>
          <ul data-list="bottom">
            <li data-li="panels">

              <Collapse in={uiVisible} mountOnEnter={false} unmountOnExit={false}>
                <Panels />
              </Collapse>

              {/* <Collapse in={uiVisible && !layout.state.current_menu}>
                <div>Some hidden data</div>
              </Collapse> */}

            </li>
            <li data-li="appbar">
              <AppBar />
            </li>
          </ul>
        </li>
      </RootList>
    </RootDiv>
  )
}

Content.propTypes = {
  // onEmit: PropTypes.object.isRequired,
};

Content.defaultProps = {
};

export default Content
