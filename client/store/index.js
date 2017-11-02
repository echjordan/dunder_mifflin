import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
import singleProduct from './singleProduct'
import cart from './cart'
import userportal from './userPortal'
import users from './users'
import orders from './orders'

const reducer = combineReducers({ user, products, users, orders, userportal, singleProduct,cart})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, localStorage.storeState && JSON.parse(localStorage.storeState), middleware)

//PERSIST THE STORE TO LOCAL STORAGE
store.subscribe(() => localStorage.storeState = JSON.stringify(store.getState()))


export default store
export * from './user'
export * from './products'
export * from './singleProduct'
export * from './userPortal'
export * from './users'
export * from './orders'
export * from './cart'
