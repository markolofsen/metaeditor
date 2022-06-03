import * as React from 'react'

// ui
import Modal from 'rsuite/Modal';
import Button from 'rsuite/Button';


interface Props {
  children: React.ReactNode
  onClose?: Function
  onSuccess?: Function
  title: string
  FooterComponent?: React.ReactNode | false
}

export const CustomModal: React.FC<any> = React.forwardRef((props: Props, ref: any) => {

  const [open, setOpen] = React.useState<any>(false);

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(ref, () => ({

    open: () => {
      setOpen(true)
    },
    close: () => {
      handleClose()
    },
    isOpen: open,

  }));

  const handleClose = () => {
    setOpen(false)

    if (typeof props.onClose === 'function') {
      props.onClose()
    }
  }

  const handleSuccess = () => {
    if (typeof props.onSuccess === 'function') {
      props.onSuccess()
    }

    handleClose()
  }

  const showFooter = props.FooterComponent !== false

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>

      {showFooter && (
        <Modal.Footer>
          {props.FooterComponent || (
            <>
              <Button onClick={handleSuccess} appearance="primary">
                Ok
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </>
          )}

        </Modal.Footer>
      )}

    </Modal>
  );
})