import { Request, Response, Router } from 'express'
const router: Router = Router()
const { searchService } = require('../services/searchService')


router.get('/', async (req: Request, res: Response) => {
  console.log("hey!")
})

router.get('/:mediaType', async (req: Request, res: Response) => {
  console.log("queries:", req.query)

  const mediaType = req.params.mediaType
  const query = req.query.query
  const next = req.query?.next

  console.log(req.query.next)


  const result = await searchService(mediaType, query, next)

  if (result) {
    return res.json(result)
  } else {
    return res.sendStatus(500).json(result.message)
  }
})

/* router.get('/:searchphrase', async (req: Request, res: Response) => {

}) */

export = router