import React from 'react'
import { connect } from 'react-redux'
import { changeProduct } from '../store'

const ProductForm = (props) => {

  const {products, handleSubmit} = props
  const product = products.find(prod => {
    return prod.id === Number(props.match.params.productId)
  })
  const pId = Number(props.match.params.productId)
  return (
    <form onSubmit={handleSubmit.bind(this, pId)}>
        Product Name:
        <input type="text" id="name" defaultValue={product.title} className="validate" />
      <br />
      Product Description:
      <input type="text" id="description" defaultValue={product.description} className="validate" />
      <br />

        Price:
        <input type="text" id="price" defaultValue={product.price} className="validate" />
        <br />
        Photos:
        <input type="text" id="photos" defaultValue={product.photos[0] + ", " + product.photos[1]} className="validate" />
        <br />
        Quantity:
        <input type="text" id="quantity" defaultValue={product.quantity} className="validate" />
        <br />
        Categories:
        <input type="text" id="categories" placeholder= "Separated by commas" defaultValue={product.categories} className="validate" />
        <br />
       Available:
        <select className="browser-default" id="availability" defaultValue={product.availability}>
         <option value="true" >Yes</option>
         <option value="false" >No</option>
       </select>
        <button type="submit" >Update product</button>
        <br />
    </form>
  )
}

const mapState = ({products}) => ({products})

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(pId, evt){
      evt.preventDefault()
      dispatch(changeProduct(pId,
      {
        title: evt.target.name.value,
        description: evt.target.description.value,
        price: Number(evt.target.price.value),
        photos: evt.target.photos.value.split(', '),
        quantity: Number(evt.target.quantity.value),
        available: !!evt.target.availability.value,
        categories: evt.target.categories.value.split(',')
      }))
    }
  }
}

export default connect(mapState, mapDispatch)(ProductForm)
