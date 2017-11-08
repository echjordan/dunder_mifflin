// import { expect } from 'chai';
// import React from 'react';
// import enzyme, { shallow } from 'enzyme';
// import { MyComponent, MyForm } from './components';
// import sinon from 'sinon';
// import Adapter from 'enzyme-adapter-react-16';
// enzyme.configure({ adapter: new Adapter() });

// describe('Admin', () => {
//     describe('handleSubmit method', () => {
//       it('creates a new product', () => {
//         // make a wrapper
//         let wrapper = shallow(<Admin />)
//         // get the underlying instance
//         let instance = wrapper.instance();
//         // spy on console.log
//         sinon.spy(console, "log")

//         // call the instance's handleSubmit method
//         instance.handleSubmit({ target: { name: "name", value: "test" } })
//         expect(console.log.calledOnce).to.equal(true);
//         expect(console.log.calledWith("test")).to.equal(true);
//       })

//       it('is a registered callback for submit events', () => {
//         sinon.spy(MyForm.prototype, "handleSubmit");
//         let wrapper = shallow(<MyForm />)
//         // find the rendered form and simulate "submit"
//         wrapper.find('form').simulate('submit', { target: { name: "name", value: "test" } });
//         expect(MyForm.prototype.handleSubmit.calledOnce).to.equal(true);
//       })
//     })
//   })
// })
