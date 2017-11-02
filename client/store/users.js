import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';
const CHANGE_USER = 'CHANGE_USER';
const BOOT_USER = 'BOOT_USER';

const getAllUsers = users => ({type: GET_ALL_USERS, users})
const changeUser = user => ({type: CHANGE_USER, user})
const bootUser = userId => ({type: BOOT_USER, userId})

export const fetchAllUsers = () => (dispatch) => {
  axios.get('/api/users/')
  .then(res => dispatch(getAllUsers(res.data)))
  .catch(err => console.error(err))
};

export const updateUser = (id, user) => (dispatch) => {
  axios.put(`/api/users/${id}`, user)
  .then(res => dispatch(changeUser(res.data)))
  .catch(err => console.error(err))
}

export const deleteUser = (id) => (dispatch) => {
  axios.delete(`/api/users/${id}`, id)
  .then(() => dispatch(bootUser(id)))
  .catch(err => console.error(err))
}

export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case CHANGE_USER:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ))
    case BOOT_USER:
      return users.filter(user => user.id !== action.userId)
    default:
      return users
  }
}
