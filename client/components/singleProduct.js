import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {pushPurchase} from '../store'

const SingleProduct = (props) => {
    const {products, handleClick} = props
    const product = products.find(prod => {
      return prod.id === Number(props.match.params.productId)
    })
    const produceStars = (numStars) => {
      let stars = ''
      for (let i = 0; i < numStars; i++) {
        stars += '⭐️ '
      }
      return stars
    }
    return (

      <div className="card">
        <div className="card-content">
          <h3>{product.title}</h3>
          <div className="row">
          <img src={product.photos[0]} />
          <img src={product.photos[1]} />
          </div>
          <div className="buy">
          <h3>${product.price}</h3>
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={handleClick} name={product.id}>+</a>
          </div>
        </div>
        <div className="card-tabs">
          <ul className="tabs tabs-fixed-width">
            <li className="tab"><a className="active" href="#description">
              Description
            </a></li>
            <li className="tab"><a href="#reviews">
               Reviews
            </a></li>
          </ul>
        </div>
        <div className="card-content grey lighten-4">
          <div id="description">
            {product.description}
            <br />
            { product.categories.map(category => (
              <div key={category.id} className="chip">
                {category.name}
              </div>
              )
            )}
          </div>
          <div id="reviews">
          {
            product.reviews.map(review => (<li key={review.id}>
              {review.title}, {review.content} STARS: {produceStars(review.stars)}
              </li>))
            }
          <br />
          <br />

          <Link to={`/${product.id}/new-review`}>
            <a className="waves-effect waves-light btn">Add a review</a>
          </Link>
          </div>
        </div>
      </div>
    )
}

const mapState = ({products}) => ({products})

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick(evt) {
      evt.preventDefault()
      dispatch(pushPurchase(evt.target.name))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(SingleProduct)
