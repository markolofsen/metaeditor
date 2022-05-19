

import * as React from 'react'

// config
import { config } from '../../../assets/config'

// hooks
import { useStorageBook } from '../../../hooks/useStorageBook';

// context
import { useSystem } from '../../../context/';

// ui
import Button from 'rsuite/Button'
import Input from 'rsuite/Input';
import Message from 'rsuite/Message';

// components
import { CustomModal } from '../../../components/Modal'


export const Actions: React.FC = () => {
  const system = useSystem()
  const storageBook = useStorageBook()
  const refModal = React.useRef<any>(null)

  const [value, setValue] = React.useState<string>('')
  const [error_, setError] = React.useState<boolean | string>(false)
  const [disabled, setDisabled] = React.useState<boolean>(false)

  const error = system.cls?.apiData?.error

  React.useEffect(() => {

    storageBook.apiKey.read((v: any) => {
      if (v) setValue(v)
    })

  }, [])

  const handleOpen = () => {
    refModal.current.open()
  }

  const handleSubmit = async (event: any) => {
    if (event) {
      event.stopPropagation()
      event.preventDefault()
    }

    setDisabled(true)
    setError(false)
    const isDataLoaded = await system.cls.loadData(value)

    if (isDataLoaded) {
      system.cls.setApiKey(value)
      refModal.current.close()
    } else {
      setError('Wrong Api Key')
    }

    setDisabled(false)

  }

  return (
    <div>
      <CustomModal
        title="Api Connector"
        onSuccess={undefined}
        onClose={undefined}
        FooterComponent={(
          <>
            <Button onClick={() => {
              window.open(config.portal.urlProjects)
            }}>
              My Projects
            </Button>
            <Button disabled={disabled} onClick={handleSubmit} appearance="primary">
              Connect
            </Button>
          </>
        )}
        ref={refModal}>
        <div>
          <Message showIcon type="warning" style={{ marginBottom: 20 }}>
            Copy your Api Key from <a href={config.portal.urlProjects} target="_blank">{config.portal.name}</a>
          </Message>

          <form onSubmit={handleSubmit}>
            <Input
              disabled={disabled}
              value={value}
              onChange={setValue}
              size='lg'
              required
              placeholder="Enter Api Key" />

            {error && (
              <div style={{ color: 'red', marginTop: 10 }}>
                {error}
              </div>
            )}
          </form>

        </div>
      </CustomModal>

      {system.cls.apiKeyIsCorrect ? (
        <Button
          color='green'
          appearance='ghost'
          onClick={handleOpen}>
          Reconnect Project
        </Button>
      ) : (
        <Button
          color='red'
          appearance='primary'
          onClick={handleOpen}>
          Connect Project
        </Button>
      )}

    </div>
  )
}