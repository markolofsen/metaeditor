import * as React from 'react';

// views
import PlayerContent from 'src/pages.views/player/'

// components
import Player from 'src/components/Player/';

const Page = ({ query }) => {
  return (
    <Player onCallback={(payload) => {

      // Hack for toronto build
      if (payload.type === 'camera_rotate') {
        return false
      }

      return payload
    }}>
      <PlayerContent query={query} />
    </Player>
  )
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    }, // will be passed to the page component as props
  }
}

export default Page;
