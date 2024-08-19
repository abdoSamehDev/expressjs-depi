import express from "express";
import "dotenv/config";

const app = express();

const port = process.env.port;

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});

//get req
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Get Request" });
});
