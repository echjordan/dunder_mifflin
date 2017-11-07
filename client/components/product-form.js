import React from 'react'
import { connect } from 'react-redux'
import { postReview } from '../store'

$(document).ready(function () {
  Materialize.updateTextFields();
});


const ProductForm = (props) => {

  const {products, handleSubmit} = props
  const product = products.find(prod => {
    return prod.id === Number(props.match.params.productId)
  })
  return (
    //ADD ON CHANGE HANDLERS
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        Product Name:
        <input type="text" id="name" value={product.title} className="validate" />
      </div>
      <br />
      <div className="input-field">
        Product Description:
        <input type="text" id="description" value={product.description} className="validate" />
      </div>
      <br />

        Price:
        <input type="text" id="price" value={product.price} className="validate" />
        <br />
        Photos:
        <input type="text" id="photos" value={product.photos} className="validate" />
        <br />

        Quantity:
        <input type="text" id="quantity" value={product.quantity} className="validate" />
        <br />
        Availability:
        <select id="availability" value={product.avaialability}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <br />
        <button type="submit" >Update product</button>
    </form>
  )
}

const mapState = ({products}) => ({products})

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(pId, evt){
      evt.preventDafult()
      dispatch(postReview(pId,
      {
        title: evt.target.name.value,
        description: evt.target.description.value,
        price: evt.target.price.value,
        photos: evt.target.photos.value,
        quantity: evt.target.quantity.value,
        avaialability: evt.target.avaialability.value
      }))
    }
  }
}

export default connect(mapState, mapDispatch)(ProductForm)
