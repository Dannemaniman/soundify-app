import { NextFunction, Request, Response, Router } from 'express'
import { UserInterface } from '../db/models/User'
import userService from '../services/userService'

const router: Router = Router()


router.get('/', async (_: Request, res: Response, next: NextFunction) => {

})

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await userService.createNewUser(req.body as UserInterface)
    res.status(200).json(newUser)

  } catch (error) {
    console.log(error)
    res.sendStatus(500) && next(error)
  }
})

router.post('/login', async (req: Request, res: Response) => {

  try {
    const token = await userService.logInUser(req.body.email, req.body.password)
    res.status(200).json(token)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }

})




export = router