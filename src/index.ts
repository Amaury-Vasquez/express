import express from "express";
import { config } from "./config";

const app = express();

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(config.port, () =>
  console.log(`Running at https://localhost:${config.port}/`)
);
