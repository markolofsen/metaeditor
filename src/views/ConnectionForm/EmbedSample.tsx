// mui
import { Paper, Divider, Button, Typography } from '@mui/material'

// libs
import { PlayerConfigProps } from 'pixel-streaming'

// hooks
import useCopy from 'src/@core/hooks/useCopy'

interface Props {
  config: PlayerConfigProps
}

export default function EmbedSample({ config }: Props) {

  // hooks
  const copy = useCopy()

  const preview = `
import "rsuite/dist/rsuite.min.css";
import { Button } from "rsuite";
import { MetaProvider, MetaEditor, Hooks, IApplication } from "pixel-streaming";

const PlayerView = () => {
  const refPlayer = React.useRef(null)
  const { emitUi } = Hooks.actions();

  return (
    <MetaEditor
      ref={refPlayer}
      debugMode="${config.debugMode}"
      showToolbar={${config.showToolbar}}
      onLoad={(app: IApplication) => {
        console.log('@'.repeat(30))
        console.log('app', app)
      }}
      psHost="${decodeURIComponent(config.psHost)}"
      psConfig={${JSON.stringify(config.psConfig, null, 4).replace(/(?:\r\n|\r|\n)/g, '\n    ')}}>
      <Button onClick={() => emitUi({ action: "ui_command" })}>
        Send action
      </Button>
    </MetaEditor>
  );
};

export default function AppHOC() {
  return (
    <MetaProvider>
      <PlayerView />
    </MetaProvider>
  );
}
`.trim()

  return (
    <Paper elevation={5} sx={{ py: 2, px: 10, fontSize: '16px', overflow: 'auto' }}>

      <Typography variant='h4' sx={{
        pt: 10, pb: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        Code

        <Button
          color="inherit"
          variant="outlined"
          onClick={() => copy.text(preview)}>
          Copy
        </Button>

      </Typography>


      <Divider />
      <pre>
        {preview}
      </pre>
    </Paper>
  )
}