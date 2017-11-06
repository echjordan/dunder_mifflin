/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('checking the schema', () => {
    describe('fields', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          name: 'Cody',
          admin: true,
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('includes `email` field', () => {
        expect(cody.email).to.equal('cody@puppybook.com')
      })

      it('includes `name` field', () => {
        expect(cody.name).to.equal('Cody')
      })

      it('includes `admin` field', () => {
        expect(cody.admin).to.equal(true)
      })

      it('`admin` field is a boolean', () => {
        expect(typeof cody.admin).to.equal('boolean')
      })

      it('includes `password` field', () => {
        expect(typeof cody.password).to.equal('string')
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
