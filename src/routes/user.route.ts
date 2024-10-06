import express from 'express';
import { handleRegisterUser, handleUserLogin, handleGetUser, handleGetAllUsers, handleDeleteUser } from '../controllers/user.controller';
import { getAllUsers, getAUser } from '../services/userservice';
const router = express.Router();
router.post('/register', handleRegisterUser)
router.post('/login', handleUserLogin)
router.get('/:id', getAUser)
router.get('/', getAllUsers);
router.delete('/delete/:id', handleDeleteUser)

export default router;