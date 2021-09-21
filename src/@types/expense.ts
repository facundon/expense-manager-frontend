export enum ExpenseKind {
   Fixed,
   Variable,
}
export enum ExpenseCategory {
   Vehicle,
   Health,
   Travels,
   Sports,
   Other,
}
export enum Months {
   January = 1,
   February,
   March,
   April,
   May,
   June,
   July,
   Agoust,
   September,
   October,
   November,
   December,
}

export type Expense = {
   id: number
   value: number
   concept: string
   category: ExpenseCategory
   kind: ExpenseKind
   repeatMonth: Months[]
   risedAt?: Date | null
}
