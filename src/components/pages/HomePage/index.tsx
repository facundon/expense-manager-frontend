import { Table } from "../../molecules"
import { Home } from "../../templates"

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
   const total = <h1>A pagar: $123</h1>
   const expensesTable = <Table />

   return <Home total={total} expensesTable={expensesTable} />
}

export default HomePage
