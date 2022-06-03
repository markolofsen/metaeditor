import * as React from 'react'

// config
import { config } from 'pixel-streaming';

// hooks
import { useRouter } from 'src/hooks/useRouter';

// ui
import { jss, media } from "pixel-streaming"
import Button from 'rsuite/Button'

// layouts
import { Container } from 'src/layouts/Container';

// blocks
import BackgroundSqaure from 'src/layouts/BackgroundSqaure'
import DemosList from './DemosList'


const useStyles = jss({
  headerList: {
    display: 'flex',
    gap: '2rem',
    [media.down.xs]: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '1.5rem',
      marginBottom: '2rem',
    },
    [media.up.xs]: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3rem',
    },
    '&>li:nth-child(1)': {
      '& img': {
        width: '100%',
        maxWidth: 170,
      }
    },
    '& > [data-li="actions"]': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
    }
  }
})

const View: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()

  const [show, setShow] = React.useState<boolean>(false)

  React.useEffect(() => {

    const { protocol, hostname } = document.location

    if (protocol === 'http:' && hostname !== 'localhost') {
      router.push.dev()

    } else {
      setShow(true)
    }

  }, [])

  if (show === false) {
    return (<div />)
  }

  return (
    <Container>
      <BackgroundSqaure />

      <ul className={classes.headerList}>
        <li data-li="img">
          <a href={config.websiteUrl}>
            <img src='/static/logo_white.svg' />
          </a>
        </li>
        <li data-li="actions">
          <Button
            onClick={() => router.push.gallery()}
            appearance='primary' color='red' size='lg'>
            3D gallery
          </Button>
          <Button href='http://ps-dev.metaeditor.io/dev' appearance='ghost' size='lg'>
            Developer Version
          </Button>
        </li>
      </ul>

      <DemosList />

    </Container>
  )
}

export default View