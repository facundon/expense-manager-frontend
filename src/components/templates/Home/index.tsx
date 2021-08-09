import { ReactElement } from "react"

import "./index.scss"
export interface HomeProps {
   total: ReactElement
   expensesTable: ReactElement
}

const Home: React.FC<HomeProps> = ({ total, expensesTable }) => {
   return (
      <div>
         <div className="center">{total}</div>
         <div className="center expense-table">{expensesTable}</div>
      </div>
   )
}

export default Home
