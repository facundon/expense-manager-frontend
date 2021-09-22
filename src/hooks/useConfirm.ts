import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

const useConfirm = () => {
   const confirm = (action: string, message: string, title?: string) => {
      return new Promise<boolean>(resolve => {
         confirmAlert({
            title,
            message,
            closeOnClickOutside: true,
            buttons: [
               { label: "Cancel", onClick: () => resolve(false) },
               { label: action, onClick: () => resolve(true) },
            ],
         })
      })
   }
   return confirm
}

export default useConfirm
