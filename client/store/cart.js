import axios from 'axios';
import store from './index';
//Idx of the purchase is the current location in the purchases array
let initialState = {
  purchases: [],
  subTotal: 0.00
}
//Action Types
const SUBMIT_PURCHASES = 'SUBMIT_PURCHASES';
const ADD_PURCHASE = 'ADD_PURCHASE';
const UPDATE_SUBTOTAL = 'UPDATE_SUBTOTAL';
const PUT_PURCHASE = 'PUT_PURCHASE';
const DEL_PURCHASE = 'DEL_PURCHASE';
const GET_PURCHASES = 'GET_PURCHASES';


//Action Creators
const submitPurchases = (order) => ({type: SUBMIT_PURCHASES, order})
const addPurchase = (purchase) => ({type: ADD_PURCHASE, purchase});
const updateSubTotal = (subTotal) => ({type: UPDATE_SUBTOTAL, subTotal})
const putPurchase = (cartIdx, quantity) => ({type: PUT_PURCHASE, cartIdx, quantity});
const delPurchase = (cartIdx) => ({type: DEL_PURCHASE, cartIdx})
const getPurchases = (purchases) => ({type: GET_PURCHASES, purchases});

//Thunks
export const postProducts = function (info) {
  return function thunk (dispatch) {
    axios.post('/orders', {
      eamil: info.email,
      address: info.address,
      subTotal: store.getState().subTotal,
      purchases: store.getState().purchases,
    })
    .then(order => dispatch(submitPurchases(order)))
    .catch(err => console.log(err))
  }
}
export const pushPurchase = function (productId) {
  return function thunk (dispatch)  {
    axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
        let purchase = {};
        purchase.photo = product.photos[0];
        purchase.title = product.title;
        purchase.quantity = 1;
        purchase.price = product.price;
      const newTotal = Number(store.getState().cart.subTotal) + Number(purchase.price)

      dispatch(addPurchase(purchase))
      dispatch(updateSubTotal(newTotal))
    })
    .catch(err => console.log(err))
  }
}

export const editPurchase = function (purchaseIdx, newQuantity)  {
  return function thunk (dispatch)  {
    dispatch(putPurchase(purchaseIdx, Number(newQuantity)))
  }
}
export const destroyPurchase = function (purchaseIdx) {
  return function thunk (dispatch)  {
    let info = store.getState().cart;
    const price = info.purchases[purchaseIdx].price;
    const quantity = info.purchases[purchaseIdx].quantity;
    const newTotal = Number(info.subTotal - (price * quantity))
    dispatch(updateSubTotal(newTotal))
    dispatch(delPurchase(purchaseIdx))
  }
}
export const fetchPurchases = function () {
  return function thunk (dispatch)  {
    dispatch(getPurchases(store.getState().purchases))
  }
}

//Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PURCHASES:
      return state;
    case ADD_PURCHASE:
      return Object.assign({}, state, {
        purchases: [...state.purchases, action.purchase]
      })
    case UPDATE_SUBTOTAL:
      return Object.assign({}, state, {
        subTotal: action.subTotal
      })
    case PUT_PURCHASE:
      state.purchases[action.cartIdx].quantity = action.quantity;
      return Object.assign({}, state, {
        purchases: [...state.purchases]
      })
    case DEL_PURCHASE:
      return Object.assign({}, state, {
        purchases: [...state.purchases.filter((item, idx) => idx != action.cartIdx)]
      })
    case GET_PURCHASES:
      return state;
    default:
      return state
  }
}
