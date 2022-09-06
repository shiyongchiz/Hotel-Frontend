import axios from "../axios"
const handleLoginAPI = (email, password) => {
  return axios.post('/api/login', { email, password })
}

const getAllUsers = (userid) => {
  return axios.get(`/api/get-all-users?id=${userid}`)
}
const createNewUser = (data) => {
  return axios.post('/api/create-users', data)
}

const deleteUser = (id) => {
  return axios.delete('/api/delete-users', {
    data: {
      id: id
    }
  })
}

const editUSer = (data) => {
  console.log(data);
  return axios.put('/api/update-users',data)
}

export default {
  handleLoginAPI,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUSer
}