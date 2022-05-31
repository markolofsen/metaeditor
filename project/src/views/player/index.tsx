import React from 'react'
import { useParams } from "react-router-dom";

// blocks
import RequestForm from './RequestForm';
import Player from './Player'
import TorontoActions from './TorontoActions'

const Page: React.FC = () => {
  const { build } = useParams();

  if (!build) {
    return (<div />)
  }


  let config: any = {}

  const isToronto = build.search('toronto') !== -1
  if (isToronto) {
    config.showQuickMenu = false
    config.consoleMode = 'console'
  }

  return (
    <div>
      <RequestForm />

      {isToronto && (
        <TorontoActions />
      )}

      <Player build={build} {...config} />
    </div>
  )
}

export default Page

