import * as React from 'react'

// libs
import ReactJson from 'react-json-view'



interface Props {
  data: JSON | boolean
}

export const JsonViewer: React.FC<Props> = (props: any) => {
  return (
    <ReactJson
      style={{
        backgroundColor: 'transparent'
      }}
      theme='monokai'
      quotesOnKeys={false}
      groupArraysAfterLength={2}
      collapseStringsAfterLength={10}
      displayDataTypes={false}
      displayObjectSize={false}
      enableClipboard={false}
      src={props.data} />
  )
}
export default JsonViewer