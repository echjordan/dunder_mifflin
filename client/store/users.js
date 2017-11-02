import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';

const getAllUsers = users => ({type: GET_ALL_USERS, users})

export const fetchAllUsers = () => (dispatch) => {
  axios.get('/api/users/')
  .then(res => dispatch(getAllUsers(res.data)))
  .catch(err => console.error(err))
};


export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return users
  }
}
