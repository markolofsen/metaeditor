import React from "react";

// styles
import { styled } from 'metalib/styles/'

// hooks
import { useNotify } from "../../hooks/";

// components
import JsonEditor from '../../../components/JsonEditor/'


const ContentDiv = styled.ul(theme => ({
  width: 400,
  padding: theme.spacing(0, 1, 1),
}))



function useCommand() {
  const notify = useNotify()

  React.useEffect(() => {

    document.addEventListener('metaeditor_command', sendCommand)
    document.addEventListener('metaeditor_callback', sendCallback)

    return () => {
      document.removeEventListener('metaeditor_command', sendCommand)
      document.removeEventListener('metaeditor_callback', sendCallback)
    };
  }, []);

  const sendCommand = ({ detail }) => {

    const content = renderBody(detail.payload)
    notify.info(content, {
      title: detail.command,
      key: undefined, //payload.verification_id,
    })
  }

  const sendCallback = ({ detail }) => {

    // if (payload?.error) {
    //   notify.error(payload.error, {
    //     title: undefined,
    //     key: 'error',
    //   })
    //   return;
    // }

    const content = renderBody(detail.payload)
    notify.info(content, {
      title: '>> ' + detail.command,
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
