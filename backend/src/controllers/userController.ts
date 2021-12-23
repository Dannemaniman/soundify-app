import { NextFunction, Request, Response, Router } from 'express'
import { User } from '../db/models/User'
import userService from '../services/userService'

const router: Router = Router()


router.get('/', async (_: Request, res: Response, next: NextFunction) => {

})


router.post('/', async (req: Request, res: Response, next: NextFunction) => {

  try {
    const newUser = await userService.createNewUser(req.body as User)
    res.status(200).json(newUser)

  } catch (error) {
    console.log(error)
    res.sendStatus(500) && next(error)
  }
})


export = router