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
    })
  })

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
        expect(cody.admin).to.be.a('boolean')
      })

      it('includes `password` field', () => {
        expect(cody.password).to.be.a('string')
      })
    })
  })

  describe('validations', function () {
    it('errors without an email', function() {
      const user = User.build({
          name: 'Cody',
          email: '',
      });

      return user.save()
        .then(function () {
          throw Error('User.save() shoud have failed with a validation error');
        }, function (err) {
          const [first] = err.errors
          expect(first).to.have.property('path', 'email');
          expect(first).to.have.property('type', 'Validation error');
          expect(first.message).to.contain('email');
        })
      })
    })
  })
