import axios from 'axios'

 const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
 const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

 const getProduct = product => ({type: GET_SINGLE_PRODUCT, product})
 const removeProduct = () => ({type: REMOVE_PRODUCT})

 export const fetchSingleProduct = (id) => (dispatch) => {
   axios.get(`/api/products/${id}`)
   .then(res => dispatch(getProduct(res.data)))
   .catch(err => console.error(err))
 };

 export const deleteProduct = (id) => (dispatch) => {
   axios.delete(`/api/products/${id}`)
     .then(() => dispatch(removeProduct()))
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
      dispatch(getProduct(product))})
     .catch(err => console.error(err))
 }

 export default function reducer(product = {}, action){
   switch (action.type){
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return product
   }
 }
