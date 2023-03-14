
// mui
import { styled } from '@mui/system';
import { Typography } from '@mui/material'
import { ButtonBase } from "@mui/material";

// components
import Carousel from 'src/@core/components/Carousel'

// libs
import { Hooks } from 'pixel-streaming';

const Card = styled((props: any) => <ButtonBase component="ul" {...props} />)(({ theme }: any) => ({
  listStyle: 'none',
  margin: 0,
  padding: theme.spacing(2),

  height: 80,
  display: 'flex',
  justifyContent: 'stretch',

  borderRight: `1px solid ${theme.palette.divider}`,
  '& > [data-li="image"]': {
    width: 60,
    height: '100%',
    backgroundColor: 'rgba(255,255,255, .1)',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(3),
  },
  '& > [data-li="content"]': {
    flex: 1,
    // height: '100%',
  },
}));

export default function Controls() {

  // hooks
  const actions = Hooks.actions()

  const items = Array.from(Array(10).keys()).map((item) => {

    const title = `Option ${item + 1}`

    return (
      <Card
        onClick={() => {
          actions.emitUi({ action: 'ui_command' }, { debug: true })
          // actions.emitSys({ action: 'system_command' }, { debug: true })
        }}>
        <li data-li="image" />
        <li data-li="content">
          <Typography variant="caption">
            {title}
          </Typography>
        </li>
      </Card>
    )
  })

  return (
    <div>
      <Carousel
        perPage={5}
        gap={0}
        breakpoints={{
          1200: {
            perPage: 3,
          },
          640: {
            perPage: 2,
          },
        }}
        items={items} />
    </div>
  )
}