import express from "express"
import Express, { Application } from "express"
import Routes from "./routes"

const cookieParser = require('cookie-parser')


const app: Application = Express()


export default async function (): Promise<Application> {
  app.use(cookieParser())
  app.use(express.json())

  
  Routes(app)
  return app
}