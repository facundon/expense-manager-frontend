export const getDate = () => {
   const today = new Date()
   return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
}

export const getCurrentMonth = () => {
   return new Date().getMonth() + 1
}
