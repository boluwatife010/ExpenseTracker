import express from 'express';
import { handleCreateExpense, handleGetAllExpense, handleDeleteExpense, handleGetSpecificExpense, handleUpdateExpense } from '../controllers/expense.controller';
const route = express.Router();
route.post('/create-expense', handleCreateExpense);
route.get('/:id', handleGetSpecificExpense)
route.get('/', handleGetAllExpense);
route.put('/update/:id', handleUpdateExpense);
route.delete('/delete/:id', handleDeleteExpense)
export default route;