import axios from 'axios';

const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})

export const fetchAllOrders = () => (dispatch) => {
  axios.get('/api/orders/')
  .then(res => dispatch(getAllOrders(res.data)))
  .catch(err => console.error(err))
}

export default function reducer(orders = [], action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    default:
      return orders
  }
}
