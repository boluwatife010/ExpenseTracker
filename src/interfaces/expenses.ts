export interface expenseRequestBody {
    amount: number;
    title: string;
    categories: validCategories;
    date: Date
}
export enum validCategories { 
   utilities = 'utilities', 
   health = 'health',
   other =  'other',
   leisure =  'leisure', 
   groceries = 'groceries',
   electronics = 'electronics',
   clothing = 'clothing'
} 
export interface updateRequestBody {
    amount: number;
    title: string;
    categories: validCategories;
    date: Date;
}