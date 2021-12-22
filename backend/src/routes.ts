import { Application } from "express";
import basic from "./controllers/basic"


export = (app: Application): void => {

  // Routes
  app.use("/api/", basic);


};