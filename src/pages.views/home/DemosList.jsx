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
import Icon from '@mui/material/Icon'
import Chip from '@mui/material/Chip'


const IconBox = styled.custom(Box, theme => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,.4)',
  transition: theme.transitions.create(['all']),
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  '& > .material-icons': {
    fontSize: '3rem',
  }
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
          <Card sx={{ height: '100%', bgcolor: 'rgba(0,0,0,.6)', backdropFilter: 'blur(20px)' }}>

            {item.is_best && (<LabelBest />)}

            <Link href={`player/${item.slug}/?view=${item.view_mode}`} passHref>
              <CardMedia
                component='a'
                target="_blank"
                sx={{ height: '15rem' }}
                image={item.preview_small}>
                <IconBox>
                  <Icon>play_arrow</Icon>
                </IconBox>
              </CardMedia>
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

export default DemosList


function LabelBest() {
  return (

    <Chip
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        marginTop: 15,
        marginLeft: 15,
      }}
      sx={{ bgcolor: 'success.main', typography: 'button' }}
      label="Best sample" />
  )
}