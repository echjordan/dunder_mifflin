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
    this.props.editPurchase(evt.target.name, evt.target.value)
  }
  render () {
    let cart = [];
    if (Array.isArray(this.props.cart.purchases)) {
      cart = this.props.cart.purchases
    }
    return (
      <div>
        ShoppingCart
        <div>
        <table>
          <thead>
              <tr>
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
                        <td> <button
                            key={purchase.productId}
                            value = {idx}
                            onClick = {this.deleteClick}>
                            X
                            </button>
                        </td>
                        {/* <td> <img src={purchase.photo} />
                        </td> */}
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
          <div>Total:
            <span> {this.props.cart.subTotal}</span>
            </div>
            <button>
          <NavLink to="/checkout" >Checkout </NavLink></button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = ({cart}) => ({cart});
const mapDispatchToProps = {fetchPurchases, destroyPurchase, editPurchase};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);