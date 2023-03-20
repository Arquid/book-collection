import { useState, useEffect } from 'react';

import BookList from './components/BookList';
import BookForm from './components/BookForm';

import bookService from './services/books';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    bookService
      .getAll()
      .then(books => setBooks(books))
  }, []);

  const handleBookClick = (id) => {
    bookService
      .getOne(id)
      .then(book => {
        setSelectedBookId(book.id);
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
      });
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleSaveNewBook = () => {
    const newBook = {
      title: title,
      author: author,
      description: description
    };

    bookService
      .create(newBook)
      .then(returnedBook => {
        setBooks(books.concat(returnedBook));
        setTitle('');
        setAuthor('');
        setDescription('');
        setSelectedBookId(null);
      });
  }

  const handleUpdateBook = () => {
    const bookToUpdate = books.find(book => book.id === selectedBookId);
    const changedBook = {
      ...bookToUpdate,
      title: title,
      author: author,
      description: description
    };

    bookService
      .update(selectedBookId, changedBook)
      .then(updatedBook => {
        setBooks(books.map(book => book.id === selectedBookId ? updatedBook : book));
        setTitle('');
        setAuthor('');
        setDescription('');
        setSelectedBookId(null);
      });
  }

  const handleDeleteBook = () => {
    bookService
      .remove(selectedBookId)
      .then(response => {
        setBooks(books.filter(book => book.id !== selectedBookId));
        setTitle('');
        setAuthor('');
        setDescription('');
        setSelectedBookId(null);
      })
  }

  return (
    <div className='main-container'>
      <div className='books-container'>
        <h1>Book collection</h1>
        <BookList
          books={books}
          handleBookClick={handleBookClick}
          selectedBookId={selectedBookId}
        />
        <BookForm
          title={title}
          handleTitleChange={handleTitleChange}
          author={author}
          handleAuthorChange={handleAuthorChange}
          description={description}
          handleDescriptionChange={handleDescriptionChange}
          handleSaveNewBook={handleSaveNewBook}
          handleUpdateBook={handleUpdateBook}
          handleDeleteBook={handleDeleteBook}
          selectedBookId={selectedBookId}
        />
      </div>
    </div>
  )
}

export default App;
