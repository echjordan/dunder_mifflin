/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserPortal} from './userPortal'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserPortal', () => {
  let userPortal

  beforeEach(() => {
    userPortal = shallow(<UserPortal email={'cody@email.com'} />)
  })

  xit('renders the email in an h3', () => {
    expect(userPortal.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
