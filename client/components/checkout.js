import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPurchases, postPurchase} from '../store/cart.js';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

export class Checkout extends Component{
  constructor(props)  {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);

  }
  componentWillMount()  {
    this.props.fetchPurchases();
  }
  componentDidMount() {
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
      <div id="checkout">
               <h2> Checkout </h2>
          <hr />
        <div id="order-field">
          <h4> Your Order </h4>
        <Table
        selectable={false}
        >
          <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
            enableSelectAll={false}
          >
              <TableRow>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              </TableRow>
          </TableHeader>
              <TableBody
              displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={false}
              >
              {
                  cart.map(purchase => (
                    <TableRow key={purchase.title}>
                        <TableRowColumn>{purchase.quantity}x</TableRowColumn>
                        <TableRowColumn> {purchase.title}</TableRowColumn>
                        <TableRowColumn> ${purchase.price}</TableRowColumn>
                    </TableRow>
                  ))
              }
              </TableBody>
        </Table>
          <div>Total:
            <span>  ${this.props.cart.subTotal}.00</span>
          </div>
        </div>
        <div id="info-field">
          <h3> Information </h3>
          <form onSubmit={this.submitHandler}>
                  <TextField
                    floatingLabelText="Email:"
                    name="email" />
                  <TextField
                    floatingLabelText="Address:"
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    name="address1" />
                    <br />
          <h3> Payment Method </h3>
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
      </div>
    )
  }

}

const mapStateToProps = ({cart}) => ({cart});
const mapDispatchToProps = {fetchPurchases, postPurchase};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);


