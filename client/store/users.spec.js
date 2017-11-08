import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {getAllUsers} from './users'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {users: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  // describe('fetchAllUsers', () => {
  //   it('eventually dispatches the GET ALL USERS action', () => {
  //     const fakeUsers = [{email: 'bob@bob.com', name: 'Bob', admin: false}, {email: 'sally@sally.com', name: 'Sally', admin: false}, {email: 'cody@cody.com', name: 'Cody', admin: true}]
  //     mockAxios.onGet('/api/users').replyOnce(200, fakeUsers)
  //     return store.dispatch(getAllUsers())
  //       .then(() => {
  //         const actions = store.getActions()
  //         expect(actions[0].type).to.be.equal('GET_ALL_USERS')
  //         expect(actions[0].users).to.be.deep.equal(fakeUsers)
  //       })
  //   })
  // })

  // describe('logout', () => {
  //   it('logout: eventually dispatches the REMOVE_USER action', () => {
  //     mockAxios.onPost('/auth/logout').replyOnce(204)
  //     return store.dispatch(logout())
  //       .then(() => {
  //         const actions = store.getActions()
  //         expect(actions[0].type).to.be.equal('REMOVE_USER')
  //         expect(history.location.pathname).to.be.equal('/login')
  //       })
  //   })
  // })
})
