const fetch = require('node-fetch')


const searchService = async (searchString: string) => {
  const { getOrSetCache } = require('../db/redis')
  try {
    const searchQuery = searchString
    const searchResult = await getOrSetCache(searchQuery, async () => {
      let response = await fetch(`https://yt-music-api.herokuapp.com/api/yt/search/${searchQuery}`)
      let data = response.json()

      return data
    })
    return searchResult

  } catch (error: any) {
    return error
  }
}

module.exports = { searchService }