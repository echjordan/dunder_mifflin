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
          <h1>{product.title}</h1>
          <div className="product-image-container">
            <img className="product-images-1" src={product.photos[0]} />
          </div>
          <div className="product-image-container">
            <img className="product-images-2" src={product.photos[1]} />
          </div>
          <p>${product.price}</p>
          <a className="btn-floating btn-large waves-effect waves-light red" onClick={handleClick} value={product.id}><i className="material-icons">+</i></a>
        </div>
        <div className="card-tabs">
          <ul className="tabs tabs-fixed-width">
            <li className="tab"><a href="#test4">
              Description
            </a></li>
            <li className="tab"><a className="active" href="#test5">Test 2</a></li>
            <li className="tab"><a href="#test6">Test 3</a></li>
          </ul>
        </div>
        <div className="card-content grey lighten-4">
          <div id="test4">
            {product.description}
            Categories:
            {
            product.categories.map(category => <li key={category.id}>{category.name}</li>)
          }
          </div>
          <div id="test6">Test 3</div>
        </div>
      </div>
        // <ul>
        //   CATEGORIES:
        //
        // </ul>
        // <ul>
        //   REVIEWS: <br />
        //   <Link to={`/${product.id}/new-review`}>
        //   <button className="add-review-btn" > Post a review </button>
        //   </Link>
        //   {
        //     product.reviews.map(review => <li key={review.id}>{review.title}, {review.content}  STARS: {produceStars(review.stars)}</li>)
        //   }
        // </ul>

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
