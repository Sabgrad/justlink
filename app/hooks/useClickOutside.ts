import { RefObject, useEffect } from "react";

const useClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (close: false) => void, isOpen: boolean) => {

  // ToDo переробити хук
  
  useEffect(() => {

    if(!isOpen) return;

    const node = ref.current

    const handleClick = () => {
      if (node && node.hasChildNodes()) {
        return null
      } else {
        handler(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, handler, isOpen])
}

export default useClickOutside