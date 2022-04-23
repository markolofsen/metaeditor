import * as React from 'react';

// views
import Player from 'src/pages.views/player/'

const Page = ({ query }) => {
  return (
    <Player query={query} />
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
