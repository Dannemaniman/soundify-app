import { UserInterface } from '../db/models/User'
import User from '../db/schemas/userSchema'

import bcrypt from 'bcrypt'
const jwt = require("jsonwebtoken")


const createNewUser = async (user: UserInterface) => {
  try {

    if (await findUser(user.email)) {
      return 'User Already Exist. Please Login'
    }

    user.password = await encryptPassword(user.password)

    const doc = new User(user)
    await doc.save()
    return doc

  } catch (error) {
    console.log(error)
  }
}

const findUser = async (email: string) => {
  return await User.findOne({ email })
}

const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

const userService = {
  createNewUser,
  findUser
}

export default userService
