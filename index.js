const express = require("express");
const nodemon = require("nodemon");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateId = () => {
  return new Date().getTime();
};

app.get("/", (req, res) => {
  res.send("<h1>Hello You Cutie!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/info", (req, res) => {
  const timeAccessed = new Date();
  res.send(`<p>Notebook currently has ${notes.length} notes.</p>
  <p>${timeAccessed}</p>`);
});

app.get("/api/notes/:id", (req, res) => {
  const id = +req.params.id;
  const note = notes.find((note) => note.id === id);
  note ? res.json(note) : res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = +req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "Content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date().toISOString(),
    id: generateId(),
  };

  notes = notes.concat(note);

  res.json(note);
});

app.put("/api/notes/:id", (req, res) => {
  const body = req.body;
  const id = +req.params.id;

  if (!body.content) {
    return res.status(400).json({
      error: "Content missing",
    });
  }
  let noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.important = !noteToEdit.important;
  res.json(noteToEdit);
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
