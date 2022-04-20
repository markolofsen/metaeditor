import * as React from 'react';

// context
import { useLayout } from 'player/context/';

// material
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';

// styles
import { styled } from 'metaeditor/common/styles/'

// blocks
import RenderDialog from './RenderDialog/'



const RootList = styled.ul(theme => ({

  [theme.breakpoints.down('md')]: {
    '& > li': {
      paddingBottom: theme.spacing(2),
    },
    '& > [data-li="heading"]': {
      ...theme.typography.h4,
      maxWidth: '80vw',
    },
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    paddingBottom: theme.spacing(3),
    '& > li': {
      padding: theme.spacing(3, 5),
    },
    '& > [data-li="heading"]': {
      fontSize: '2.5rem',
      fontWeight: theme.typography.fontWeightBold,
      textAlign: 'right',

      width: '33%',
      maxWidth: 500,
      borderRight: `solid 1px ${theme.palette.divider}`,
      paddingLeft: 0,
      marginRight: theme.spacing(3),
    },
    '& > [data-li="content"]': {
      flex: 1,
    },
  },

}))

const ResolutionTitle = styled.custom(Typography, theme => ({
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down('md')]: {
    maxWidth: '80vw',
  },
  [theme.breakpoints.up('md')]: {
    ...theme.typography.h5,
  },
}))

const ToggleButtonGroup = styled.custom(MuiToggleButtonGroup, theme => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
    '& button': {
      flexGrow: 1,
    }
  },
}))

const ActionsContainer = styled.div(theme => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(3),

  '& > button': {
    [theme.breakpoints.down('md')]: {
      flex: 1,
    },
  },
}))




const RESOLUTIONS = [
  '720p', '1080p', '1440p',
]

function Panel() {
  const layout = useLayout()
  const refRenderDialog = React.useRef(null)
  const [resolution, setResolution] = React.useState(RESOLUTIONS[0])

  const handleResolution = (event, newRes) => {
    setResolution(newRes);
  };

  const renderForm = () => {
    return (
      <div>

        <ToggleButtonGroup
          value={resolution}
          exclusive
          color="primary"
          onChange={handleResolution}
        >
          {RESOLUTIONS.map((item, index) => (
            <ToggleButton value={item} key={index}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <ActionsContainer>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => {
              refRenderDialog.current.open()
            }}>
            Render video
          </Button>
          <Button color="inherit" variant="outlined" size="large">
            Screenshot
          </Button>
        </ActionsContainer>

      </div>
    );
  }

  return (
    <div>
      <RenderDialog ref={refRenderDialog} />

      <RootList>
        <li data-li="heading">
          Want to download a video with your design?
        </li>
        <li data-li="content">
          <ResolutionTitle>
            Select a resolution and click «Render Video»
          </ResolutionTitle>
          {renderForm()}
        </li>
      </RootList>

    </div>
  );
}


export default Panel
