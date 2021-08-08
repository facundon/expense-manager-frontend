import React, { useEffect, useRef, useState } from "react"
import { Portal } from "../../atoms"
import "./index.scss"

type ModalProps = {
   open: boolean
   size?: string
   locked?: boolean
   sideModal?: boolean
   className?: string
   onClose: () => void
}

const Modal: React.FC<ModalProps> = ({
   children,
   open,
   size,
   className,
   onClose,
   locked = false,
   sideModal = false,
}) => {
   const [active, setActive] = useState(false)
   const backdrop = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const { current: backdropDOM } = backdrop

      // when clicking the backdrop or pressing escape close modal unless locked
      const clickHandler = (e: MouseEvent) =>
         !locked && e.target === backdropDOM && onClose()
      const keyHandler = (e: KeyboardEvent) =>
         !locked && e.code === "Escape" && onClose()
      const transitionEnd = () => setActive(open)

      // if the backdrop exists set up listeners
      if (backdropDOM) {
         backdropDOM?.addEventListener("transitionend", transitionEnd)
         backdropDOM?.addEventListener("click", clickHandler)
         window.addEventListener("keyup", keyHandler)
      }

      // if open props is true add inert to #root
      // and set active state to true
      // we use timeout to le the transform effect happen
      if (open) {
         window.setTimeout(() => {
            setActive(open)
            document.querySelector("#root")?.toggleAttribute("inert")
            backdropDOM?.firstElementChild?.querySelector("input")?.focus()
         }, 150)
      }

      // on unmount remove listeners
      return () => {
         if (backdropDOM) {
            backdropDOM?.removeEventListener("transitionend", transitionEnd)
            backdropDOM?.removeEventListener("click", clickHandler)
         }
         document.querySelector("#root")?.removeAttribute("inert")
         window.removeEventListener("keyup", keyHandler)
      }
   }, [open, onClose, locked])
   return (
      <>
         {(open || active) && (
            <Portal>
               <div
                  ref={backdrop}
                  className={`backdrop ${active && open && "active"} ${
                     sideModal && "side"
                  }`}
               >
                  <div
                     style={{ width: size }}
                     className={`modal-content ${
                        sideModal && "side"
                     } ${className}`}
                  >
                     {children}
                  </div>
               </div>
            </Portal>
         )}
      </>
   )
}

export default Modal
