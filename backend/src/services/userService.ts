import { UserInterface } from '../db/models/User'
import User from '../db/schemas/userSchema'
import bcrypt from 'bcrypt'

const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config()


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


const logInUser = async (email: string, password: string) => {
  const user = await User.findOne({ email })

  if (user) {
    const token = generateAccessToken(user.email)
    console.log("User:", user)

    return await bcrypt.compare(password, user.password) ? user : false
  }
  else {
    throw Error('incorrect email and/or password')
  }
}


const findUser = async (email: string) => {
  return await User.findOne({ email })
}


const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}


const generateAccessToken = (email: string) => {
  const newToken = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '1800s' })
  console.log(newToken)
  return newToken
}


const userService = {
  createNewUser,
  findUser,
  logInUser
}

export default userService
