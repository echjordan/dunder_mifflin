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
      <div>
        <h1>{product.title}</h1>
        <div className="product-image-container">
        <img className="product-images-1" src={product.photos[0]} />
        </div>
        <div className="product-image-container">
        <img className="product-images-2" src={product.photos[1]} />
        </div>
        <ul>
          <li>${product.price}</li>
          <li>{product.description}</li>
        </ul>
        <button className="products-add" onClick={handleClick} value={product.id} >
          +
                </button>
        <ul>
          CATEGORIES:
          {
            product.categories.map(category => <li key={category.id}>{category.name}</li>)
          }
        </ul>
        <ul>
          REVIEWS: <br />
          <Link to={`/${product.id}/new-review`}>
          <button className="add-review-btn" > Post a review </button>
          </Link>
          {
            product.reviews.map(review => <li key={review.id}>{review.title}, {review.content}  STARS: {produceStars(review.stars)}</li>)
          }
        </ul>
      </div>
    )
}

const mapState = ({products}) => ({products})

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick(evt) {
      evt.preventDefault()
      dispatch(pushPurchase(evt.target.value))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(SingleProduct)
