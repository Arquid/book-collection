import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BookForm = ({
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  description,
  handleDescriptionChange,
  handleSaveNewBook,
  handleUpdateBook,
  handleDeleteBook,
  selectedBookId
}) => {

const saveNewBtnDisabled = [title,author,description].includes('');
const saveBtnDisabled = [title,author,description].includes('') || selectedBookId === null;
const deleteBtnDisabled = selectedBookId === null;

return (
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
      <Button className='save-new-btn' onClick={handleSaveNewBook} disabled={saveNewBtnDisabled}>Save new</Button>
      <Button className='save-delete-btn' onClick={handleUpdateBook} disabled={saveBtnDisabled}>Save</Button>
      <Button className='save-delete-btn' onClick={handleDeleteBook} disabled={deleteBtnDisabled}>Delete</Button>
    </Form>
  </div>
)
}

export default BookForm