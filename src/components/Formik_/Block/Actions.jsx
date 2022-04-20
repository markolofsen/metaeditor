import * as React from 'react';

// styles
import { styled } from 'metalib/styles/'


const RootDiv = styled.div(theme => ({
  // borderTop: `solid 1px ${theme.palette.divider}`,
  paddingTop: theme.spacing(3),
}))

const ChildrenList = styled.ul(theme => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  margin: theme.spacing(0, -1),
  '& > *': {
    flex: 1,
    padding: theme.spacing(1),
  }
}))


export default function Group({ children }) {

  const renderChildren = () => {
    if (Array.isArray(children)) {
      return (
        <ChildrenList>
          {children.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ChildrenList>
      );
    }

    return children;
  }
  return (
    <RootDiv>
      {renderChildren()}
    </RootDiv>
  )
}
