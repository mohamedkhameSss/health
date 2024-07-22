'use server'
import { parseStringify } from './../utils';
import { ID, Query } from 'node-appwrite';
import { users } from './../appwrite.config';
export const createUser = async (user:CreateUserParams)=>{

    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name,
        )
    } catch (error:any) {
        if (error && error?.code === 409) {
            const document = await users.list([
                Query.equal('email',[user.email])]
            )
            return document?.users[0]
        }
    }
}
export const getUser = async(userId:string)=>{
    try {
        const user =await users.get(userId)
        return parseStringify(user)
    } catch (error) {
        console.log(error);
        
    }
}