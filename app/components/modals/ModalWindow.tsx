'use client'

import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

type ModalWindowProps = {
  children: React.ReactNode
  active: boolean
  setActive: (active: boolean) => void
}


const ModalWindow: React.FC<ModalWindowProps> = ({ children, active, setActive }) => {

  const [domReady, setDomReady] = useState<boolean>(false)

  useEffect(() => {
    setDomReady(true)
  }, [])

  if (!active) return null

  return domReady ?
    ReactDOM.createPortal(
      <div className="fixed h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center z-50 top-0 left-0" onClick={() => setActive(false)}>
        <div className="flex w-full max-w-xl items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      document.body
    )
    : null
}

export default ModalWindow