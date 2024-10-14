import express from 'express';
import authenticateToken from '../midddleware/auth';
import { handleCreateExpense, handleGetAllExpense, handleDeleteExpense, handleGetSpecificExpense, handleUpdateExpense, handleFilterExpense } from '../controllers/expense.controller';
const route = express.Router();
route.post('/create-expense',authenticateToken, handleCreateExpense);
route.get('/:id', authenticateToken, handleGetSpecificExpense)
route.get('/', authenticateToken, handleGetAllExpense);
route.get('/filter',authenticateToken, handleFilterExpense)
route.put('/update/:id', authenticateToken, handleUpdateExpense);
route.delete('/delete/:id', authenticateToken, handleDeleteExpense)
export default route;