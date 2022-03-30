import * as React from 'react';
import PropTypes from 'prop-types';

// components
import JsonEditor from '../../../components/JsonEditor/'


function JsonSourceList({ label, json, height, ...props }) {

  // const list = json.map(item => {
  //   if (item._time) {
  //     const time = moment.utc(item._time)
  //     item._time = `${time.format('LTS')} (${time.fromNow()})`
  //   }
  //   return item;
  // })

  label = (
    <div>
      {label} (<a href="#" onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        props.onClear()
      }}>Clear all</a>)
    </div>
  )

  return (
    <div>
      <JsonEditor
        label={label}
        content={json}
        height={height}
        onChange={() => { }}
        viewOnly
      />
    </div>
  )
}

JsonSourceList.propTypes = {
  label: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  json: PropTypes.any.isRequired,
  height: PropTypes.any,
};

JsonSourceList.defaultProps = {
  height: '25vh',
}

export default JsonSourceList
