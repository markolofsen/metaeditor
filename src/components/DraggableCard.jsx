import * as React from 'react';
import PropTypes from 'prop-types';

// hooks
import { useHotkeys } from 'metalib/common/hooks/'

// context
// import { useLayout } from 'src/context/'

// material
import { styled } from 'metalib/styles/'
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

// components
import { DraggableObject } from 'metaeditor/components/'


const CardList = styled.ul(theme => ({
  pointerEvents: 'all',
  backgroundColor: 'blue',
  width: 150,
  height: 150,
  boxShadow: theme.shadows[5],
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color']),
  '&[data-active="true"]': {
    backgroundColor: 'red',
  },

  '& > [data-li="handler"]': {
    backgroundColor: 'rgba(0,0,0, .2)',
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      flexGrow: 1,
      padding: theme.spacing(1),
    }
  },
  '& > [data-li="body"]': {
    padding: theme.spacing(1),
  },
}))



function DraggableCard(props) {
  // const layout = useLayout()
  // const { data, active } = layout.draggableCard

  useHotkeys('esc', (e, ke) => {
    if (!e.repeat) {
      // layout.draggableCard.close()
      return;
    }
  }, [])

  return (
    <DraggableObject
      show={false}
      disabled={false}
      defaultPosition={{
        x: 600,
        y: 100,
      }}>
      {({ active, CardHandler, handleClass }) => (
        <CardList data-active={active}>
          <li data-li="handler">
            <CardHandler>
              {data?.title}
            </CardHandler>
            <IconButton variant="outlined" onClick={() => {
              // layout.draggableCard.close()
            }}>
              <Icon>close</Icon>
            </IconButton>
          </li>
          <li data-li="body">
            {data?.body}
          </li>
        </CardList>
      )}
    </DraggableObject>
  )
}

export default DraggableCard
