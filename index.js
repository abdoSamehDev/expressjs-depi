import express from "express";
import "dotenv/config";
import fs from "fs";

const app = express();

const port = process.env.port;

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});

//middlesware
app.use(express.json());

//get req
app.get("/", (req, res) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) res.status(400).json({ err });
    if (data) res.status(200).json({ data: JSON.parse(data) });
  });
});

//post req
app.post("/", (req, res) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) res.status(400).json({ err });
    if (data) {
      const users = JSON.parse(data).users;
      const newUserId = users.length + 1;
      const { name } = req.body;
      const newUser = {
        id: newUserId,
        name: name,
      };
      users.push(newUser);
      const newData = { users: users };
      fs.writeFile("database.json", JSON.stringify(newData), (err) => {
        if (err) {
          if (err) res.status(400).json({ err });
        } else {
          res.status(201).json(newUser);
        }
      });
    }
  });
});

//put req
app.put("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) res.status(400).json({ err });
    if (data) {
      const users = JSON.parse(data).users;
      const { name } = req.body;
      users[users.findIndex((e) => e.id == id)].name = name;
      const newData = { users: users };
      fs.writeFile("database.json", JSON.stringify(newData), (err) => {
        if (err) {
          if (err) res.status(400).json({ err });
        } else {
          res.status(201).json({ msg: "User has been modified successfully" });
        }
      });
    }
  });
});

//del req
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) res.status(400).json({ err });
    if (data) {
      let users = JSON.parse(data).users;
      users = users.filter((e) => e.id != id);
      const newData = { users: users };
      fs.writeFile("database.json", JSON.stringify(newData), (err) => {
        if (err) {
          if (err) res.status(400).json({ err });
        } else {
          res.status(201).json({ msg: "User has been deleted successfully" });
        }
      });
    }
  });
});
