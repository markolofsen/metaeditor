

// styles
import { styled } from 'metaeditor/common/styles/'

const RootDiv = styled.div(theme => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(0, -1),
  '& > *': {
    flex: 1,
    padding: theme.spacing(1),
    // paddingRight: theme.spacing(2),
    // '&:last-child': {
    //   marginRight: 0,
    // }
  }
}))


export default function RowGroup(props) {

  return (
    <RootDiv>
      {props.children}
    </RootDiv>
  )
}
