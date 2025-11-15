const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let notes = [
  "Buy groceries",
  "Finish homework",
  "Call mom"
];

app.get("/", (req, res) => {
    res.send("Mini Notes API is running!");
  });
  
app.get("/notes", (req, res) => {
  res.send(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  if (notes[id]) res.send(notes[id]);
  else res.status(404).send("Note not found");
});

app.post("/notes", (req, res) => {
  notes.push(req.body.text);
  res.send(`Added note at index ${notes.length - 1}`);
});

app.put("/notes/:id", (req, res) => {
  const id = req.params.id;
  if (!notes[id]) return res.status(404).send("Note not found");
  notes[id] = req.body.text;
  res.send("Note updated!");
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  if (!notes[id]) return res.status(404).send("Note not found");
  notes.splice(id, 1);
  res.send("Note deleted!");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
