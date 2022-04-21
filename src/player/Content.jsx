import * as React from 'react';
import PropTypes from 'prop-types';

// api
import { env } from 'api/'

// hooks
import { useNotifyController } from 'metaeditor/@common/controllers/'
import { useRouter } from 'hooks/';

// hooks: player
import { useLogicConnect } from './hooks/';

// snippets
import {
  Preloader,
  CallbackProgress,
  RippleClick,
  DevBar,
} from 'metaeditor/snippets/'

// layouts
import Content from './layouts/Content'
import MetaBar from './layouts/MetaBar/'
import WelcomeBar from './layouts/WelcomeBar/'



// context
import { useConnection } from 'metaeditor/context/';

// config
const defaultBuildId = 'car11'
const videoUrl = 'https://github.com/markolofsen/unrealos_doc/raw/main/.drive/videos/intro.mp4'
const logoUrl = env.staticUrl('player', 'logo_ue.svg')



function PlayerContent({ autoConnect, setServerData, ...props }) {
  const router = useRouter()
  const connection = useConnection()
  const notifyController = useNotifyController()
  const { showInterface } = useLogicConnect()

  const refCallbackProgress = React.useRef(null)

  React.useEffect(async () => {

    if (router.isReady) {

      connection.setAutoConnect(autoConnect)

      if (autoConnect) {
        if (router.query.session) {
          connection.startSessionUuuid(router.query.session)
        } else {
          const session = await connection.getSessionUuid(router.query.build_id || defaultBuildId)

          if (session) {
            const newQuery = { ...router.query, session }
            delete newQuery.build_id

            router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
          } else {
            const errMsg = `session not found!`
            console.error(errMsg)
            alert(errMsg)
            // throw new Error()
          }

        }
      }
    }

  }, [router.isReady, router.query.session])

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({
    onCommand: (payload) => {
      notifyController.sendCommand(payload)
      refCallbackProgress.current?.start(payload)
    },
    onCallback: (payload) => {
      notifyController.sendCallback(payload)
      refCallbackProgress.current?.stop()
    },
  }));


  React.useEffect(() => {
    const { host, port } = connection.state
    if (host && port) {
      setServerData({ host, port })
    }

  }, [connection.state])

  if (connection.state.auto_connect && !connection.state.loaded) {
    return (<div />);
  }


  return (
    <div>

      {/* MetaComponents */}
      <DevBar />
      <CallbackProgress ref={refCallbackProgress} />
      <WelcomeBar />
      <Preloader videoUrl={videoUrl} logoUrl={logoUrl} />
      <RippleClick />

      {/* Custom components */}

      {showInterface && (
        <>
          <MetaBar />
          <Content />
        </>
      )}

    </div>
  )
}

PlayerContent.propTypes = {
  autoConnect: PropTypes.bool,
  setServerData: PropTypes.func.isRequired,
};


export default React.forwardRef((props, ref) => (
  <PlayerContent {...props} innerRef={ref} />
))
