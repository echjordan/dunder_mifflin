import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPurchases, postPurchase} from '../store/cart.js';


export class Checkout extends Component{
  constructor(props)  {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);

  }
  componentWillMount()  {
    this.props.fetchPurchases();
  }
  componentDidMount() {
    $(document).ready(function() {
      $('select').material_select();
    });
  }
  submitHandler(evt)  {
    evt.preventDefault();
    let info = {
      email: evt.target.email.value,
      address: evt.target.address1.value,
      cardType: evt.target.cardType.value,
      cardNumber: evt.target.cardNumber.value,
      // cardMonth: evt.target.cardMonth.value,
      cardExpiration: evt.target.cardExpire.value,
      // cardYear: evt.target.cardYear.value,
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
      <div id="checkout">
          <h2> Checkout </h2>
          <hr />
          <div id="order-field">
            <h4> Your Order </h4>
          <table>
              <thead className = "#cfd8dc blue-grey lighten-4">
                  <tr>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Price</th>
                  </tr>
              </thead>
              <tbody>
              {
                  cart.map(purchase => (
                    purchase.quantity > 0 &&
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
            <span>  ${this.props.cart.subTotal}.00</span>
          </div>
      </div>
      <form onSubmit={this.submitHandler}>
         <div className="row">
          <span className="col s10 m5">
            <div className="card #3949ab indigo darken-1">
              <div className="card-content white-text">
                <div className="card-title">Information</div>
                <div className="row">
                  <span className="input-field col s4">
                    <input id="first_name" type="text" className="validate" />
                    <label>First Name</label>
                  </span>
                  <span className="input-field col s4">
                    <input id="last_name" type="text" className="validate" />
                    <label>Last Name</label>
                  </span>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                    <input name="email" id="email" type="email" className="validate" />
                    <label >Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s5 m5">
                    <input name="address1" id="address1" type="text" className="validate" />
                    <label >Address</label>
                    </div>
                </div>
              </div>
            </div>
          </span>
          <span className="col s9 m7">
            <div className="card #3949ab indigo darken-1">
              <div className="card-content white-text">
                  <div className="card-title">Payment</div>
                <div>
                  <div className="input-field col s5">
                    <select name="cardType">
                      <option value="" disabled selected>Card Type</option>
                      <option>Visa</option>
                      <option>MasterCard</option>
                      <option>CryptoCurrency</option>
                    </select>
                  </div>
                  <div className="input-field col s5">
                    <input id="cardNumber" name="cardNumber" type="text" className="validate" />
                    <label>Card Number</label>
                  </div>
                </div>
                <div className = "row">
                  <div className="input-field col s8">
                  <input id="cardExpire" name="cardExpire" type="text" className="validate" />
                    <label>Expiration Date </label>
                  </div>
                  <div className="input-field col s8">
                  <input id="cardVerification" name="cardVerification" type="text" className="validate" />
                    <label>Card Verification Number </label>
                  </div>
                </div>
                  <button className="waves-effect waves-light btn">Purchase</button>
              </div>
            </div>
          </span>
        </div>
      </form>
    </div>
    )
  }

}

const mapStateToProps = ({cart}) => ({cart});
const mapDispatchToProps = {fetchPurchases, postPurchase};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);


//Working through the card stuff

{/* <div class="row">
<div class="col s12 m6">
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <div class="card-title">Card Title</div>
    </div>
  </div>
</div>
</div> */}
