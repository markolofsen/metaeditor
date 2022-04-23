import * as React from 'react';

// api
import { env } from 'src/api/'

// context
import { useConnection } from 'metaeditor/context/';

// controllers
import { useNotifyController } from 'metaeditor/@common/controllers/'

// snippets
import {
  Preloader,
  RippleClick,
  DevBar,
  CommandProgress,
} from 'metaeditor/snippets/'

// components
import Player from 'src/components/Player/';

// config
const defaultLogoUrl = env.staticUrl('player', 'logo_ue.svg')


const PlayerView = () => {
  const connection = useConnection()

  useNotifyController()

  React.useEffect(() => {
    connection.setAutoConnect(false)
  }, [])

  return (

    <>
      {/* MetaComponents */}
      <DevBar />
      <RippleClick />
      <CommandProgress />
      <Preloader videoUrl={undefined} logoUrl={defaultLogoUrl} />
    </>
  )
};

const WithPlayer = (props) => (
  <Player >
    <PlayerView {...props} />
  </Player>
)

export default WithPlayer;

