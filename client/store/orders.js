import axios from 'axios';

const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const CHANGE_ORDER = 'CHANGE_ORDER';

const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
const changeOrder = order => ({type: CHANGE_ORDER, order})

export const fetchAllOrders = () => (dispatch) => {
  axios.get('/api/orders/')
  .then(res => dispatch(getAllOrders(res.data)))
  .catch(err => console.error(err))
}

export const updateOrder = (id, order) => (dispatch) => {
  axios.put(`/api/orders/${id}`, order)
  .then(res => dispatch(changeOrder(res.data)))
  .catch(err => console.error(err))
}

export default function reducer(orders = [], action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
     case CHANGE_ORDER:
      return orders.map(order => (
        action.order.id === order.id ? action.order : order
      ))
    default:
      return orders
  }
}
