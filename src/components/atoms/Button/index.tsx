import { ButtonHTMLAttributes } from "react"
import Loader from "../Loader"
import "./index.scss"

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   icon?: string
   appareance?: "primary" | "secondary" | "subtle" | "minimalist" | "link"
   circle?: boolean
   iconColor?: string
   size?: "sm" | "md"
   disabled?: boolean
   loading?: boolean
   loadingText?: string
}

const Button = ({
   children,
   icon,
   iconColor,
   loadingText,
   appareance = "primary",
   size = "sm",
   circle = false,
   disabled = false,
   loading = false,
   ...props
}: BtnProps) => {
   return (
      <div
         className={`btn-wrapper ${
            disabled || loading ? "disabled" : ""
         } ${appareance} ${size} ${circle && "circle"} ${
            children && "with-text"
         }`}
         tabIndex={0}
      >
         <button {...props} tabIndex={-1} disabled={disabled || loading}>
            {loading ? (
               <Loader text={loadingText} orientation="row" />
            ) : (
               <>
                  {icon && (
                     <span
                        className={`material-icons-round ${size}`}
                        style={{ color: iconColor }}
                     >
                        {icon}
                     </span>
                  )}
                  {children}
               </>
            )}
         </button>
      </div>
   )
}

export default Button
