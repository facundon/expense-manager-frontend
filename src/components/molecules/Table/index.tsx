import { useMemo } from "react"
import { useQuery } from "react-query"
import { useTable } from "react-table"
import axios from "axios"

import "./index.scss"

export interface TableProps {}

const Table: React.FC<TableProps> = () => {
   const getTableData = () =>
      axios.get(process.env.REACT_APP_API_URI! + "/expenses")

   const { data, isLoading } = useQuery("getExpenses", getTableData)

   const tableData = useMemo(
      () => [
         {
            concept: "Hello",
            value: "World",
         },
         {
            concept: "react-table",
            value: "rocks",
         },
         {
            concept: "whatever",
            value: "you want",
         },
      ],
      []
   )

   const columns = useMemo(
      () => [
         {
            Header: "Concepto",
            accessor: "concept" as "concept",
         },
         {
            Header: "Valor",
            accessor: "value" as "value",
         },
      ],
      []
   )

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data: tableData })

   return (
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
                              {cell.render("Cell")}
                           </td>
                        )
                     })}
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}

export default Table
