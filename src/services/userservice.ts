import { userModel } from "../models/user";
import { registerUserBody } from "../interfaces/user";
// Register a new user
export const registerUser = async (body: registerUserBody) => {
    const {email, password, username} = body
    if (!email || ! password || !username) {
        throw new Error ('Please provide the following details')
    }
    const registering = new userModel({email, password, username})
    if (!registering) {
        throw new Error ('Could not register user.');
    }
    registering.save()
    return registering
}
// Login an existing user
