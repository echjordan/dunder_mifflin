import React, {Component} from 'react'
import { connect } from 'react-redux'
import {getProducts} from '../store/products'

class Products extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div>
        <h1> It me</h1>
      </div>
    )
  }
}

const mapStateToProps = ({products}) => ({products})


export default connect(mapStateToProps)(Products)
