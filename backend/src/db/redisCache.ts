import { redisClient } from '../index'

//Detta är typ classen
//Detta är en instance av classen!.. skickar in inget för default parameters.. annars kan man skicka in {url: }
//Kör sen redis-server.. så den är igång och så..
//mitt username till ubuntu är Dannemaniman.. sen vanliga lösenordet..


export function getOrSetCache(key: string, cb: () => {}) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error: any, data: any) => {
      if (error) return reject(error)
      if (data != null) return resolve(JSON.parse(data))

      const freshData = await cb()
      redisClient.setEx(key, 1000, JSON.stringify(freshData))
      resolve(freshData)
    })
  })
}

// app.get('test', async (req: Request, res: Response) => {
//   const playlist = await getOrSetCache(req.url, async () => {
//     const { data } = await https.get('www.test.com')
//     redisClient.SETEX('playlist', 1000, JSON.stringify(data))
//     return data
//   })
//   res.json(playlist)
// })

//Sedan använder jag redis precis som jag använde den i terminalen! t ex:
// redisClient.SETEX('photos', 1000, 'bild.jpg')
//mitt value ovanför.. kommer vara det jag får från min metod som hämtar ifrån databasen!.. vi gör det såhär:
// redisClient.SETEX('playlist', 1000, JSON.stringify({ hej: true }))
