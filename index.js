import express from "express";
import "dotenv/config";

const app = express();

const port = process.env.port;

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});

//middlesware
app.use(express.json());

//get req
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Get Request" });
});

//post req
app.post("/", (req, res) => {
  console.log(req.body);

  res.status(201).json(req.body);
});

//put req
app.put("/:id", (req, res) => {
  res.status(201).json({ id: req.params.id });
});

//put req
app.delete("/:id", (req, res) => {
  res.status(200).json({ id: req.params.id });
});
