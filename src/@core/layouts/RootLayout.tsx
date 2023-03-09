import * as React from 'react'

// context
import { useGlobalContext } from "src/@core/context";

// libs
import { FullScreen } from "react-full-screen";

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {

  // context
  const globalContext = useGlobalContext()

  return (
    <>
      <FullScreen handle={globalContext.fullescreenHandle}>
        {children}
      </FullScreen>
    </>
  )
}