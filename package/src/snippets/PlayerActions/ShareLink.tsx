import * as React from 'react'

// context
import { useSystem, usePlayer } from '../../context/'

// hooks
import { useCopy } from '../../hooks/useCopy'

// ui
import { jss } from '../../assets/styled';
import Input from 'rsuite/Input';
import InputGroup from 'rsuite/InputGroup';

// icons
import CopyIcon from '@rsuite/icons/Copy';

// components
import { SvgIcon } from '../../components/SvgIcon'
import { CustomModal } from '../../components/Modal'
import { QrCode } from '../../components/QrCode'


const useStyles = jss({
  root: {
    backgroundColor: '#fff',
    padding: '60px 30px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30
  }
})

export const ShareLink = () => {
  const classes = useStyles()
  const system = useSystem()
  const player = usePlayer()
  const copy = useCopy()

  const refModal = React.useRef<any>(null)

  const sharedUrl = system.cls.sharedUrl

  return (
    <div>
      <CustomModal
        title="Quick Access"
        onSuccess={undefined}
        onClose={undefined}
        FooterComponent={undefined}
        ref={refModal}>
        <div>

          <div style={{ marginBottom: 10 }}>
            Copy the address or scan the QR code with your phone.
          </div>

          <InputGroup size='lg'>
            <Input
              readOnly={true}
              defaultValue={sharedUrl || ''}
            />
            <InputGroup.Button onClick={() => copy.text(sharedUrl)}>
              <CopyIcon />
            </InputGroup.Button>
          </InputGroup>

          <div className={classes.root}>
            <QrCode
              value={sharedUrl}
            />
          </div>

        </div>
      </CustomModal>

      <SvgIcon
        disabled={!sharedUrl}
        button buttonSize='lg' name='qrcode'
        onClick={() => {
          player.cls.streamingStop()
          refModal.current.open()
        }}
      />
    </div>
  )
}