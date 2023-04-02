import { useState, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';

import BookList from './components/BookList';
import BookForm from './components/BookForm';

import bookService from './services/books';

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    bookService
      .getAll()
      .then(books => setBooks(books))
      .catch(error => {
        setAlertMessage({message: error.message, type: 'danger'});
      })
  }, []);

  const handleBookClick = (id) => {
    bookService
      .getOne(id)
      .then(book => {
        setSelectedBookId(book.id);
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
      })
      .catch(error => {
        setAlertMessage({message: `Clicked book is already removed from collection`, type: 'danger'});
        setBooks(books.filter(book => book.id !== id));
        setTitle('');
        setAuthor('');
        setDescription('');
        setSelectedBookId(null);
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      })
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
        setAlertMessage({message: `Book ${title} added to collection.`, type: 'primary'});
        setTitle('');
        setAuthor('');
        setDescription('');
        setSelectedBookId(null);
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      })
      .catch(error => {
        setAlertMessage({message: error.response.data.error, type: 'danger'});
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      })
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
        setAlertMessage({message: `Book ${title} updated.`, type: 'primary'});
        setBooks(books.map(book => book.id === selectedBookId ? updatedBook : book));
        setTitle('');
        setAuthor('');
        setDescription('');
        setSelectedBookId(null);
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      })
      .catch(error => {
        setAlertMessage({message: error.response.data.error, type: 'danger'});
        setBooks(books.filter(book => book.id !== selectedBookId));
        setTitle('');
        setAuthor('');
        setDescription('');
        setSelectedBookId(null);
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      })
  }

  const handleDeleteBook = () => {
    bookService
      .remove(selectedBookId)
      .then(response => {
        setBooks(books.filter(book => book.id !== selectedBookId));
        setAlertMessage({message: `Book ${title} removed from collection.`, type: 'primary'});
        setTitle('');
        setAuthor('');
        setDescription('');
        setSelectedBookId(null);
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      })
  }

  return (
    <div className='main-container'>
      <div className='books-container'>
        <h1>Book collection</h1>
        {alertMessage && <Alert variant={alertMessage.type}>{alertMessage.message}</Alert>}
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
