import { Application } from "express";
import basic from "./api/controllers/basic"


export = (app: Application): void => {

  // Routes
  app.use("/api/", basic);


};