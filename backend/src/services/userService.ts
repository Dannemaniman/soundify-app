import { User } from '../db/models/User'
import { model } from 'mongoose'
import { userSchema } from '../db/schemas/userSchema'

const UserModel = model<User>('User', userSchema)


const createNewUser = async (user: User) => {
  try {
    const newUser = new UserModel(user)
    await newUser.save()
    return newUser

  } catch (error) {
    console.log(error)
  }
}

const userService = {
  createNewUser
}

export default userService
