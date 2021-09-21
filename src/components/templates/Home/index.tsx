import { ReactElement } from "react"

import "./index.scss"
export interface HomeProps {
   total: ReactElement | null
   expensesTable: ReactElement | null
   actions: ReactElement
}

const Home: React.FC<HomeProps> = ({ total, expensesTable, actions }) => {
   return (
      <div>
         <div className="center">{total}</div>
         <div className="center expense-table">{expensesTable}</div>
         <div className="center">{actions}</div>
      </div>
   )
}

export default Home
