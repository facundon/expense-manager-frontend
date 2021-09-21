import { RequestResponse } from "../@types"
import { Expense } from "../@types/expense"
import { apiRequest } from "../requests/instances"

const getExpenses = (): RequestResponse<Expense[]> =>
   apiRequest.get("./expenses")

const addExpense = (expense: Omit<Expense, "id">): RequestResponse<Expense> =>
   apiRequest.post("./addExpense", expense)

const findExpense = (id: number): RequestResponse<Expense> =>
   apiRequest.get(`./expense/${id}`)

const updateExpense = (expense: Expense): RequestResponse<Expense> =>
   apiRequest.put("./update", expense)

const deleteExpense = (id: number): RequestResponse<void> =>
   apiRequest.delete(`./expense/delete/${id}`)

const apiServices = {
   getExpenses,
   addExpense,
   findExpense,
   updateExpense,
   deleteExpense,
}
export default apiServices

export type ApiServices = typeof apiServices[keyof typeof apiServices]
