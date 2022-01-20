import { Request, Response, Router } from 'express'
const router: Router = Router()
const { searchService } = require('../services/searchService')


router.get('/:searchphrase', async (req: Request, res: Response) => {
  const result = await searchService(req.params.searchphrase)

  if (result) {
    return res.json(result)
  } else {
    return res.sendStatus(500).json(result.message)
  }
})

export = router