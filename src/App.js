import { useState, useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

  const saveNewBtnDisabled = [title,author,description].includes('');
  const saveBtnDisabled = [title,author,description].includes('') || selectedBookId === null;
  const deleteBtnDisabled = selectedBookId === null;

  return (
    <div className='main-container'>
      <div className='books-container'>
        <h1>Book collection</h1>
        <div className='book-list-container'>
          <ListGroup as='ul'>
            {books.map(book => {
              return <ListGroup.Item key={book.id} as='li' onClick={() => handleBookClick(book.id)}>{book.title}</ListGroup.Item>
            })
            }
          </ListGroup>
        </div>
        <div className='book-form-container'>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={handleTitleChange}
                isInvalid={title === ''}
              />
              <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label >Author</Form.Label>
              <Form.Control
                type='text'
                value={author}
                onChange={handleAuthorChange}
                isInvalid={author === ''}
              />
              <Form.Control.Feedback type="invalid">Author is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control             
                as='textarea'
                value={description}
                onChange={handleDescriptionChange}
                isInvalid={description === ''}
              />
              <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button className='save-new-btn' onClick={handleSaveNewBook} disabled={saveNewBtnDisabled}>Save new</Button>
          <Button className='save-delete-btn' onClick={handleUpdateBook} disabled={saveBtnDisabled}>Save</Button>
          <Button className='save-delete-btn' onClick={handleDeleteBook} disabled={deleteBtnDisabled}>Delete</Button>
        </div>
      </div>
    </div>
  )
}

export default App;
