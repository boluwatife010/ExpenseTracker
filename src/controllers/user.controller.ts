import express from 'express';
import { registerUser, loginUser, getAllUsers, getAUser, deleteUser } from '../services/userservice';

//Create user register handler 
export const handleRegisterUser = async (req: express.Request, res: express.Response) => {
    const {email, username, password} = req.body;
    if(!email && !username && !password) {
        return res.status(400).send({message: 'Please provide the following details.'})
    }
    try {
        const register = await registerUser({email, password, username})
        if(!register) {
            return res.status(400).send({message: 'Could not create a new user :('})
        }
        return res.status(200).send({message: 'Successfully created new user.'})
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'}); 
    }
}
// Create user login handler
export const handleUserLogin = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body
    if(!email  && !password) {
        return res.status(400).send({message: 'Please provide your email and password :)'})
    }
    try {
        const login = await loginUser(email, password)
        if(!login) {
            return res.status(400).send({message: 'Could not login user :('})
        }
        return res.status(200).send({message: 'Successfully logged in new user'})
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'}); 
    }
}
// Create get user handler
export const handleGetUser = async (req: express.Request, res: express.Response) => {
    const {id} = req.params
    if(!id) {
        return res.status(400).send({message: 'Please provide a valid id :)'})
    }
    try {
        const user = await getAUser(id)
        if (!user) {
            return res.status(400).send({message: 'Could not get user with this id :('})
        }
        return res.status(200).send({message: 'Successfully got user! :)'})
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'}); 
    }
}
// Create get all users handler
 export const handleGetAllUsers = async (res: express.Response) => {
    try {
        const users = await getAllUsers();
        if (!users) {
            return res.status(400).send({message: 'Could not get all users'});
        }
        return res.status(200).send({message: 'Successfully got all users :)'})
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'}); 
    }
 }
 // Create delete user handler 
 export const handleDeleteUser = async (req: express.Request, res: express.Response) => {
    const {id} = req.body
    if(!id) {
        return res.status(400).send({message: 'Please provide a valid id :)'})
    }
    try {
        const deleting = await deleteUser(id)
        if (!deleting) {
            return res.status(400).send({message: 'Could not delete user with this id'})
        }
        return res.status(200).send({message: 'Successfully deleted user!'})
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'}); 
    }
 }