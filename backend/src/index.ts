import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {

  const server = await app();
  const port = process.env.PORT

  server.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
};

startServer();