
// mui
import { styled } from '@mui/system';
import { Typography } from '@mui/material'
import { ButtonBase } from "@mui/material";

// components
import Carousel from 'src/components/Carousel'

// libs
import { Hooks } from 'pixel-streaming';

const Card = styled((props: any) => <ButtonBase component="div" {...props} />)(({ theme }: any) => ({
  height: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function Controls() {

  // hooks
  const actions = Hooks.actions()

  const items = Array.from(Array(10).keys()).map((item) => {

    const title = `Item ${item}`

    return (
      <Card
        onClick={() => {
          actions.emitUi({ action: 'ui_command' }, { debug: true })
          // actions.emitSys({ action: 'system_command' }, { debug: true })
        }}>
        <Typography variant="h6">
          {title}
        </Typography>
      </Card>
    )
  })

  return (
    <div>
      <Carousel items={items} />
    </div>
  )
}