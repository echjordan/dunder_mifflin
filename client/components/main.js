import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

const Main = (props) => {
  const {children, handleClick, isLoggedIn, isAdmin} = props

return (
  <div>
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper #3949ab indigo darken-1">
        <Link to="/" className="brand-logo padding">Dunder Mifflin Inc.</Link>
        <Link to="/" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
        <ul className="right hide-on-med-and-down">
        {
          isLoggedIn
            ? <div>
            {
              isAdmin &&
              <li className="active"><Link to="/admin">Admin</Link></li>
            }
              {/* The navbar will show these links after you log in */}
              <li className="active"><Link to="/">Shop</Link></li>
              <li className="active"><Link to="/userportal">My Account</Link></li>
              <li className="active"><a href="#" onClick={handleClick}>Logout</a></li>
              <li className="active"><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <li className="active"><Link to="/">Shop</Link></li>
              <li className="active"><Link to="/login">Login</Link></li>
              <li className="active"><Link to="/signup">Sign Up</Link></li>
              <li className="active"><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
            </div>
        }
        </ul>
        </div>
        </nav>
      </div>
        <ul className="side-nav" id="mobile-demo">
        {
          isLoggedIn
            ? <div>
            {
              isAdmin &&
              <li className="active"><Link to="/admin">Admin</Link></li>
            }
              {/* The navbar will show these links after you log in */}
              <li className="active"><Link to="/">Shop</Link></li>
              <li className="active"><Link to="/userportal">My Account</Link></li>
              <li className="active"><a href="#" onClick={handleClick}>Logout</a></li>
              <li className="active"><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <li className="active"><Link to="/">Shop</Link></li>
              <li className="active"><Link to="/login">Login</Link></li>
              <li className="active"><Link to="/signup">Sign Up</Link></li>
              <li className="active"><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
            </div>
        }
        </ul>

      {children}

      <footer className="footer #cfd8dc blue-grey lighten-4 valign-wrapper justify-between">
      <div className="social">
        <div className="category">
          <Link to="https://www.facebook.com/" target="_blank"><img src="social-fb.png" /></Link>
        </div>
        <div className="category">
          <Link to="https://www.instagram.com/" target="_blank"><img src="social-insta.png" /></Link>
        </div>
        <div className="category">
          <Link to="https://www.twitter.com/" target="_blank"><img src="social-twit.png" /></Link>
        </div>
      </div>
        <div className="category">
            <h6 className=" white-text">
              Layla Hedges, Evlis Henry, Emily Jordan, April Rueb
            </h6>
        </div>
      </footer>
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
