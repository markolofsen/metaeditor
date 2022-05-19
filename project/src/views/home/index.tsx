import * as React from 'react'
import { useNavigate } from "react-router-dom";

// config
import { config } from 'pixel-streaming';

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
    }
  }
})

const View: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate();

  const [show, setShow] = React.useState<boolean>(false)

  React.useEffect(() => {

    const { protocol, hostname } = document.location

    if (protocol === 'http:' && hostname !== 'localhost') {

      navigate('/dev')

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
        <li data-li="button">
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