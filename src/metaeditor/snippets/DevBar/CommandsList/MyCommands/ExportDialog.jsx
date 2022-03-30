import * as React from 'react';
import PropTypes from 'prop-types';

// material
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// components
import CustomDialog from '../../../../components/Dialog/'
import JsonEditor from '../../../../components/JsonEditor/'


function ExportDialog(props) {
  const refDialog = React.useRef(null)

  const [data, setData] = React.useState({})

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

  const renderInner = () => {
    return (
      <Box sx={{ mt: 0 }}>

        <JsonEditor
          label="Paste the exported data"
          content={data}
          height={100}
          viewOnly={false}
          onChange={(json) => {
            setData(json)
          }} />

        <Button
          sx={{ mt: 2 }}
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            try {
              const check = JSON.parse(JSON.stringify(data))
              console.error('check', check);

              const res = props.onImport(data)
              if (res) {
                alert('Success!')
                setData({})
                refDialog.current.close()
              }
            } catch (err) {
              alert('Format error!')
            }

          }}>
          Confirm import
        </Button>

        <Button
          sx={{ mt: 5 }}
          size="large"
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={() => props.onExport()}>
          Export all
        </Button>

      </Box>
    )
  }

  return (
    <div>
      <CustomDialog
        ref={refDialog}
        title="Commands exporter"
        subtitle="Tool for transfer commands between browsers"
        closeIcon
        showActions={false}
      >
        {renderInner()}
      </CustomDialog>
    </div>
  )
}

ExportDialog.propTypes = {
  onImport: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
}

export default React.forwardRef((props, ref) => (
  <ExportDialog {...props} innerRef={ref} />
))
