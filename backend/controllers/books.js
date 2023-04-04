const booksRouter = require('express').Router();

let books = [
  {
    id: 0,
    title: 'Assistant to the Villain',
    author: 'Hannah Nicole Maehrer',
    description: 'Notorious, high-ranking villain seeks loyal, levelheaded assistant for unspecified office duties, supporting staff for random mayhem, terror, and other Dark Things In General. Discretion a must. Excellent benefits.'
  }
];

booksRouter.get('/', (request, response) => {
  response.json(books);
})

booksRouter.get('/:id', (request, response) => {
  const id = Number(request.params.id);
  const book = books.find(book => book.id === id);

  if(book) {
    response.json(book);
  } else {
    response.status(404).end();
  }
})

booksRouter.post('/', (request, response) => {
  const book = request.body;

  if(!book.title) {
    return response.status(400).json({error: 'Title missing'});
  } else if(!book.author) {
    return response.status(400).json({error: 'Author missing'});
  } else if(!book.description) {
    return response.status(400).json({error: 'Description missing'});
  }

  const nextId = books.length > 0
    ? Math.max(...books.map(n => n.id)) 
    : 0;

  book.id = nextId + 1;

  books = books.concat(book);

  response.json(book);
})

booksRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id);
  books = books.filter(book => book.id !== id);

  response.status(204).end();
})

booksRouter.put('/:id', (request, response) => {
  const id = Number(request.params.id);
  books = books.map(book => book.id === id ? request.body : book);

  const book = books.find(book => book.id === id);

  if(book) {
    response.json(book);
  } else {
    response.status(404).end();
  }
})

module.exports = booksRouter