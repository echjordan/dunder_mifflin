import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const MAKE_PRODUCT = 'MAKE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'


const getProducts = products => ({type: GET_PRODUCTS, products})
const makeProduct = product => ({type: MAKE_PRODUCT, product})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})
const removeProduct = (id) => ({ type: REMOVE_PRODUCT, id })


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

export const deleteProduct = (id) => (dispatch) => {
  axios.delete(`/api/products/${id}`)
    .then(() => dispatch(removeProduct(id)))
    .catch(err => console.error(err))
};

export const postReview = (id, review) => (dispatch) => {
  axios.post(`/api/products/${id}/reviews`, {
    title: review.title,
    content: review.content,
    stars: review.stars,
    productId: id,
  })
    .then(product => {
      dispatch(updateProduct(product))
    })
    .catch(err => console.error(err))
}

export const changeProduct = (id, data) => (dispatch) => {
  axios.post(`/api/products/${id}`, data)
  .then(product => {dispatch(updateProduct(product))
  })
  .catch(err => console.error(err))
}

export default function reducer(products = [], action){
  switch (action.type){
    case GET_PRODUCTS:
      return action.products
    case UPDATE_PRODUCT:
      return products.map(product => {
        if (product.id === action.product.id) return action.product
        else return product
    })
    case REMOVE_PRODUCT:
      return products.filter(product => {
        return product.id !== action.id
      })
    case MAKE_PRODUCT:
      return [...products, action.product]
    default:
      return products
  }
}
