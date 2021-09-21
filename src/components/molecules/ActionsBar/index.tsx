import { Dispatch, FunctionComponent, SetStateAction, useState } from "react"
import { Expense } from "../../../@types"
import { Button } from "../../atoms"
import { AddExpenseModal } from "../../organisms"

interface ActionsBarProps {
   onAction: Dispatch<SetStateAction<Expense[] | null>>
}

const ActionsBar: FunctionComponent<ActionsBarProps> = ({ onAction }) => {
   const [addOpen, setAddOpen] = useState(false)

   const handleSuccess = (newExpense: Expense) => {
      onAction(prev => {
         if (!prev) return [newExpense]
         const newExpenses = [...prev]
         newExpenses.push(newExpense)
         return newExpenses
      })
   }

   return (
      <>
         <div>
            <Button onClick={() => setAddOpen(true)}>Add Expense</Button>
         </div>
         <AddExpenseModal
            open={addOpen}
            onSuccess={handleSuccess}
            onClose={() => setAddOpen(false)}
         />
      </>
   )
}

export default ActionsBar
