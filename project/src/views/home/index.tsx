import * as React from 'react'

// config
import { config } from 'src/module/assets/config';

// ui
import { jss } from "src/components/styled"
import CustomProvider from 'rsuite/CustomProvider';
import Button from 'rsuite/Button'


// blocks
import BackgroundSqaure from './BackgroundSqaure'
import DemosList from './DemosList'

const useStyles = jss({
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 30,
  },
  headerList: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
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

  return (
    <div className={classes.root}>
      <BackgroundSqaure />

      <ul className={classes.headerList}>
        <li data-li="img">
          <a href={config.websiteUrl}>
            <img src='/static/logo_white.svg' />
          </a>
        </li>
        <li data-li="button">
          <Button appearance='primary' disabled>
            Developer Version
          </Button>
        </li>
      </ul>

      <DemosList />

    </div>
  )
}


export default () => (
  <CustomProvider theme='dark'>
    <View />
  </CustomProvider>
)