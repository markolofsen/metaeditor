import React from 'react'

// config
import { config } from 'src/package/assets/config';

// ui
import { jss, media } from "src/components/styled"
import Input from 'rsuite/Input';
import Button from 'rsuite/Button';
import Message from 'rsuite/Message';

// blocks
import Player, { MetaProvider, usePlayer } from './Player'


const useStyles = jss({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: '3rem',

    [media.up.md]: {
      maxWidth: 500,
      border: `solid 1px rgba(255,255,255, .1)`,
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0,.05)',
    },

    '& > li': {
      width: '100%'
    },
    '& > [data-li="logo"]': {
      textAlign: 'center',
      '& img': {
        width: '100%',
        maxWidth: 150,
      }
    },
    '& > [data-li="message"]': {
      padding: '2rem 0',
      textAlign: 'center',
      fontSize: '.9rem',
    },
    '& > [data-li="form"]': {
      textAlign: 'center',
      '& button': {
        marginTop: 30,
      }
    }
  },

})


const DevPlayer: React.FC = () => {
  const classes = useStyles()
  const player = usePlayer()

  const [host, setHost] = React.useState<string>('http://127.0.0.1')
  const [submited, setSubmited] = React.useState<boolean>(false)


  const { error } = player.computed.streaming

  React.useEffect(() => {
    if (player.cls.initReady) {
      player.cls.initPlayer(host)
    }
  }, [player.cls.initReady])

  React.useEffect(() => {
    if (error) {
      setSubmited(false)
    }
  }, [error])

  const handleSubmit = () => {
    setSubmited(true)
  }

  if (submited) {
    return (
      <Player />
    )
  }

  return (
    <div className={classes.root}>
      <ul className={classes.rootList}>
        <li data-li="logo">
          <a href={config.websiteUrl}>
            <img src='/static/logo_white.svg' />
          </a>
        </li>
        <li data-li="message">
          <p>
            Make sure you have Unreal Engine running on localhost and it is available at: http://127.0.0.1:80
          </p>
          <p>
            If the link works, then click "Connect"
          </p>
        </li>
        {error && (
          <li style={{ paddingBottom: 20 }}>
            <Message showIcon type="error">
              Unable to connect to Pixel Streaming.
              <br />
              Are you sure you have Unreal Engine running?
            </Message>
          </li>
        )}
        <li data-li="form">
          <form onSubmit={(event: any) => {
            event.stopPropagation()
            event.preventDefault()
            handleSubmit()
          }}>
            <Input
              onChange={setHost}
              size="lg"
              type='url'
              placeholder="http://127.0.0.1"
              defaultValue={host} />
            <Button type="submit" appearance='primary' size='lg'>
              Connect
            </Button>
          </form>
        </li>
      </ul>
    </div>
  )
}

const CustomPlayer: React.FC = () => (
  <MetaProvider>
    <DevPlayer />
  </MetaProvider>
)

export default CustomPlayer
