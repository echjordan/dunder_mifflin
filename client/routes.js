import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, Signup, Products, Admin, UserPortal, Checkout, Cart, SingleProduct, ReviewForm, FilterableProducts, FilterInput, ProductForm} from './components'
import {me, fetchProducts} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/github" component={() => window.location = 'https://github.com/echjordan/dunder_mifflin'} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Products} />
            <Route exact path="/products/:productId" component={SingleProduct} />
            <Route path="/new-review" component={ReviewForm} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  {/*<Route path="/" component={UserHome} />*/}
                  <Route path="/userportal" component={UserPortal} />
                  <Route path="/:productId/new-review" component={ReviewForm} />
                  {
                    isAdmin &&
                  <Switch>

                    <Route path="/admin" component={Admin} />
                    <Route exact path="/:productId/edit-product" component={ProductForm} />
                  </Switch>

                  }
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined as having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
