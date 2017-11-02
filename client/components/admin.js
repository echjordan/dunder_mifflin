import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../store/users'
import { fetchAllOrders } from '../store/orders'

export class Admin extends Component {
  constructor() {
    super()
  }

  componentDidMount () {
    this.props.fetchAllUsers()
    this.props.fetchAllOrders()
  }

  render() {
    const users = this.props.users;
    const orders = this.props.orders;
    const products = this.props.products;
    return (
      <div>
      <h1>Orders:</h1>
      { //dropdown for order status
        orders.map(order => //do we want products listed here?
          (<ul key={order.id}>
            <li>Order#{order.id} / {order.status} / {order.createdAt} / ${order.subTotal}</li>
            <li>Products: ?</li>
          </ul>)
        )
      }
      <h1>Users:</h1>
      { //dropdown for admin status / password reset?
        users.map(user =>
          (<ul key={user.id}>
            <li>{user.name} / {user.email} / {user.admin}</li>
          </ul>)
        )
      }
      <h1>Products:</h1>
      { //link to single product page
        products.map(product =>
          (<ul key={product.id}>
            <li>{product.title}</li>
          </ul>)
        )
      }
      </div>
    )
  }
}

const mapStateToProps = ({users, orders, products}) => ({users, orders, products})

const mapDispatchToProps = {fetchAllUsers, fetchAllOrders}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
