
// mui
import { styled } from '@mui/system';
import { Typography } from '@mui/material'
import { ButtonBase } from "@mui/material";

// components
import Carousel from 'src/@core/components/Carousel'

// libs
import { Hooks } from 'pixel-streaming';

const Card = styled((props: any) => <ButtonBase component="div" {...props} />)(({ theme }: any) => ({
  height: 90,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: `1px solid ${theme.palette.divider}`,
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
        <Typography variant="caption">
          {title}
        </Typography>
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
            perPage: 1,
          },
        }}
        items={items} />
    </div>
  )
}