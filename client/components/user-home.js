import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getOrders } from '../store/userPortal'

/**
 * COMPONENT
 */
export class UserHome extends Component {

  constructor(props){
    super(props)
  }

  render(){
    const email = this.props.email;
    const orders = this.props.orders;

  return (
      <div>
        <div>
          <h3>Welcome, {email}</h3>
        </div>
        <div className = "orders-container">
          <ul className = "orders-list">
            {
            orders.map(order =>
              (<li key={order.id}>
                  {'ORDER #: ' + orders.ID + ', STATUS: ' + orders.status + ', ITEMS: ' + ', DATE: ' + orders.createdAt + ', SUBTOTAL: ' + orders.subTotal}
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
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
