import * as React from 'react';
import PropTypes from 'prop-types';

// context
import ContextProvider from './context/'

// layouts
import Content from './layouts/Content'
import MetaBar from './layouts/MetaBar/'

function ContentCar() {
  return (
    <ContextProvider>
      <MetaBar />
      <Content />
    </ContextProvider>
  )
}

export default ContentCar
