import React from "react";

// styles
import { styled } from 'metalib/styles/'

// hooks
import { useNotify } from "../../@common/hooks/";

// context
import { usePlayer } from "../../context/";

// components
import JsonEditor from '../../components/JsonEditor/'


const ContentDiv = styled.ul(theme => ({
  width: 400,
  padding: theme.spacing(0, 1, 1),
}))



function useCommand() {
  const notify = useNotify()
  const player = usePlayer()

  const onCommand = ({ detail }) => {

    const content = renderBody(detail)
    notify.info(content, {
      title: detail.command,
      key: undefined, //payload.verification_id,
    })
  }

  const onCallback = ({ detail }) => {

    // if (payload?.error) {
    //   notify.error(payload.error, {
    //     title: undefined,
    //     key: 'error',
    //   })
    //   return;
    // }

    const content = renderBody(detail)
    notify.info(content, {
      title: '>> ' + detail.command,
      key: undefined,
    })
  }

  player.cls.useTrigger({ onCommand, onCallback })

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

}

export default useCommand
