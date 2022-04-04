import * as React from 'react';
import PropTypes from 'prop-types';

// api
import { env } from 'api/'

// hooks
import { useNotifyController } from 'metaeditor/controllers/'
import { useRouter } from 'hooks/';

// snippets
import {
  Preloader,
  CallbackProgress,
  RippleClick,
  KeyboardHelper,
  DevBar,
  WelcomeBar
} from 'metaeditor/snippets/'

// layouts
import Content from './layouts/Content'
import MetaBar from './layouts/MetaBar/'


// context
import { useConnection } from 'metaeditor/context/';

// config
const defaultBuildId = 'car-3'
const videoUrl = 'https://github.com/markolofsen/unrealos_doc/raw/main/.drive/videos/intro.mp4'
const logoUrl = env.staticUrl('player', 'logo_ue.svg')



function PlayerContent({ autoConnect, setServerData, ...props }) {
  const router = useRouter()
  const connection = useConnection()
  const notifyController = useNotifyController()

  const refCallbackProgress = React.useRef(null)

  React.useEffect(async () => {

    if (router.isReady) {

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

  const hideContent = router.isReady && router.query?.view?.toString() === '0'


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
      <WelcomeBar config={env.credentials.MAILCHIMP} />
      <Preloader videoUrl={videoUrl} logoUrl={logoUrl} />
      <RippleClick />
      <KeyboardHelper />

      {/* Custom components */}

      {!hideContent && (
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
