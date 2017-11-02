import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { fetchSingleProduct } from '../store/singleProduct'

const SingleProduct = (props) => {
    const products = props.products
    const product = products.find(prod => {
      return prod.id === Number(props.match.params.productId)
    })
        console.log(product)

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
          {/*<li>{product.reviews}</li>*/}

        </ul>
        <ul>
          CATEGORIES:
          {
            product.categories.map(category => <li key={category.id}>{category.name}</li>)
          }
        </ul>
        <ul>
          REVIEWS:
          {
            product.reviews.map(review => <li key={review.id}>{review.title}, {review.content}  STARS: {review.stars}</li>)
          }
        </ul>
      </div>
    )
}

const mapState = ({products}) => ({products})

export default connect(mapState)(SingleProduct)
