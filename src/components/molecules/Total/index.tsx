import { FunctionComponent } from "react"
import { Expense, Months } from "../../../@types"
import { getCurrentMonth } from "../../../utils/date"

interface TotalProps {
   expenses: Expense[]
}

const Total: FunctionComponent<TotalProps> = ({ expenses }) => {
   const getTotal = () => {
      const values = expenses.map(expense => expense.value)
      return values.reduce((prev, next) => prev + next)
   }
   return (
      <h1>
         {Months[getCurrentMonth()]}: ${getTotal()}
      </h1>
   )
}

export default Total
