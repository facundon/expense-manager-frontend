import "./index.scss"

const Loader = ({
   text,
   height,
   orientation = "column",
}: {
   text?: string
   height?: string
   orientation?: "row" | "column"
}) => {
   return (
      <div className={`loader-wrapper ${orientation}`} style={{ height }}>
         {text && <p>{text}</p>}
         <div className="loader">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
         </div>
      </div>
   )
}

export default Loader
