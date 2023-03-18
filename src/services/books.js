import axios from 'axios'
const baseUrl = "/api/books"

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);

  return response.data
}

const create = async newBook => {
  const response = await axios.post(baseUrl, newBook);

  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`);

  return response.status
}

const update = async (id, updatedBook) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBook);

  return response.data
}

export default {getAll, getOne, create, remove, update}