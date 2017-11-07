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
const EMPTY_CART = 'EMPTY_CART';
const CALC_SUBTOTAL = 'CALC_SUBTOTAL';

//Action Creators
const submitPurchases = (order) => ({type: SUBMIT_PURCHASES, order})
const addPurchase = (purchase) => ({type: ADD_PURCHASE, purchase});
const updateSubTotal = (subTotal) => ({type: UPDATE_SUBTOTAL, subTotal})
const putPurchase = (cartIdx, quantity) => ({type: PUT_PURCHASE, cartIdx, quantity});
const delPurchase = (cartIdx) => ({type: DEL_PURCHASE, cartIdx})
const getPurchases = (purchases) => ({type: GET_PURCHASES, purchases});
const emptyCart = () => ({type: EMPTY_CART})

//Thunks
export const postPurchase = function (info) {
  return function thunk (dispatch) {
    let state = store.getState().cart;
    let paid = state.purchases.map(item => {
      return {
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }
    })
    axios.post('/api/orders', {
      email: info.email,
      address: info.address,
      subTotal: state.subTotal,
      purchases: paid
    })
    .then(order => dispatch(submitPurchases(order)))
    .then(() => dispatch(emptyCart()))
    .catch(err => console.log(err))
  }
}
export const pushPurchase = function (productId) {
  return function thunk (dispatch)  {
    let bag = store.getState().cart.purchases;
    let index = bag.findIndex(item => item.id == productId)
    if (index != -1) {
      bag[index].quantity += 1;
      const newTotal = Number(bag[index].price * bag[index].quantity)
      dispatch(updateSubTotal(newTotal))
    }
    else  {
        axios.get(`/api/products/${productId}`)
        .then(res => res.data)
        .then(product => {
            let purchase = {};
            purchase.id = product.id;
            purchase.photo = product.photos[0];
            purchase.title = product.title;
            purchase.quantity = 1;
            purchase.price = product.price;
            purchase.availability = product.quantity;
          const newTotal = Number(store.getState().cart.subTotal) + Number(purchase.price);
          dispatch(addPurchase(purchase))
          dispatch(updateSubTotal(newTotal))
        })
        .catch(err => console.log(err))
      }
  }
}

export const editPurchase = function (purchaseIdx, newQuantity)  {
  return function thunk (dispatch)  {
    let info = store.getState().cart;
    const price = info.purchases[purchaseIdx].price;
    const quantity = info.purchases[purchaseIdx].quantity;
    const oldSubTotal = info.subTotal;
    const oldPurchaseTotal = Number(price * quantity);
    const newPurchaseTotal = Number(price * newQuantity);
    const newTotal = oldSubTotal - oldPurchaseTotal + newPurchaseTotal;
    const amountAvailable = info.purchases[purchaseIdx].availability;
    if (newQuantity > amountAvailable)  {
      newQuantity = Number(amountAvailable);
    }
    dispatch(putPurchase(purchaseIdx, Number(newQuantity)))
    dispatch(updateSubTotal(Number(newTotal)))
  }
}
export const destroyPurchase = function (purchaseIdx) {
  return function thunk (dispatch)  {
    let info = store.getState().cart;
    const price = info.purchases[purchaseIdx].price;
    const quantity = info.purchases[purchaseIdx].quantity;
    const newTotal = Number(info.subTotal - (price * quantity));
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
    // case CALC_SUBTOTAL:
    //   return action.purchases.reduce(item => {
    //     return item.price * item.quantity
    //   })
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
    case EMPTY_CART:
      return Object.assign({
        purchases: [],
        subTotal: 0.00
      })
    default:
      return state
  }
}
