import { User as IUser } from '../db/models/User'
import User from '../db/schemas/userSchema'

const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config()


const createNewUser = async (user: IUser) => {
  try {

    if (await findUser(user.email)) return

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


const userService = {
  createNewUser,
  findUser
}

export default userService
