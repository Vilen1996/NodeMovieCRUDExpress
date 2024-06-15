const express = require("express");
const app = express();
const port = 3001;
const {
  handleCreate,
  handleRead,
  updateMovie,
  handleDelete,
  patchMovie,
} = require("./methods");

app.get("/items", (req, res) => {
  handleRead(req, res);
});

app.post("/items", (req, res) => {
  handleCreate(req, res);
});

app.put("/items/:id", (req, res) => {
  updateMovie(req, res);
});

app.patch("/items/:id", (req, res) => {
  patchMovie(req, res);
});

app.delete("/items/:id", (req, res) => {
  handleDelete(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/items`);
});
