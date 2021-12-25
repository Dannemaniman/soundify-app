import express from "express"
import Express, { Application } from "express"
import Routes from "./routes"


const app: Application = Express()


export default async function (): Promise<Application> {
  app.use(express.json())
  Routes(app)
  return app
}