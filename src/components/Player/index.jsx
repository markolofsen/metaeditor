import * as React from 'react';

// api
import { env } from 'api/'

// components
import MetaEditor from 'metaeditor/';

// context
import MetaEditorProvider from 'metaeditor/context/';
import { useParent } from 'src/context/'
import LayoutProvider from 'src/context/useLayout'

// styles
import { styled } from 'metalib/styles/'

// snippets
import { BackPreloader } from 'metaeditor/snippets/'



const RootDiv = styled.div(theme => ({
  backgroundColor: 'rgba(0,0,0, 1)',
  height: 'var(--window-height)',
}))

const isDev = env.isDev

function Player(props) {
  const parent = useParent()

  const refMetaEditor = React.useRef(null)

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
        onProgress={(payload) => {
          // console.warn('progress', payload);
        }}
        settings={{
          volume: 1,
          quality: 1,
          connectOnStart: false,

          host: parent.state.serverData.host,
          port: parent.state.serverData.port,

          pixelStreaming: {
            warnTimeout: 120,
            closeTimeout: 10,
            lockMouse: false,
            fakeMouseWithTouches: false,
          }
        }}
        isDev={isDev}>

        {(payload) => (
          <MetaEditorProvider>
            <LayoutProvider>
              {props.children}
            </LayoutProvider>
          </MetaEditorProvider>
        )}
      </MetaEditor>

    </RootDiv>
  )
}


export default Player