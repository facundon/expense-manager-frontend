import { FunctionComponent } from "react"
import { Control, Controller } from "react-hook-form"
import { Input } from ".."
import Select from "react-select"
import Switch from "react-switch"

import { customStyles } from "./styles"
interface FormInputProps {
   control: Control<any>
   name: string
   label: string
   rules: {}
   options?: { value: string; label: string }[]
   isMulti?: boolean
   defaultValue?: any
   type?: "select" | "check" | "input"
   disabled?: boolean
}

const FormInput: FunctionComponent<FormInputProps> = ({
   control,
   name,
   label,
   rules,
   options,
   defaultValue,
   disabled,
   isMulti = false,
   type = "input",
}) => {
   return (
      <Controller
         control={control}
         name={name}
         rules={rules}
         defaultValue={defaultValue}
         render={({ field, fieldState: { error } }) => (
            <div className="input-wrapper">
               <p>{label}</p>
               {type === "select" ? (
                  <Select
                     {...field}
                     isMulti={isMulti}
                     styles={customStyles}
                     options={options}
                     disabled={disabled}
                  />
               ) : type === "check" ? (
                  <Switch
                     {...field}
                     checked={Boolean(field.value)}
                     className="input-switch"
                     disabled={disabled}
                  />
               ) : (
                  <Input {...field} disabled={disabled} />
               )}
            </div>
         )}
      />
   )
}

export default FormInput
