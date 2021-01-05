import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import config from "config";

import router from "./routes/router";
import errorHandler from "./services/error-handler";
import { startDB } from "./utils/database";
import socketIO from "./utils/socket";

const app = express();

app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

router(app);
errorHandler.set(app);

startDB(() => {
  const server = app.listen(config.get("port"));
  const io = socketIO.init(server);

  io.on("connection", (socket) => {
    console.log("Client connected");
  });
});
