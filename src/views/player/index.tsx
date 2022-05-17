import React from 'react'
import { useParams } from "react-router-dom";

// blocks
import RequestForm from './RequestForm';
import Player from './Player'

const Page: React.FC = () => {
  const { build } = useParams();

  if (!build) {
    return (<div />)
  }

  return (
    <div>
      <RequestForm />
      <Player build={build} />
    </div>
  )
}

export default Page

