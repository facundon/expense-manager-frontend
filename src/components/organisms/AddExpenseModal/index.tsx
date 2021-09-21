import { FunctionComponent, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import {
   Expense,
   ExpenseCategory,
   ExpenseInputs,
   ExpenseKind,
   Months,
} from "../../../@types"
import { useRequest } from "../../../hooks"
import { apiServices } from "../../../services"
import { getCurrentMonth } from "../../../utils/date"
import { getEnumKeys } from "../../../utils/enum"
import { Button, FormSelect } from "../../atoms"
import { Modal } from "../../molecules"
import { ModalProps } from "../../molecules/Modal"
import { rules } from "./rules"

interface AddExpenseModalProps extends ModalProps {
   onSuccess: (newExpense: Expense) => void
}

const AddExpenseModal: FunctionComponent<AddExpenseModalProps> = ({
   onClose,
   onSuccess,
   ...rest
}) => {
   const defaultValues: ExpenseInputs = {
      value: "0",
      concept: "",
      category: {
         value: ExpenseCategory[0],
         label: ExpenseCategory[0],
      },
      isFixed: false,
      repeatMonth: [{ value: Months[0], label: Months[0] }],
   }
   const { handleSubmit, control, watch, setValue } = useForm({ defaultValues })

   const { run: runAddExpense, isLoading } = useRequest(apiServices.addExpense)

   const onSubmit: SubmitHandler<ExpenseInputs> = async data => {
      const formattedData: Omit<Expense, "id"> = {
         value: parseFloat(data.value),
         concept: data.concept,
         category: data.category.value as unknown as ExpenseCategory,
         kind: data.isFixed ? ExpenseKind.Fixed : ExpenseKind.Variable,
         repeatMonth: data.repeatMonth.map(m => m.value as unknown as Months),
      }
      const result = await runAddExpense(formattedData)
      if (result) onSuccess(result)
      onClose()
   }

   const isFixed = watch("isFixed")

   useEffect(
      () =>
         setValue(
            "repeatMonth",
            isFixed
               ? getEnumKeys(Months).map(k => ({
                    value: k,
                    label: k,
                 }))
               : [
                    getEnumKeys(Months).map(k => ({
                       value: k,
                       label: k,
                    }))[getCurrentMonth()],
                 ]
         ),
      [isFixed, setValue]
   )

   return (
      <Modal {...rest} onClose={onClose} locked={isLoading}>
         <h3>Add Expense</h3>
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormSelect
               control={control}
               name="concept"
               rules={rules.concept}
               label="Concept"
               disabled={isLoading}
            />
            <FormSelect
               control={control}
               name="value"
               rules={rules.value}
               label="Value"
               disabled={isLoading}
            />
            <FormSelect
               control={control}
               name="category"
               options={getEnumKeys(ExpenseCategory).map(k => ({
                  value: k,
                  label: k,
               }))}
               rules={rules.category}
               label="Category"
               type="select"
               disabled={isLoading}
            />
            <FormSelect
               control={control}
               name="isFixed"
               rules={rules.isFixed}
               label="Is Fixed"
               defaultValue={false}
               type="check"
               disabled={isLoading}
            />
            <FormSelect
               control={control}
               name="repeatMonth"
               options={getEnumKeys(Months).map(k => ({
                  value: k,
                  label: k,
               }))}
               rules={rules.repeatMonth}
               label="Months"
               isMulti
               defaultValue={getEnumKeys(Months).map(k => ({
                  value: k,
                  label: k,
               }))}
               type="select"
               disabled={isLoading}
            />
            <Button type="submit" appareance="secondary" loading={isLoading}>
               Add
            </Button>
         </form>
      </Modal>
   )
}

export default AddExpenseModal
