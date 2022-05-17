import * as React from 'react'

// ui
import { jss } from 'src/components/styled'
import Button from 'rsuite/Button'
import Divider from 'rsuite/Divider';
import Form from 'rsuite/Form';
import ButtonToolbar from 'rsuite/ButtonToolbar';

// components
import { CustomModal } from 'src/components/Modal'

// hook
import { useApi } from 'src/hooks/useApi';
import { useStorage } from 'src/sample/hooks/useStorage'



const useStyles = jss({

  header: {
    fontSize: '1rem',
    marginBottom: 20
  }
})

const RequestForm: React.FC<any> = () => {
  const refCustomModal = React.useRef<any>(null)
  const classes = useStyles()
  const api = useApi()
  const storage = useStorage()

  const USERDATA = storage.wrapper('USERDATA')

  const [disabled, setDisabled] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any>({
    name: '',
    email: '',
  })
  const [error, setError] = React.useState<any>({})

  React.useEffect(() => {

    USERDATA.read((c: any) => {
      if (!c) {
        // alert(JSON.stringify(c))
        handleOpen()
      }
    })

  }, [])

  const handleOpen = () => {
    refCustomModal.current.open()
  }

  const handleClose = () => {
    refCustomModal.current.close()
  }

  const handleSubmit = async () => {
    setDisabled(true)
    await api.sendCustomerForm({ ...data, text: 'form request' }).then(res => {
      if (res.ok) {
        USERDATA.save(data)
        handleClose()
      } else {
        setError(res.body)
      }
    })
    setDisabled(false)
  }

  return (
    <div>

      <CustomModal
        title="Welcome"
        onSuccess={undefined}
        onClose={undefined}
        FooterComponent={false}
        ref={refCustomModal}>

        <div>
          <div className={classes.header}>
            <p>
              Right now, MetaEditor is running a streaming server with Unreal Engine.
            </p>
            <p>
              This is a demo version, and in production, the launch takes a couple of seconds.
            </p>
          </div>

          <Divider />

          <h5 style={{ marginBottom: 20 }}>
            Enter your details!
          </h5>

          <Form fluid
            disabled={disabled}
            onChange={(payload) => {
              setData((c: any) => ({ ...c, ...payload }))
            }}
            formValue={{}}
            onSubmit={(checkStatus: boolean, event: React.FormEvent) => {
              handleSubmit()
            }}>
            <Form.Group controlId="name">
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control
                name="name"
                size='lg'
                required
                errorMessage={error?.name} />
              {/* <Form.HelpText>Required</Form.HelpText> */}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control
                name="email"
                type="email"
                size='lg'
                required
                errorMessage={error?.email} />
              {/* <Form.HelpText>Required</Form.HelpText> */}
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button
                  type="submit"
                  appearance="primary"
                  size='lg'>
                  Submit
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </div>

      </CustomModal>
    </div>
  )
}

export default RequestForm