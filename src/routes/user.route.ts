import express from 'express';
import authenticateToken from '../midddleware/auth';
import { handleRegisterUser, handleUserLogin, handleGetUser, handleGetAllUsers, handleDeleteUser } from '../controllers/user.controller';
import { getAllUsers, getAUser } from '../services/userservice';
const router = express.Router();
router.post('/register', authenticateToken, handleRegisterUser)
router.post('/login', handleUserLogin)
router.get('/:id', authenticateToken, getAUser)
router.get('/', getAllUsers);
router.delete('/delete/:id', authenticateToken, handleDeleteUser)

export default router;