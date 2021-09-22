import { FunctionComponent } from "react"
import { Expense, Months } from "../../../@types"
import { getCurrentMonth } from "../../../utils/date"

import "./index.scss"

interface TotalProps {
   expenses: Expense[]
}

const Total: FunctionComponent<TotalProps> = ({ expenses }) => {
   const getTotal = () => {
      const values = expenses
         .filter(expense =>
            expense.repeatMonth.includes(
               Months[getCurrentMonth()] as unknown as Months
            )
         )
         .map(expense => expense.value)
      return values.reduce((prev, next) => prev + next).toFixed(2)
   }

   return (
      <h1 className="total">
         {Months[getCurrentMonth()]}: ${getTotal()}
      </h1>
   )
}

export default Total
