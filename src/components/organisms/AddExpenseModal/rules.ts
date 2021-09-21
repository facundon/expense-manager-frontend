import { RegisterOptions } from "react-hook-form"
import { ExpenseInputs } from "../../../@types"

export const rules: Record<
   keyof ExpenseInputs,
   Omit<
      RegisterOptions,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
   >
> = {
   category: {
      required: "Choose a category",
   },
   concept: {
      required: "Specify a concept",
   },
   value: {
      required: "How much it cost?",
   },
   repeatMonth: {
      required: "Select at least 1 month",
   },
   isFixed: {},
}
