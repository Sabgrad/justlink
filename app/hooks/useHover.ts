import { RefObject, useEffect, useState } from "react"

export const useHover = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>) => {

  const [hover, setHover] = useState(false)

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => setHover(false)


  useEffect(() => {
    const node = ref.current

    if(node && node.hasChildNodes()) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }

  }, [ref.current])
  return hover
}