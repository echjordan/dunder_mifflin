import React from 'react'
import { connect } from 'react-redux'
import {pushPurchase} from '../store'
import {Link} from 'react-router-dom'

const Products = (props) => {
    const products = props.products
    const handleClick = props.handleClick
    const user = props.user
    return (
      <div className = "product-container">
        <ul className = "product-list">
        <div className = "greeting">
        {
          user.id
        ? <div>{
          user.name
          ? <div>Welcome, {user.name}!</div>
          : <div>Welcome, {user.email}!</div>
        }</div>
        :
        <div>Welcome!</div>
      }
      </div>
        {products.sort((a, b) => a.id - b.id).map(product =>
            (<li key={product.id}>
                <div className="product-name">
                <Link to={`products/${product.id}`}> { product.title } </Link>
                </div>
                <div className="product-description">
                 {product.description}
                </div>
                <div className="product-photos">
                 <img className="product-photos-1" src={product.photos[0]} /> <img className="product-photos-2" src={product.photos[1]} />
                </div>
                <button className="products-add" onClick={handleClick} value={product.id} >
                +
                </button>
            </li>)
          )
        }
        </ul>
      </div>
    )
}

const mapStateToProps = ({products, user}) => ({products, user})

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick(evt){
      evt.preventDefault()
      dispatch(pushPurchase(evt.target.value))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products)
