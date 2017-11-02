import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchUserOrders} from '../store/userPortal'
import { NavLink } from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserPortal extends Component {

  constructor(){
    super()
  }

  componentDidMount(){
    this.props.fetchUserOrders(this.props.user.id)
  }

  render(){
    const orders = this.props.userportal;
    console.log(orders)
    const purchases = orders.purchases;
    console.log('PURCHASES: ', orders)
  return (
      <div>
        <div className = "orders-container">
        <h3>{this.props.user.name}'s Orders</h3>
          <ul className = "orders-list">
            {
            orders.map((order, index) =>
              (<li key={order.id}>{'ORDER #: ' + order.id + ', STATUS: ' + order.status + ', DATE: ' + order.createdAt + ', SUBTOTAL: $' + order.subTotal}
              <ul>
                  {
                    orders[index].purchases.map((purchase, index2) =>
                    (<li key={purchase.id}><NavLink to={`/products/${orders[index].purchases[index2].product.id}`}>{'ITEM: ' + orders[index].purchases[index2].product.title + ', QUANTITY: '  + orders[index].purchases[index2].product.quantity}</NavLink></li>))
                    }
                    </ul>
            </li>))
            }
        </ul>
      </div>
    </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = ({userportal, user}) => ({userportal, user})
const mapDispatchToProps = {fetchUserOrders}

export default connect(mapStateToProps, mapDispatchToProps)(UserPortal)

