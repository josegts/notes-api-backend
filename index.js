const express = require('express');
const logger = require('./loggerMiddleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

let notes = [
  {
    id: 1,
    title: 'My next trip',
    date: '2029-01-01',
    important: true,
  },
  {
    id: 2,
    title: 'My next trip',
    date: '2029-01-01',
    important: false,
  },
  {
    id: 3,
    title: 'My next trip ddd',
    date: '2029-01-01',
    important: false,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const { id } = request.params;
  const note = notes.find((note) => note.id === Number(id));
  if (!note) {
    response.status(404).end();
    return;
  }
  response.send(note);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post('/api/notes', (request, response) => {
  const note = request.body;
  console.log(note);
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== undefined ? note.important : true,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNote];
  response.status(201).json(newNote);
});

app.use((request, response) => {
  console.log('Entre aquii....');
  response.status(404).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
