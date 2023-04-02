const express = require('express');
const cors = require('cors');
const booksRouter = require('./controllers/books');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/books', booksRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
