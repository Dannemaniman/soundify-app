import app from './app'
import dotenv from 'dotenv'
import connectToDB from './db/connectMongoDB'

dotenv.config()

const redis = require('redis')
export const redisClient = redis.createClient()




const startRedis = () => {
	redisClient.on('connect', function () {
		console.log('Redis Connected!')
	})

	redisClient.on('error', function (err: any) {
		console.log(err)
	})
}


const startServer = async () => {
	connectToDB()
	const server = await app()
	const port = process.env.PORT
	startRedis()
	console.log(port)

	server.listen(port, () => {
		console.log(`App running on port ${port}`)
	})
}

startServer()
