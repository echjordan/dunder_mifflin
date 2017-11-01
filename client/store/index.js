import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'

const reducer = combineReducers({user, products})
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
