import ListGroup from 'react-bootstrap/ListGroup';

const BookList = ({books, handleBookClick, selectedBookId}) => {
  return (
    <div className='book-list-container'>
      {books.length > 0 ?
        <ListGroup as='ul'>
          {books.map(book => {
            return <ListGroup.Item
              key={book.id}
              as='li'
              onClick={() => handleBookClick(book.id)}
              className={book.id === selectedBookId ? 'active' : null}
            >
              {book.title}
            </ListGroup.Item>
          })}
        </ListGroup> :
        <p>No books found</p>
      }
    </div>
  )
}

export default BookList