const fetch = require('node-fetch')


const searchService = async (type: string, query: string, next: string) => {
  // const { getOrSetCache } = require('../db/redis')
  try {
    // return await getOrSetCache(searchQuery, await fetchFromHeroku(searchQuery))
    return await fetchFromHeroku(type, query, next)
  } catch (error: any) {
    return error
  }
}

const fetchFromHeroku = async (type: string, query: string, next?: string) => {

  const next2 = next ? `?next=${next}` : ""
  const path = `${process.env.HEROKU}${type}/${query}${next2}`

  console.log(path)


  let response = await fetch(path)
  console.log(response)

  const res = await response.json()
  console.log(res)

  return res
}

module.exports = { searchService }