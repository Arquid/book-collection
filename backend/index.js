const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let books = [
  {
    id: 0,
    title: 'Assistant to the Villain',
    author: 'Hannah Nicole Maehrer',
    description: 'Notorious, high-ranking villain seeks loyal, levelheaded assistant for unspecified office duties, supporting staff for random mayhem, terror, and other Dark Things In General. Discretion a must. Excellent benefits.'
  }
];

app.get('/api/books', (request, response) => {
  response.json(books);
})

app.get('/api/books/:id', (request, response) => {
  const id = Number(request.params.id);
  const book = books.find(book => book.id === id);

  response.json(book);
})

app.post('/api/books', (request, response) => {
  const book = request.body;
  const nextId = books.length > 0
    ? Math.max(...books.map(n => n.id)) 
    : 0

  book.id = nextId + 1;

  books = books.concat(book);

  response.json(book);
})

app.delete('/api/books/:id', (request, response) => {
  const id = Number(request.params.id);
  books = books.filter(book => book.id !== id);

  response.status(204).end();
})

app.put('/api/books/:id', (request, response) => {
  const id = Number(request.params.id);
  books = books.map(book => book.id === id ? request.body : book);

  const book = books.find(book => book.id === id);

  response.json(book);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
