import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
// const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// const getProduct = product => ({type: GET_SINGLE_PRODUCT, product})
// const removeProduct = () => ({type: REMOVE_PRODUCT})
const getProducts = products => ({type: GET_PRODUCTS, products})

export const fetchProducts = () => (dispatch) => {
  axios.get('/api/products')
  .then(res => dispatch(getProducts(res.data)))
  .catch(err => console.error(err))
};

//SHOULD GO IN SINGLE PRODUCT REDUCER
// export const fetchSingleProduct = (id) => (dispatch) => {
//   axios.get(`/api/products/${id}`)
//   .then(res => dispatch(getProduct(res.data)))
//   .catch(err => console.error(err))
// };

// export const deleteProduct = (id) => (dispatch) => {
//   axios.delete(`/api/products/${id}`)
//     .then(res => dispatch(removeProduct()))
//     .catch(err => console.error(err))
// };


export default function reducer(products = [], action){
  switch (action.type){
    case GET_PRODUCTS:
      return action.products
    default:
      return products
  }
};
