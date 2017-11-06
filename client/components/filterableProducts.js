import React, { Component } from 'react';
import FilterInput from './FilterInput';
import Products from './products';
import { connect } from 'react-redux'

export class FilterableProducts extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    const value = evt.target.value;
    this.setState({
      inputValue: value
    });
  }

  render () {
    const inputValue = this.state.inputValue;
    const filteredProducts = this.props.products.filter(product =>
      product.title.match(inputValue));

    return (
      <div>
        <FilterInput
          handleChange={this.handleChange}
          inputValue={inputValue}
        />
        <Products products={filteredProducts} />
      </div>
    );
  }
}

const mapStateToProps = ({products}) => ({products})

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(FilterableProducts)
