import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const MAKE_PRODUCT = 'MAKE_PRODUCT'

const getProducts = products => ({type: GET_PRODUCTS, products})
const makeProduct = product => ({type: MAKE_PRODUCT, product})

export const fetchProducts = () => (dispatch) => {
  axios.get('/api/products')
  .then(res => dispatch(getProducts(res.data)))
  .catch(err => console.error(err))
};

export const createProduct = product => (dispatch) => {
  axios.post('/api/products', product)
  .then(res => dispatch(makeProduct(res.data)))
  .catch(err => console.error(err))
}

export default function reducer(products = [], action){
  switch (action.type){
    case GET_PRODUCTS:
      return action.products
    case MAKE_PRODUCT:
      return [...products, action.product]
    default:
      return products
  }
}
