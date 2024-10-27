import express, {Request, Response} from 'express';
import { createNewExpense, updateExpense, getAllExpenses, getSpecificExpense, deleteExpense, filterExpense } from '../services/expense.service';
export const handleCreateExpense = async (req: Request, res: Response) => {
    const {title, categories, amount, date} = req.body;
    const {id} = req.params
    if(!id) {
        return res.status(400).send({message: 'Please provide a valid id.'})
    }
    if(!title && !categories && !amount && !date) {
        return res.status(400).send({message: 'Please provide the following details'})
    }
    try {
        const create = await createNewExpense({title, date, categories, amount}, id)
        if (!create) {
            return res.status(400).send({message: 'Could not create new expense.'})
        }
        return res.status(200).send({message: 'Successfully created expense', create})
    } catch(err) {
        console.log(err, 'invalid error.')
        return res.status(500).send({message: 'Internal server error.'})
    }
}
export const handleGetSpecificExpense = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).send({message: 'Please provide a valid id'})
    }
    try {
        const getExpense = await getSpecificExpense(id)
        if (!getExpense) {
            return res.status(400).send({message: 'Could not get expense with the following id'})
        }
        return res.status(200).send({message: 'Successfully got tasks', getExpense})
    }   catch(err) {
        console.log(err, 'Invalid error')
        return res.status(500).send({message: 'Internal server error.'})
    }
}
export const handleUpdateExpense = async (req: Request, res: Response) => {
    const {id} = req.params
    const { title, categories, date, amount} = req.body
    if (!id) {
        return res.status(400).send({message: 'Please provide a valid id'})
    }
    if(!title && !categories && !amount && !date) {
        return res.status(400).send({message: 'Please provide the following details'})
    }
    try {
        const update = await updateExpense({categories, date, amount, title}, id)
        if (!update) {
            return res.status(400).send({message: 'Could not update the following expense.'})
        }
        return res.status(200).send({message: 'Successfully updated the expense :)', update})
    }   catch(err) {
        console.log(err, 'Invalid error')
        return res.status(500).send({message: 'Internal server error.'})
    }

}
export const handleGetAllExpense = async (req: Request, res: Response) => {
    try {
        const expenses = await getAllExpenses()
        if(!expenses) {
            return res.status(400).send({message: 'Could not get all the expenses'})
        }
        return res.status(200).send({message: 'Successfully got all the expenses.', expenses})
    }   catch(err) {
        console.log(err, 'Invalid error')
        return res.status(500).send({message: 'Internal server error.'})
    }

}
export const handleDeleteExpense = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).send({message: 'Please provide a valid id'})
    }
    try {
        const deleting = await deleteExpense(id);
        if (!deleting) {
            return res.status(400).send({message: 'Could not delete the expense.'})
        }
        return res.status(200).send({message: 'Successfully deleted expense.'})
    }   catch(err) {
        console.log(err, 'Invalid error')
        return res.status(500).send({message: 'Internal server error.'})
    }
}
// handle the filtering of expenses
export const handleFilterExpense = async (req: Request, res: Response): Promise<any> => {
    const {startDate, endDate, period} = req.params
    if (!startDate && !endDate && !period) {
        return res.status(400).send({message: 'Please provide one of the following details.'})
    }
    try {
        const filter = await filterExpense(startDate, endDate, period)
        if (!filter) {
            return res.status(400).send({message: 'Could not filter expenses.'})
        }
        return res.status(200).send({message: 'Successfully filtered expense'})
    }   catch(err) {
        console.log(err, 'Invalid error')
        return res.status(500).send({message: 'Internal server error.'})
    }
}