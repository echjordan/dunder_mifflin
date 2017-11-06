import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchAllUsers, updateUser, deleteUser } from '../store/users'
import { fetchAllOrders, updateOrder } from '../store/orders'
import { createProduct } from '../store/products'
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Card from 'material-ui/Card';

export class Admin extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProductSubmit = this.handleProductSubmit.bind(this);
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


  handleProductSubmit(evt) {
    let newProduct = {
      title: evt.target.title.value,
      description: evt.target.desc.value,
      photos: evt.target.photos.value.split(', '),
      categories: evt.target.categories.value.split(', '),
      price: evt.target.price.value,
      quantity: evt.target.quantity.value,
      available: evt.target.avail.value
    }
    this.props.createProduct(newProduct);
  }



  render() {
    const users = this.props.users;
    const orders = this.props.orders;
    const products = this.props.products;
    const currentUser = this.props.user;

    return (
      <div className="admin-container">
        <div>
          <h1>Welcome, Admin {currentUser.name || currentUser.email}!</h1>
        </div>
      <h2>Orders:</h2>
      {
        orders.sort((a, b) => a.id - b.id).map((order, index) =>
          (<Card key={order.id}><div className="admin-orders">
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
            <div>Products: {
                    orders[index].purchases.map((purchase, index2) =>
                    (<li key={purchase.id}><NavLink to={`/products/${orders[index].purchases[index2].product.id}`}>{'ITEM: ' + orders[index].purchases[index2].product.title + ', QUANTITY: '  + orders[index].purchases[index2].quantity}</NavLink></li>))
                    }</div>
          </div></Card>)
        )
      }
      <h2>Users:</h2>
      {
        users.sort((a, b) => a.id - b.id).map(user =>
          (<Card key={user.id}><div className="admin-users">
            <div>
              <div>{user.name} / {user.email}</div>
                <div>
                <FormGroup onSubmit={this.handleSubmit}>
        <FormControlLabel
          control={
            <Switch
              defaultChecked={user.admin}
              onChange={this.handleInputChange.bind(this, user.id)}
            />
          }
          label="Admin Status"
        />
        </FormGroup>
                    <label>
                      Password Reset:
                      <input
                        name="passwordReset"
                        type="checkbox"
                        value={false} />
                    </label>

                </div>
                <div>
                <button
                  onClick={() => this.props.deleteUser(user.id)}
                  className="btn btn-default">X
                </button>
             </div>
            </div>
          </div></Card>)
        )
      }
      <h2>Products:</h2>
        <div className="new-product-form">
            <h3>Create New Product: </h3>
            <form onSubmit={this.handleProductSubmit}>
              <label>Title: </label>
                <input type="text" id="title" />
              <label>Description: </label>
                <input type="text" id="desc" />
              <label>Photo URLs (separated by comma): </label>
                <input type="text" id="photos" />
              <label>Price: </label>
                <input type="number" id="price" />
              <label>Categories (separated by comma): </label>
                <input type="text" id="categories" />
              <label>Quantity: </label>
                <input type="number" id="quantity" />
              <label>Availability: </label>
                <input type="checkbox" id="avail" />
              <input type="submit" value="Submit" />
            </form>
          </div>
      {
        products.sort((a, b) => a.id - b.id).map(product =>
          (<div className="admin-products" key={product.id}>
            <NavLink to={`/products/${product.id}`}>#{product.id} {product.title}</NavLink>
           </div>)
        )
      }
      </div>
    )
  }
}

const mapStateToProps = ({user, users, orders, products}) => ({user, users, orders, products})

const mapDispatchToProps = {fetchAllUsers, fetchAllOrders, updateOrder, updateUser, deleteUser, createProduct}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
