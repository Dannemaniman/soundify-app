import { NextFunction, Request, Response, Router } from 'express'
import { getOrSetCache } from '../db/redisCache'
import { redisClient } from '../index'
const https = require('https')
const router: Router = Router()


//create a new playlist (empty)
router.get('/search/:squery', async (req: Request, res: Response) => {
  try {
    const searchQuery = req.params.squery
    console.log('min query')
    console.log(searchQuery)
    const searchResult = await getOrSetCache(searchQuery, async () => {
      const { data } = await https.get(`https://yt-music-api.herokuapp.com/api/yt/search/${searchQuery}`)
      console.log(data)

      redisClient.SETEX('playlist', 1000, JSON.stringify(data))
      return data
    })
    res.json(searchResult)


    res.send()
  } catch (error: any) {
    res.sendStatus(500).json(error.message)
  }
})

export = router
