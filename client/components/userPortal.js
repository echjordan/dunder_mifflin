import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchUserOrders } from '../store/userPortal'

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
    const orders = this.props.orders;
    console.log('this.props: ', this.props)
    console.log('ORDERS: ', orders)
  return (
      <div>
        <div className = "orders-container">
          <ul className = "orders-list">
        <h3>test</h3>

        </ul>
      </div>
    </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = ({orders, user}) => ({orders, user})
const mapDispatchToProps = {fetchUserOrders}

export default connect(mapStateToProps, mapDispatchToProps)(UserPortal)
