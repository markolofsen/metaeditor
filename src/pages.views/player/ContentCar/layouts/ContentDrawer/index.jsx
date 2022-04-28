import * as React from 'react';
import PropTypes from 'prop-types';

// context
import { useLayout } from 'src/context/'

// blocks
import BlockPaint from './BlockPaint'
import BlockWheels from './BlockWheels'
import BlockTrim from './BlockTrim'
import BlockLeather from './BlockLeather'
import BlockSeats from './BlockSeats'

// components
import { MetaDrawer } from 'metaeditor/components/'

// commands
import useBridge from '../../useBridge'


function PlayerContentDrawer(props) {
  const refMetadrawer = React.useRef(null)

  const layout = useLayout()
  const bridge = useBridge()

  const refTimer = React.useRef(null)
  const streamDrawer = layout.state.components.streamDrawer
  const showDrawer = streamDrawer.active && props.show
  const slug = streamDrawer.slug

  React.useEffect(() => {

    if (showDrawer) {
      clearTimeout(refTimer.current)
      refMetadrawer.current.open()

    } else {

      refTimer.current = setTimeout(() => {
        bridge.views.default.onClick()
      }, 300)

      refMetadrawer.current.close()
    }

  }, [showDrawer])

  const list = {
    paint: ['Paint', BlockPaint],
    wheels: ['Wheels', BlockWheels],
    trim: ['Trim', BlockTrim],
    leather: ['Leather', BlockLeather],
    seats: ['Seats', BlockSeats],
  }

  const renderContent = () => {
    if (!list.hasOwnProperty(slug)) return;
    return list[slug][1]();
  }

  return (
    <MetaDrawer
      ref={refMetadrawer}
      anchor="right"
      onClose={() => {
        layout.handleDrawer.close()
      }}
      title={list.hasOwnProperty(slug) && list[slug][0]}
      width={500}>
      {renderContent()}
    </MetaDrawer>
  );
}

PlayerContentDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
};

PlayerContentDrawer.defaultProps = {
  show: false,
};

export default PlayerContentDrawer
