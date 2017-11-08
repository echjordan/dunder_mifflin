import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow, mount } from 'enzyme';
import { Products } from '../components';
//import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import store from '../store'
enzyme.configure({ adapter: new Adapter() });

global.window = {}
import localStorage from 'mock-local-storage'
window.localStorage = global.localStorage

// describe('React Tests', () => {
//   describe('Products', () => {
//     it('renders the name prop in a div', () => {
//       // create shallow wrapper of the component and pass down some name prop
//       // use a shallow wrapper method to find the h1
//       // assert that the h1 has the right inner text
//       //let Bob = {name: 'Bob', email: 'bob@email.com'}
//       let products = [{title: 'Test Paper', description: 'For testing', photos: ['http://via.placeholder.com/350x350', 'http://via.placeholder.com/350x350'], price: 10, quantity: 500, available: true}]
//       let wrapper = shallow(<Products products={products} />)

//        let link = wrapper.find('Link')
//        expect(link.text()).to.be.equal('Test Paper');
//     })
//   })
// })
const products = [{title: 'Test Paper', description: 'For testing', photos: ['http://via.placeholder.com/350x350', 'http://via.placeholder.com/350x350'], price: 10, quantity: 500, available: true}]
    const props = {products, user: {name: 'Cody', email: 'cody@email.com'}}

const wrapper = shallow(<Products store={store} {...props} />)

describe('Products', () => {
  it('renders successfully', () => {
    expect(wrapper).to.have.length(1);
  });
});

describe('Products', () => {
  it('should find div', () => {
    expect(wrapper.find('.card-title')).to.have.length(1)
  })
  it('should display products', () => {
    // This is where we create a mock state/props


    //const wrapper = shallow(<Products {...props} />)

    const div = wrapper.find('.card-title').childAt(0)
    console.log("div====>", div)

    expect(div.text()).to.be.equal('Paper')
  })
})
