import React from "react";

// styles
import { styled } from 'metalib/styles/'

// hooks
import { useNotify } from "../../hooks/";

// components
import JsonEditor from '../../../components/JsonEditor/'

// libs
// import moment from 'moment'


const ContentDiv = styled.ul(theme => ({
  width: 400,
  padding: theme.spacing(0, 1, 1),
}))



function useCommand() {
  const notify = useNotify()

  const isHiddenCommand = (payload) => {
    if (['console_command'].includes(payload.command)) {
      return true;
    }
    return false
  }

  const sendCommand = (payload) => {

    // console.error('@@@sendCommand', payload);

    if (isHiddenCommand(payload)) return

    const content = renderBody(payload)
    notify.info(content, {
      title: payload.command,
      key: undefined, //payload.verification_id,
    })
  }

  const sendCallback = (payload) => {

    if (isHiddenCommand(payload)) return

    if (payload?.error) {
      notify.error(payload.error, {
        title: undefined,
        key: 'error',
      })
      return;
    }

    const content = renderBody(payload)
    notify.info(content, {
      title: '>> ' + payload.command,
      key: undefined,
    })
  }

  const renderBody = (data) => {
    return (
      <ContentDiv>

        <JsonEditor
          label={undefined}
          content={data}
          height={150}
          onChange={() => { }}
          viewOnly
        />

      </ContentDiv>
    )
  }

  return {
    sendCommand,
    sendCallback,
  };

}

export default useCommand
