// const https = require('https')



// export const searchYoutube = async (song: ISong) => {
//   try {

//     const playlist = await getOrSetCache(req.url, async () => {
//       const { data } = await https.get(`https://yt-music-api.herokuapp.com/api/yt/search/${search}`)

//       redisClient.SETEX('playlist', 1000, JSON.stringify(data))
//       return data
//     })
//     res.json(playlist)




//     let response = await fetch(
//       `https://yt-music-api.herokuapp.com/api/yt/search/${search}`
//     )
//     let res = await response.json()
    
//     const doc = new Song(song)
//     return await doc.save()

//   } catch (error) {
//     console.log(error)
//   }
// }



// })

// export const deleteSong = async (id: number) => {
//   return await Song.deleteOne({ _id: id })
// }


// export const saveAlbum = async (album: IAlbum) => {
//   try {
//     const doc = new Album(album)
//     return await doc.save()

//   } catch (error) {
//     console.log(error)
//   }
// }