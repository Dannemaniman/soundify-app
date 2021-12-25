import { Application } from "express";
import user from "./controllers/userController"


export = (app: Application): void => {

  // Routes  
  app.use("/api/user", user);


};