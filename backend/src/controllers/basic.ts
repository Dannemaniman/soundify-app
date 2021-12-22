
import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", async (_: Request, res: Response) => {
  console.log("Hello world!");

  res.status(200).json({
    message: "Nice, you managed to send a GET request",
  });
});


export = router;