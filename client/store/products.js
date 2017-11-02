import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const getProducts = products => ({type: GET_PRODUCTS, products})

export const fetchProducts = () => (dispatch) => {
  axios.get('/api/products')
  .then(res => dispatch(getProducts(res.data)))
  .catch(err => console.error(err))
};

export default function reducer(products = [], action){
  switch (action.type){
    case GET_PRODUCTS:
      return action.products
    default:
      return products
  }
}
