import * as React from 'react';
import PropTypes from 'prop-types';

// components
import MetaDrawer from '../../../components/MetaDrawer/'


function SystemDialog(props) {
  const refMetaDrawer = React.useRef(null)

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({
    open: () => {
      refMetaDrawer.current.open()
    },
  }));

  return (
    <MetaDrawer
      width={props.width}
      ref={refMetaDrawer}
      title={props.title}
      onClose={props.onClose}>
      {props.children}
    </MetaDrawer>
  )
}


SystemDialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.any,
};

export default React.forwardRef((props, ref) => (
  <SystemDialog {...props} innerRef={ref} />
))
