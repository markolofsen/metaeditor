
import { NextPage } from 'next';
import Link from 'next/link';

// material
import { styled } from 'metalib/styles/'
import { Button, Typography } from '@mui/material';

// layouts
import Container from 'src/layouts/Container'


const RootList = styled.ul(theme => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  '& > li': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& > [data-li="image"]': {
    paddingBottom: theme.spacing(5),
    '& > img': {
      width: '100%',
      maxWidth: 500,
    }
  },
  '& > [data-li="content"]': {
    padding: theme.spacing(0, 3),

  },
  '& > [data-li="button"]': {
    paddingTop: theme.spacing(5),
  },
}))

const Page404: NextPage = () => (
  <Container>
    <RootList>
      <li data-li="image">
        <img
          src="/static/404.svg"
          alt="Error 404"
        />
      </li>
      <li data-li="content">
        <Typography variant="h2">Page not Found</Typography>
      </li>
      <li data-li="button">
        <Link href="/" passHref>
          <Button variant="contained" size="large">
            Let&apos;s Go Back
          </Button>
        </Link>
      </li>
    </RootList>
  </Container>
);

export default Page404;
