import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers, updateUser, deleteUser } from '../store/users'
import { fetchAllOrders, updateOrder } from '../store/orders'

export class Admin extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount () {
    this.props.fetchAllUsers()
    this.props.fetchAllOrders()
  }

  handleSubmit(evt) {
    evt.preventDefault()
  }

  handleChange(id, evt) {
    let newOrder = {
      status: evt.target.value
    }
    this.props.updateOrder(id, newOrder)
  }

  handleInputChange(id, evt) {
    let updatedUser = {
      admin: evt.target.checked
    }
    this.props.updateUser(id, updatedUser)
  }

  render() {
    const users = this.props.users;
    const orders = this.props.orders;
    const products = this.props.products;
    return (
      <div>
      <h2>Orders:</h2>
      {
        orders.map(order =>
          (<div key={order.id}>
            <div>Order #{order.id}
              <div>Date Created: {order.createdAt.slice(5, 7)}-{order.createdAt.slice(8, 10)}-{order.createdAt.slice(0, 4)} | Customer Contact: {order.email} | Subtotal: ${order.subTotal}</div>
              <div>
                  <form>
                      <label>Status: </label>
                        <select defaultValue={order.status} onChange={this.handleChange.bind(this, order.id)}>
                          <option value="created">Created</option>
                          <option value="processing">Processing</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      <input onSubmit={this.handleSubmit} type="submit" value="Submit" />
                    </form>
                </div>
              </div>
            <div>Products: ?</div>
          </div>)
        )
      }
      <h2>Users:</h2>
      {
        users.map(user =>
          (<div key={user.id}>
            <div>
              <div>{user.name} / {user.email}</div>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      Admin Status:
                      <input
                        name="isAdmin"
                        type="checkbox"
                        defaultChecked={user.admin}
                        onChange={this.handleInputChange.bind(this, user.id)} />
                    </label>
                    <label>
                      Password Reset:
                      <input
                        name="passwordReset"
                        type="checkbox"
                        value={false} />
                    </label>
                  </form>
                </div>
                <div>
                <button
                  onClick={() => this.props.deleteUser(user.id)}
                  className="btn btn-default">X
                </button>
             </div>
            </div>
          </div>)
        )
      }
      <h2>Products:</h2>
      { //link to single product page
        products.map(product =>
          (<ul key={product.id}>
            <li>#{product.id} {product.title}</li>
          </ul>)
        )
      }
      </div>
    )
  }
}

const mapStateToProps = ({users, orders, products}) => ({users, orders, products})

const mapDispatchToProps = {fetchAllUsers, fetchAllOrders, updateOrder, updateUser, deleteUser}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
