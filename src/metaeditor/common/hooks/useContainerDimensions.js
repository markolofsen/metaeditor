/* Usage

// hooks
import {useContainerDimensions} from 'hooks/'

const MyComponent = () => {
  const componentRef = React.useRef(null);
  const { width, height, scrollTop, scrollLeft } = useContainerDimensions(componentRef);

  return (
    <div ref={componentRef}>
      <p>width: {width}px</p>
      <p>height: {height}px</p>
      <p>scrollTop: {scrollTop}px</p>
      <p>scrollLeft: {scrollLeft}px</p>
    <div/>
  )
}

*/

import * as React from 'react';

// libs
import useResizeObserver from '@react-hook/resize-observer'


const useContainerDimensions = myRef => {

  const getDimensions = () => {
    if (!myRef.current) return dimensions;

    const {
      offsetWidth, offsetHeight,
      scrollTop, scrollLeft,
      scrollWidth, scrollHeight,
    } = myRef.current

    return {
      width: offsetWidth,
      height: offsetHeight,
      scrollTop,
      scrollLeft,
      scrollWidth: scrollWidth - offsetWidth,
      scrollHeight: scrollHeight - offsetHeight,
    };
  }

  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
    scrollTop: 0,
    scrollLeft: 0,
  })

  const handleResize = () => setDimensions(getDimensions())

  React.useLayoutEffect(() => {
    // setSize(target.current.getBoundingClientRect())
    handleResize()
  }, [myRef.current])

  useResizeObserver(myRef.current, (entry) => {
    // setSize(entry.contentRect)
    handleResize()
  })

  React.useEffect(() => {

    setDimensions(getDimensions())

    myRef.current?.addEventListener("scroll", handleResize)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      myRef.current?.removeEventListener("scroll", handleResize)
    }
  }, [myRef.current])

  return dimensions;
};

export default useContainerDimensions
