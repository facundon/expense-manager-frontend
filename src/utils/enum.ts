export const getEnumKeys = (object: Object) =>
   Object.keys(object).filter(x => !(parseInt(x) >= 0))
