import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPurchases, destroyPurchase, editPurchase} from '../store/cart.js'
import {NavLink} from 'react-router-dom';

export class Cart extends Component{
  constructor(props) {
    super(props);
    this.qtyChange = this.qtyChange.bind(this);
    this.deleteClick = this.deleteClick.bind(this);

  }
  componentWillMount()  {
    this.props.fetchPurchases();
  }

  deleteClick (evt) {
    evt.preventDefault();
    this.props.destroyPurchase(evt.target.value)
  }
  qtyChange(evt)  {
    evt.preventDefault();
    let value;
    if (evt.target.value)  {value = 0;}
    else {value = evt.target.value }
    this.props.editPurchase(evt.target.name, evt.target.value)


  }
  render () {
    let cart = [];
    if (Array.isArray(this.props.cart.purchases)) {
      cart = this.props.cart.purchases
    }
    return (
      <div id="cart-page">
        <h2>Shopping Cart</h2>
        <div>
        <table>
          <thead>
              <tr className = "#3949ab indigo darken-1">
              <th>X</th>
              <th>Image</th>
              <th>Name</th>
              <th>quantity</th>
              <th>price</th>
              </tr>
          </thead>
              <tbody>
              {
                  cart.map((purchase, idx) => (
                    <tr key={purchase.title}>
                        <td > <button
                            className="waves-effect waves-light btn"
                            key={purchase.productId}
                            value = {idx}
                            onClick = {this.deleteClick}>
                            X
                            </button>
                        </td>
                        <td> <img
                            className = "cart-photo"
                            src={purchase.photo} />
                        </td>
                        <td> {purchase.title}
                        </td>
                        <td>
                          <form onChange = {this.qtyChange}> <label>
                          <input type="text" defaultValue = {purchase.quantity} name ={idx} />
                          </label></form>
                        </td>
                        <td> ${purchase.price}
                        </td>
                    </tr>
                  ))
              }
              </tbody>
          </table>
          <div className = "#3949ab indigo darken-1"><h5>Total:
            <span> ${this.props.cart.subTotal}.00</span></h5>
            </div>
            <button className="waves-effect waves-light btn-flat">
          <NavLink to="/checkout" >Checkout </NavLink></button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = ({cart}) => ({cart});
const mapDispatchToProps = {fetchPurchases, destroyPurchase, editPurchase};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
