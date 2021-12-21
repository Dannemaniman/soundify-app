import Express, { Application } from "express";
import Routes from "./routes";


const app: Application = Express();


export default async function (): Promise<Application> {
  Routes(app);
  return app;
}