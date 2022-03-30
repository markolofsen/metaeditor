import * as React from 'react';

// material
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// styles
import { styled } from 'metaeditor/common/styles/'

// components
import { Dialog } from 'metaeditor/components/'

// blocks
import Progress from './Progress'


const DetailsDiv = styled.div(theme => ({
  padding: theme.spacing(4, 0),
  '& > ul': {
    ...theme.typography.body1,
    display: 'flex',
    padding: theme.spacing(.5, 0),
    '& > li': {
      '&:nth-child(1)': {
        width: 130,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:nth-child(2)': {
        flex: 1,
      },
    }
  }
}))

function RenderDialog(props) {
  const refDialog = React.useRef(null)

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({
    open: () => {
      refDialog.current.open()
    },
  }));

  const handleClose = () => {
    if (!confirm('Are you sure?')) return;

    refDialog.current.close()
  };

  const renderConter = () => {

    const list = [
      ['Total Frames', '0 of 672'],
      ['Resolution', '1080p'],
      ['Duration', '2:31'],
    ].map(([label, value]) => ({ label, value }))

    return (
      <Box sx={{ pt: 3 }}>

        <Progress />

        <DetailsDiv>
          {list.map((item, index) => (
            <ul key={index}>
              <li>
                {item.label}:
              </li>
              <li>
                {item.value}
              </li>
            </ul>
          ))}
        </DetailsDiv>

        <Button
          onClick={handleClose}
          size="large"
          variant="outlined"
          color="inherit"
          fullWidth>
          Cancel
        </Button>

      </Box>
    )
  }

  return (
    <Dialog
      ref={refDialog}
      title="Render Preview"
      subtitle={undefined}
      defaultOpen={false}
      closeIcon={false}
      showActions={false}
      disableEscape
    >
      {renderConter()}
    </Dialog>
  )

}


export default React.forwardRef((props, ref) => (
  <RenderDialog {...props} innerRef={ref} />
))
