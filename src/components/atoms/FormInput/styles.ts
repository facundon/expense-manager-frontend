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
      color: state.isSelected ? "hsl(0, 100%, 95%)" : "hsl(0, 0%, 40%)",
      backgroundColor: state.isSelected
         ? "hsl(262, 48%, 22%)"
         : provided.backgroundColor,
      padding: 5,
   }),
   control: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "1px solid",
      ":focus-within": {
         boxShadow: "none",
         borderColor: "linear-gradient(to left, #333, #200)",
      },
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
   clearIndicator: (base, state) => ({
      ...base,
      color: "hsl(322, 66%, 37%)",
      ":hover": {
         color: "red",
      },
   }),
   multiValueRemove: (base, state) => ({
      ...base,
      color: "hsl(322, 66%, 37%)",
      ":hover": {
         color: "red",
      },
   }),
   multiValue: (base, state) => ({
      ...base,
      backgroundColor: "hsl(0, 0%, 15%)",
   }),
   multiValueLabel: (base, state) => ({
      ...base,
      color: "hsl(0, 0%, 95%)",
   }),
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
