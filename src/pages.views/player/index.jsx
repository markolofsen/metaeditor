import * as React from 'react';

// config
import { env } from 'config/'

// context
import { useConnection } from 'metaeditor/context/';
import { useParent } from 'src/context/';

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

  const parent = useParent()
  const router = useRouter()
  const connection = useConnection()

  const session = query.session || router.query.session

  // states
  const [sessionExist, setSessionExist] = React.useState(false)
  const [metadata, setMetadata] = React.useState({
    video_url: false,
    logo_url: false,
  })

  React.useEffect(() => {
    load()

  }, [session])

  React.useEffect(() => {
    const { host, port } = connection.state
    if (host && port) {
      parent.setServerData({ host, port })
    }
  }, [connection.state])

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

