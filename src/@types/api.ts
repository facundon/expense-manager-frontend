import { AxiosResponse } from "axios"

export type RequestResponse<T> = Promise<AxiosResponse<T>>

export type ExpenseInputs = {
   value: string
   category: { value: string; label: string }
   isFixed: boolean
   concept: string
   repeatMonth: { value: string; label: string }[]
}
