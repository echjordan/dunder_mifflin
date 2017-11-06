import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from 'material-ui/AppBar';

const Main = (props) => {
  const {children, handleClick, isLoggedIn, isAdmin} = props

  return (
    <div>
      <AppBar
        title="Dunder Mifflin Inc."
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        {
          isLoggedIn
            ? <div>
            {
              isAdmin &&
              <Link to="/admin">Admin </Link>
            }
              {/* The navbar will show these links after you log in */}
              <Link to="/">Shop </Link>
              <Link to="/userportal">My Account </Link>
              <a href="#" onClick={handleClick}>Logout </a>
              <Link to="/cart">Cart</Link>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/">Shop </Link>
              <Link to="/login">Login </Link>
              <Link to="/signup">Sign Up </Link>
              <Link to="/cart">Cart</Link>
            </div>
        }
        </ul>
        </AppBar>
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
