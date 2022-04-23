import * as React from 'react';
import PropTypes from 'prop-types';

// layouts
import Content from './layouts/Content'
import MetaBar from './layouts/MetaBar/'

function ContentCar() {
  return (
    <div>
      <MetaBar />
      <Content />
    </div>
  )
}

export default ContentCar
