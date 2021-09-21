import { Loader } from "../../atoms"
import { Table, Total } from "../../molecules"
import { Home } from "../../templates"

import { useRequest } from "../../../hooks"
import { apiServices } from "../../../services"

import { useEffect, useState } from "react"
import { ActionsBar } from "../../molecules"
import { Expense } from "../../../@types"

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
   const { run: getExpenses } = useRequest(apiServices.getExpenses)

   const [expenses, setExpenses] = useState<Expense[] | null>(null)

   useEffect(() => {
      const getAsync = async () => {
         const response = await getExpenses()
         if (!response) return
         setExpenses(response)
      }
      getAsync()
   }, [getExpenses])

   const total = expenses ? <Total expenses={expenses} /> : null

   const expensesTable = expenses ? <Table expenses={expenses} /> : null

   const actions = <ActionsBar onAction={setExpenses} />
   return expenses ? (
      <Home total={total} expensesTable={expensesTable} actions={actions} />
   ) : (
      <Loader height="10em" />
   )
}

export default HomePage
