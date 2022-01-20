const fetch = require('node-fetch')


const searchService = async (searchString: string) => {
  // const { getOrSetCache } = require('../db/redis')
  try {
    const searchQuery = searchString
    // return await getOrSetCache(searchQuery, await fetchFromHeroku(searchQuery))
    return await fetchFromHeroku(searchQuery)
  } catch (error: any) {
    return error
  }
}

const fetchFromHeroku = async (searchQuery: string) => {
  let response = await fetch(
    `${process.env.HEROKU}${searchQuery}`)
  return await response.json()
}

module.exports = { searchService }