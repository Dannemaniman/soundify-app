import { NextFunction, Request, Response, Router } from 'express'
import { UserInterface } from '../db/models/User'
import userService from '../services/userService'

const router: Router = Router()


router.get('/', async (_: Request, res: Response, next: NextFunction) => {

})

router.post('/register', (req: Request, res: Response) => {

})

router.post('/login', (req: Request, res: Response) => {

})


router.post('/', async (req: Request, res: Response, next: NextFunction) => {

  console.log("post")

  try {
    const newUser = await userService.createNewUser(req.body as UserInterface)
    res.status(200).json(newUser)

  } catch (error) {
    console.log(error)
    res.sendStatus(500) && next(error)
  }
})


export = router