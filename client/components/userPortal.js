import React, {Component} from 'react'
import { connect } from 'react-redux'


class Orders extends Component{
  constructor(){
    super()
  }

  render(){
    const orders = this.props.orders
    return(

    )
  }
}

const mapStateToProps = ({orders}) => ({orders})


export default connect(mapStateToProps)(Orders)
