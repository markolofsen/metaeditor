import React from 'react'
import ReactDOM from 'react-dom'

// ui
import Divider from 'rsuite/Divider'

// components
import { SvgIcon, CustomDrawer } from 'pixel-streaming'

// blocks
import { Commands } from './Commands'
// import { DemoEvents } from './DemoEvents'
import { Metamask } from './Metamask'

export const DemoActions: React.FC<any> = () => {
  const refDrawer = React.useRef<any>(null)
  const refMetamask = React.useRef<any>(null)

  React.useEffect(() => {

    injectDom()

  }, [])

  const injectDom = () => {
    const toolbarId = 'demo-toolbar'
    if (!document.getElementById(toolbarId)) {
      const node = document.createElement('div')
      node.setAttribute("id", toolbarId)
      const container = document.getElementById('metaeditor-toolbar')
      if (container) {
        container.appendChild(node)
        ReactDOM.render(renderButton(), node)
      }
    }
  }

  const renderButton = () => {
    return (
      <>
        <div style={{ marginBottom: 10 }}>
          <SvgIcon button buttonSize='lg'
            name={'star'}
            onClick={() => {
              refDrawer.current.open()
            }} />
        </div>
        <div>
          <img
            style={{ cursor: 'pointer' }}
            onClick={() => {
              refMetamask.current.open()
            }}
            src="/static/metamask.svg" width={42} />
          {/* <SvgIcon button buttonSize='lg'
            name={'star'}
            onClick={() => {
              // refDrawer.current.open()
            }} /> */}
        </div>
      </>
    )
  }

  return (
    <>
      <Metamask ref={refMetamask} />
      <CustomDrawer
        title="Demo Actions"
        onClose={() => { }}
        ref={refDrawer}
        withBody
        ActionsComponent={false}>
        <div>
          <Commands />

          {/* 
          <Divider />
          <DemoEvents /> */}
        </div>
      </CustomDrawer>
    </>
  )
}