import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react"
import { useTable } from "react-table"
import { useConfirm, useRequest } from "../../../hooks"
import { ReactComponent as Delete } from "../../../icons/cancel.svg"
import { ReactComponent as Edit } from "../../../icons/edit.svg"
import { apiServices } from "../../../services"

import { Expense, ExpenseKind } from "../../../@types/expense"

import "./index.scss"
import { AddExpenseModal } from "../../organisms"
import { ExpenseInputs } from "../../../@types"

export interface TableProps {
   expenses: Expense[]
   setExpenses: Dispatch<SetStateAction<Expense[] | null>>
}

const Table: React.FC<TableProps> = ({ expenses, setExpenses }) => {
   const [editOpen, setEditOpen] = useState(false)
   const [editInitValues, setEditInitValues] = useState<ExpenseInputs | null>(
      null
   )

   const { run: runDelete } = useRequest(apiServices.deleteExpense)
   const confirm = useConfirm()
   const handleDeleteExpense = useCallback(
      async (id: number) => {
         const expense = expenses.find(e => e.id === id)
         const proceed = await confirm(
            "Delete",
            `Are you sure you want to delete ${expense?.concept}`
         )
         if (proceed) {
            await runDelete(id)
            setExpenses(prev => prev!.filter(e => e.id !== id))
         }
      },
      [confirm, expenses, runDelete, setExpenses]
   )

   const handleEditExpense = useCallback(
      (id: number) => {
         const expense = expenses.find(e => e.id === id)!
         const initValues = {
            value: expense.value.toString(),
            concept: expense.concept,
            category: {
               value: expense.category as unknown as string,
               label: expense.category as unknown as string,
            },
            isFixed:
               expense.kind === ("Fixed" as unknown as ExpenseKind)
                  ? true
                  : false,
            repeatMonth: expense.repeatMonth.map(e => ({
               value: e as unknown as string,
               label: e as unknown as string,
            })),
            id: expense.id,
         }
         setEditInitValues(initValues)
         setEditOpen(true)
      },
      [expenses]
   )

   const handleUpdateExpense = (expense: Expense) => {
      setExpenses(prev => {
         const newExpenses = [...prev!]
         const expIndex = newExpenses.findIndex(e => e.id === expense.id)
         newExpenses[expIndex] = expense
         return newExpenses
      })
   }

   const columns = useMemo(
      () => [
         {
            Header: "Concept",
            accessor: "concept" as "concept",
         },
         {
            Header: "Value",
            accessor: "value" as "value",
         },
         {
            Header: "Actions",
            accessor: "actions" as "actions",
         },
      ],
      []
   )

   const data = useMemo(
      () =>
         expenses?.map(expense => ({
            concept: expense.concept,
            value: expense.value,
            actions: (
               <div className="actions-container">
                  <Delete
                     width={15}
                     style={{ verticalAlign: "middle", cursor: "pointer" }}
                     onClick={() => handleDeleteExpense(expense.id)}
                  />
                  <Edit
                     style={{
                        verticalAlign: "middle",
                        cursor: "pointer",
                        fill: "rgb(120, 230, 90)",
                     }}
                     onClick={() => handleEditExpense(expense.id)}
                  />
               </div>
            ),
         })),
      [expenses, handleDeleteExpense, handleEditExpense]
   )

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data })

   return (
      <>
         <table {...getTableProps()}>
            <thead>
               {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                           {column.render("Header")}
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {rows.map(row => {
                  prepareRow(row)
                  return (
                     <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                           return (
                              <td {...cell.getCellProps()}>
                                 {cell.column.Header === "Value" && "$ "}
                                 {cell.render("Cell")}
                              </td>
                           )
                        })}
                     </tr>
                  )
               })}
            </tbody>
         </table>
         {editInitValues && (
            <AddExpenseModal
               initValues={editInitValues}
               onSuccess={handleUpdateExpense}
               open={editOpen}
               onClose={() => {
                  setEditOpen(false)
                  setEditInitValues(null)
               }}
               type="edit"
            />
         )}
      </>
   )
}

export default Table
