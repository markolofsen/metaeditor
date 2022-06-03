import React from 'react'

// ui
import { jss } from 'pixel-streaming'
import Divider from 'rsuite/Divider'
import Button from 'rsuite/Button'

// components
import { Web3App } from 'src/components/Web3App/'
import { CustomModal } from 'pixel-streaming'


const useStyles = jss({
  '@global': {
    body: {
      '& > iframe': {
        pointerEvents: 'none'
      }
    }
  },
  rootList: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    '& > [data-li="logo"]': {
      textAlign: 'center',
      '& > img': {
        width: 150,
      },
    },
    '& > [data-li="description"]': {
      marginTop: 20,
      marginBottom: 50,
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    '& > [data-li="actions"]': {
      textAlign: 'center',
    }
  },
})

interface Props {
}

export const Metamask: React.FC<any> = React.forwardRef((props: Props, ref: any) => {
  const classes = useStyles()
  const refModal = React.useRef<any>(null)
  const refWeb3 = React.useRef<any>(null)

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(ref, () => ({

    open: () => {
      refModal.current.open()
    }

  }));

  return (
    <div>

      <CustomModal
        title="Metamask"
        onSuccess={undefined}
        onClose={undefined}
        FooterComponent={false}
        ref={refModal}>
        <div>

          <ul className={classes.rootList}>
            <li data-li="logo">
              <img src="/static/metamask.svg" />
            </li>
            <li data-li="description">
              An example of integrating Web3js into an Unreal Engine application.
            </li>
            <li data-li="actions">
              <Divider />

              <Web3App ref={refWeb3}>
                <Button
                  appearance='primary'
                  block
                  size='lg'
                  onClick={() => refWeb3.current.init()}>
                  Connect wallet
                </Button>
              </Web3App>
            </li>
          </ul>

        </div>
      </CustomModal>

    </div>
  )
})