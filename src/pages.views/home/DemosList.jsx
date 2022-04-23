import * as React from 'react';

// nextjs
import Link from 'next/link'
import { useRouter } from 'next/router';

// config
import { env } from 'config/'

// libs
import url from 'url'

// hooks
import { useApi } from 'metaeditor/@common/hooks/'

// styles
import { styled } from 'metalib/styles/'

// material
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';



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


function DemosList() {
  const router = useRouter()
  const api = useApi()

  const [data, setData] = React.useState(false)

  React.useEffect(() => {
    if (router.isReady) {

      const current = url.parse(document.location.href, true, false)
      const dev = url.parse(env.DEV_URL, true, false)
      if (current.hostname === dev.hostname) {
        router.push('/localhost')
      } else {
        loadData()
      }
    }

  }, [router.isReady])

  const loadData = async () => [
    await api.getDemosList().then(res => {
      if (res.ok) {
        setData(res.body)
      }
    })
  ]


  const renderItems = () => {
    if (data === false) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress size={30} color="inherit" />
        </Box>
      )
    }

    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <Link href={`player/${item.slug}/?view=${item.view_mode}`} passHref>
                <CardMedia
                  component='a'
                  sx={{ height: '14.5625rem' }} image={item.preview_small} />
              </Link>
              <CardContent>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant='body2'>
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }


  return (
    <Box sx={{ pointerEvents: 'all', pb: 10 }}>
      <Container maxWidth='lg'>

        <HeaderList>
          <li data-li="img">
            <a href="https://metaeditor.io">
              <img src={env.data.logo_svg.white} />
            </a>
          </li>
          <li data-li="button">
            <Button component="a" href={env.DEV_URL} variant="outlined" size="large" color='inherit'>
              Developer Version
            </Button>
          </li>
        </HeaderList>

        {renderItems()}

      </Container>
    </Box >
  )
}

export default DemosList