import React, {Component} from 'react'
import { connect } from 'react-redux'
import {getProducts} from '../store/products'

class Products extends Component{
  constructor(){
    super()
  }

  render(){
    const products = this.props.products
    return(
      <div className = 'product-container'>
        <ul className = 'product-list'>
        {
          products.map(product =>
            <li key={product.id}>
                {'PRODUCT: ' + product.title + ',       DESCRIPTION:' + product.description + 'IMAGES: '} <img className='product-photos' src={product.photos[0]}/>
            </li>)
        }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({products}) => ({products})


export default connect(mapStateToProps)(Products)
