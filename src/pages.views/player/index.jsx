import * as React from 'react';

// config
import { env } from 'config/'

// context
import { useConnection, useSystem } from 'metaeditor/context/';

// controllers
import { useNotifyController } from 'metaeditor/@controllers/'

// hooks
import { useRouter } from 'src/hooks/';

// snippets
import {
  Preloader,
  RippleClick,
  DevBar,
  CommandProgress,
} from 'metaeditor/snippets/'

// components
import Player from 'src/components/Player/';

// blocks
import ContentCar from './ContentCar/'
import WelcomeBar from 'src/components/WelcomeBar/'

// config
const defaultLogoUrl = env.staticUrl('player', 'logo_ue.svg')


const PlayerView = ({ query }) => {
  useNotifyController()

  const router = useRouter()
  const system = useSystem()
  const connection = useConnection()

  const session = query.session || router.query.session

  // states
  const [sessionExist, setSessionExist] = React.useState(false)
  const [metadata, setMetadata] = React.useState({
    video_url: false,
    logo_url: false,
    api_key: false,
  })

  React.useEffect(() => {
    load()
  }, [session])

  const onSessionError = () => {
    const errMsg = `Session not found!`
    alert(errMsg)
    router.push('/')
  }

  const load = async () => {

    if (session) {

      connection.startSessionUuuid(session, ({
        onSuccess: (metadata) => {
          setSessionExist(true)
          setMetadata(metadata)

          // Load commands with api_key of project
          system.cls.loadData(metadata.api_key)
        },
        onError: () => onSessionError(),
      }))

    } else {

      const newSession = await connection.getSessionData(query.slug)
      if (newSession) {
        const newQuery = { ...query, session: newSession.uuid }
        // delete newQuery.build_id

        router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });

      } else {
        onSessionError()
      }
    }

  }

  if (!sessionExist) {
    return (<div />)
  }

  return (

    <>
      {/* MetaComponents */}
      <DevBar />
      <WelcomeBar />
      <RippleClick />
      <CommandProgress />
      <Preloader videoUrl={metadata.video_url} logoUrl={metadata.logo_url || defaultLogoUrl} />

      {router.query.view === '1' && (
        <ContentCar />
      )}

    </>
  )
};

const WithPlayer = (props) => (
  <Player>
    <PlayerView {...props} />
  </Player>
)

export default WithPlayer;

