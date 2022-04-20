import * as React from 'react';

// api
import { env } from 'api/'

// hooks
import { useLogicConnect } from './hooks/';

// components
import MetaEditor from 'metaeditor/';

// context
import MetaEditorProvider from 'metaeditor/context/';
import ContextProvider from './context/';

// styles
import { styled } from 'metaeditor/common/styles/'

// content
import PlayerContent from './Content'

// snippets
import { BackPreloader } from 'metaeditor/snippets/'



const RootDiv = styled.div(theme => ({
  backgroundColor: 'rgba(0,0,0, 1)',
  height: 'var(--window-height)',
}))

const isDev = env.isDev

function PixelWrapper() {
  const { logicLoaded, autoConnect } = useLogicConnect()

  const refMetaEditor = React.useRef(null)
  const refContent = React.useRef(null)

  const [serverData, setServerData] = React.useState({ host: undefined, port: undefined })

  if (!logicLoaded) {
    return (<div />)
  }

  return (
    <RootDiv>

      <BackPreloader />

      <MetaEditor
        ref={refMetaEditor}
        onLoad={(payload) => {
          // console.warn('loaded', payload);
        }}
        onConnect={() => {
          // console.warn('connected');
        }}
        onRestart={() => {
          // console.warn('onRestart');
        }}
        onError={(payload) => {
          // console.error('error', payload);
        }}
        onClose={(payload) => {
          // console.error('closed', payload);
        }}
        onCommand={(payload => {
          // console.warn('command', payload);
          refContent.current.onCommand(payload)
        })}
        onCallback={(payload => {
          // console.warn('callback', payload);
          refContent.current.onCallback(payload)
        })}
        onProgress={(payload) => {
          // console.warn('progress', payload);
        }}
        autoConnect={autoConnect}
        quality={1}
        isDev={isDev}
        host={serverData.host}
        port={serverData.port} >

        {(payload) => (
          <MetaEditorProvider>
            <ContextProvider>
              <PlayerContent
                ref={refContent}
                setServerData={setServerData}
                autoConnect={autoConnect} />
            </ContextProvider>
          </MetaEditorProvider>
        )}
      </MetaEditor>

    </RootDiv>
  )
}


export default PixelWrapper