import * as React from 'react';

// nextjs
import Link from 'next/link'

// config
import { env } from 'config/'

// styles
import { styled } from 'metalib/styles/'

// material
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import GlobalStyles from '@mui/material/GlobalStyles';

// blocks
import DemosList from './DemosList'
import BackgroundSqaure from './BackgroundSqaure'



const HeaderList = styled.ul(theme => ({
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(5, 0),
  },
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(10, 0),
  },
  '& > li': {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  '& > [data-li="img"]': {
    '& img': {
      width: '100%',
      maxWidth: 250,
    },
  },
  '& > [data-li="button"]': {

  },
}))


const Home = () => {

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getDevUrl = () => {
    let devUrl = '/localhost'

    if (!mounted) return devUrl
    if (!['localhost', '127.0.0.1'].includes(document.location.hostname)) {
      devUrl = env.DEV_URL
    }

    return devUrl
  }

  return (
    <div>

      <GlobalStyles styles={{
        body: {
          backgroundColor: '#02243D',
        }
      }} />

      <BackgroundSqaure />
      <Box sx={{ pb: 10 }}>
        <Container maxWidth='lg'>

          <HeaderList>
            <li data-li="img">
              <a href="https://metaeditor.io">
                <img src={env.data.logo_svg.white} />
              </a>
            </li>
            <li data-li="button">
              <Link href={getDevUrl()} passHref>
                <Button component="a" target="_blank" variant="outlined" size="large" color='inherit'>
                  Developer Version
                </Button>
              </Link>
            </li>
          </HeaderList>

          <DemosList />

        </Container>
      </Box >

    </div>
  )

};

export default Home;
