import { userModel } from "../models/user.model";
import bcrypt from 'bcryptjs'
import { generateToken } from "../midddleware/auth";
import { registerUserBody } from "../interfaces/user";
import { Error } from "mongoose";
// Register a new user
export const registerUser = async (body: registerUserBody) => {
    const {email, password, username} = body
    const existing = await userModel.findOne({email})
    if (existing) {
        throw new Error ('User with this email already exists')
    }
    if (!email || ! password || !username) {
        throw new Error ('Please provide the following details')
    }
    const registering = new userModel({email, password, username})
    if (!registering) {
        throw new Error ('Could not register user.');
    }
    const token = await generateToken(registering._id.toString());
    registering.save()
    return {registering, token}
}
// Login an existing user
export const loginUser = async (email: string, password: string): Promise<any> => {
 if (!email || ! password) {
    throw new Error ('Please provide the following details')
 }
 const finding = await userModel.findOne({email})
 if (!finding) {
    throw new Error ('We could not find a user with this details')
 }
 const comparison = await bcrypt.compare(password, finding.password)
 if (!comparison) {
    throw new Error ('Please check your password')
 }
 return finding;
}
// Get a specific user <
export const getAUser = async (id: string): Promise<any> => {
    const user = await userModel.findById(id)
    if (!user) {
        throw new Error ('could not find user with this specific id.')
    }
    return user;
}
//Get all users
export const getAllUsers = async (): Promise<any> => {
    const allUsers = await userModel.find();
    if(!allUsers) {
        throw new Error('Could not get all users')
    }
    return {allUsers}
}
// Update user
export const updateUser = async(id: string, email: string, password: string, username:string) => {
    const updating = await userModel.findById(id)
    if(!updating) {
        throw new Error ('Could not find user by this id.')
    }
    if(email) {
        updating.email = email
    }
    if(username) {
        updating.username = username
    }
    if(password) {
        updating.password = password
    } 
    await updating.save();
    return {updating}
}
export const deleteUser = async (id: string) => {
    const removing = await userModel.findByIdAndDelete(id)
    if(!removing) {
        throw new Error ('Could not delete user.')
        return removing;
    }
}