import { expenseTrackerModel } from "../models/expensetracker.model";
import { expenseRequestBody, updateRequestBody } from "../interfaces/expenses";
import { userModel } from "../models/user.model";
export const createNewExpense = async (body: expenseRequestBody): Promise<any> => {
    const {title, amount, categories, date} = body
    if(!title && !amount && !categories && !date) {
        throw new Error('Please provide the following details.')
    }
    const createExpense = new expenseTrackerModel(title, amount, {categories, date})
    if (!createExpense) {
        throw new Error('Could not create new expense :(')
    }
    await createExpense.save();
    return createExpense;
}
export const getSpecificExpense = async (id: string): Promise<any> => {
    if(!id) {
        throw new Error('Please provide a valid id.')
    }
 const track = await expenseTrackerModel.findById(id)
 if (!track) {
    throw new Error('Could not find the task with this id.')
 }
 return track;
}
export const getAllExpenses = async (): Promise<any> => {
    const allExpense = await expenseTrackerModel.find()
    if (!allExpense) {
        throw new Error('Could not get all expenses.')
    }
    return allExpense
}
export const updateExpense = async (body: updateRequestBody, id: string): Promise<any> => {
    if(!id) {
        throw new Error('Please provide a valid id.')
    }
    const {title, categories, amount, date} = body
    if(!title && !categories && !amount && !date) {
        throw new Error('Please provide one of the following fields to update')
    }
    const update = await expenseTrackerModel.findByIdAndUpdate(id, { ...(title && { title }),
     ...(categories && {categories}), ...(amount && {amount}),...(date && {date})}, {new: true})
     if(!update){
        throw new Error('Could not update the following fields.')
     }
     return update;
}
export const deleteExpense = async (id: string): Promise<any> => {
    if(!id) {
        throw new Error('Please provide a valid id.')
    }
    const remove = await expenseTrackerModel.findByIdAndDelete(id)
    if (!remove) {
        throw new Error('Could not remove the expense, please crosscheck your details')
    }
    return remove
}
// Create filter endpoint
export const filterExpense = async (user: any, period?: string, startDate?: string, endDate?: string): Promise<any> => {
    const today = new Date();
    const filter: any = { userId: user._id }; 
    if (period) {
        switch (period) {
            case 'week':
                filter.date = { $gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) };
                break;
            case 'month':
                filter.date = { $gte: new Date(today.setMonth(today.getMonth() - 1)) };
                break;
            case '3months':
                filter.date = { $gte: new Date(today.setMonth(today.getMonth() - 3)) };
                break;
        }
    } else if (startDate && endDate) {  
        filter.date = {
            $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)),
            $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)) 
        };
    }
    const expenses = await expenseTrackerModel.find(filter).exec();
    return expenses;
};
