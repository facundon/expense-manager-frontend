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
import { toTitleCase } from "../../../utils/text"
import { getEnumKeys } from "../../../utils/enum"
import { Button, FormInput } from "../../atoms"
import { Modal } from "../../molecules"
import { ModalProps } from "../../molecules/Modal"
import { rules } from "./rules"

import "./index.scss"
interface AddExpenseModalProps extends ModalProps {
   onSuccess: (newExpense: Expense) => void
   initValues?: any
   type?: "edit" | "add"
}

const AddExpenseModal: FunctionComponent<AddExpenseModalProps> = ({
   onClose,
   onSuccess,
   initValues,
   type = "add",
   ...rest
}) => {
   const defaultValues: ExpenseInputs = {
      value: "",
      concept: "",
      category: {
         value: ExpenseCategory[0],
         label: ExpenseCategory[0],
      },
      isFixed: false,
      repeatMonth: [{ value: Months[0], label: Months[0] }],
   }
   const { handleSubmit, control, watch, setValue } = useForm({
      defaultValues: type === "add" ? defaultValues : initValues,
   })

   const { run: runRequest, isLoading } = useRequest(
      type === "add" ? apiServices.addExpense : apiServices.updateExpense
   )

   const onSubmit: SubmitHandler<ExpenseInputs> = async (data, e) => {
      const formattedData: Omit<Expense, "id"> = {
         value: parseFloat(data.value),
         concept: data.concept,
         category: data.category.value as unknown as ExpenseCategory,
         kind: data.isFixed ? ExpenseKind.Fixed : ExpenseKind.Variable,
         repeatMonth: data.repeatMonth.map(m => m.value as unknown as Months),
         ...(type === "edit" && { id: initValues.id }),
      }
      // @ts-expect-error
      const result = await runRequest(formattedData)
      if (result) onSuccess(result)
      e?.target.reset()
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
                    }))[getCurrentMonth() - 1],
                 ]
         ),
      [isFixed, setValue]
   )

   return (
      <Modal {...rest} onClose={onClose} locked={isLoading} sideModal>
         <h3 style={{ margin: "0.5em 0", textAlign: "end" }}>
            {toTitleCase(type)} Expense
         </h3>
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
               control={control}
               name="concept"
               rules={rules.concept}
               label="Concept"
               disabled={isLoading}
            />
            <FormInput
               control={control}
               name="value"
               rules={rules.value}
               label="Value"
               disabled={isLoading}
            />
            <FormInput
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
            <FormInput
               control={control}
               name="isFixed"
               rules={rules.isFixed}
               label="Is Fixed"
               defaultValue={false}
               type="check"
               disabled={isLoading}
            />
            <FormInput
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
               {toTitleCase(type)}
            </Button>
         </form>
      </Modal>
   )
}

export default AddExpenseModal
