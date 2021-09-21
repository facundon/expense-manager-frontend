import { GroupTypeBase, Styles } from "react-select"

export const customStyles:
   | Partial<
        Styles<
           {
              value: string
              label: string
           },
           false,
           GroupTypeBase<{
              value: string
              label: string
           }>
        >
     >
   | undefined = {
   option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "black" : "blue",
      padding: 5,
   }),
   control: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid",
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = "opacity 300ms"

      return {
         ...provided,
         opacity,
         transition,
         color: "inherit",
      }
   },
   valueContainer: (base, state) => ({
      ...base,
      justifyContent: state.isMulti ? "start" : "center",
   }),
   container: base => ({
      ...base,
      width: "100%",
      maxWidth: "20em",
      textAlign: "center",
   }),
}
