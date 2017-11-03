import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPurchases, postPurchase} from '../store/cart.js'

export class Checkout extends Component{
  constructor(props)  {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);

  }
  componentWillMount()  {
    this.props.fetchPurchases();
  }
  submitHandler(evt)  {
    evt.preventDefault();
    let info = {
      email: evt.target.email.value,
      address: evt.target.address1.value + evt.target.address2.value,
      cardType: evt.target.cardType.value,
      cardNumber: evt.target.cardNumber.value,
      cardMonth: evt.target.cardMonth.value,
      cardYear: evt.target.cardYear.value,
      cardVerification: evt.target.cardVerification.value,
    }
    this.props.postPurchase(info);
  }

  render () {
    let cart = [];
    if (Array.isArray(this.props.cart.purchases)) {
      cart = this.props.cart.purchases
    }
    return (
      <div>
        Checkout
        <div> Information
          <form onSubmit={this.submitHandler}>
              <label> Email:
                  <input
                    name="email" />
              </label>
              <label> Address:
                  <input
                    name="address1" />
                  <input
                    name="address2" />
              </label>
          Payment Method
            <label> Card Type:
                <select
                  name="cardType">
                  <option>Paper</option>
                  <option>Visa</option>
                  <option>MasterCard</option>
                  <option>CryptoCurrency</option>
                </select>
            </label>
            <label> Card Number
                <input
                  name="cardNumber" />
            </label>
            <label> Expiration Date
            <select
              name="cardMonth"
              >
                  <option>Month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
              </select>
              <span> year
                <input
                  name="cardYear" />
            </span>
            </label>
            <label> Card Verification Number
                <input
                  name="cardVerification" />
            </label>
            <button>Purchase</button>
          </form>
        </div>
        <div> Your Order
        <table>
          <thead>
              <tr>
              <th>Name</th>
              <th>quantity</th>
              <th>price</th>
              </tr>
          </thead>
              <tbody>
              {
                  cart.map(purchase => (
                    <tr key={purchase.title}>
                        <td>{purchase.quantity}x</td>
                        <td> {purchase.title}</td>
                        <td> ${purchase.price}</td>
                    </tr>
                  ))
              }
              </tbody>
          </table>
          <div>Total:
            <span> ${this.props.cart.subTotal}</span>
            </div>
          </div>
      </div>
    )
  }

}

const mapStateToProps = ({cart}) => ({cart});
const mapDispatchToProps = {fetchPurchases, postPurchase};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);


