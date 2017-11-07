import React from 'react'
import { connect } from 'react-redux'
import {pushPurchase} from '../store'
import {Link} from 'react-router-dom'


const Products = (props) => {
    const products = props.products
    const handleClick = props.handleClick
    const user = props.user
    return (
      <div className="product-container">
          {
            user.id
              ? <div>
                {
                  user.name
                    ? <div>Welcome, {user.name}!</div>
                    : <div>Welcome, {user.email}!</div>
                }
              </div>
              :
              <div>Welcome!</div>
          }
        <div className="row">
          {
            products.sort((a, b) => a.id - b.id).map(product =>
              (
                <div className="col s12 m4" key={product.id}>
                  <div className="card small" >
                    <div className="card-image">
                      <img className="product-photos-1" src={product.photos[0]} />
                    <div className="card-title ">
                        <Link className="black-text bold" to={`products/${product.id}`}> {product.title} </Link>
                    </div>
                    </div>
                    {/*<img className="product-photos-2" src={product.photos[1]} />*/}
                    <div className="card-content">
                      <p>{product.description}</p>
                    </div>
                    <div className="card-action">
                      <a className="black-text" name={product.id} href="#" onClick={handleClick} value={product.id}>Add to cart</a>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    )
}

const mapStateToProps = ({products, user}) => ({products, user})

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick(evt){
      evt.preventDefault()
      dispatch(pushPurchase(evt.target.name))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products)
