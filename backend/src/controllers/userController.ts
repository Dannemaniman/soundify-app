import { NextFunction, Request, Response, Router } from 'express'
import { UserInterface } from '../db/models/User'
import userService from '../services/userService'
import bcrypt from "bcrypt"
import User from '../db/schemas/userSchema'
import auth from '../middleware/auth'

const router: Router = Router()


router.get('/users', auth, async (req: Request, res: Response) => {
  res.send(req.body.user)
})

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await userService.createNewUser(req.body as UserInterface)
    if (!newUser) throw new Error('User Already Exist. Please Login')
    const token = await newUser.generateAuthToken()
    res.status(200).json({ user: newUser.getPublicProfile(), token })

  } catch (error: any) {
    res.sendStatus(500).json(error.msg)
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({ user: user.getPublicProfile(), token })
  } catch (e) {
    res.status(400).send()
  }

})

router.post('/logout', auth, async (req: Request, res: Response) => {

})




export = router