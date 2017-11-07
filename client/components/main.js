import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
//import AppBar from 'material-ui/AppBar';

const Main = (props) => {
  const {children, handleClick, isLoggedIn, isAdmin} = props

//   return (
//     <div>
//       <AppBar
//         title="Dunder Mifflin Inc."
//         iconClassNameRight="muidocs-icon-navigation-expand-more"
//         >
//         <ul id="nav-mobile" className="right hide-on-med-and-down">
//         {
//           isLoggedIn
//             ? <div>
//             {
//               isAdmin &&
//               <Link to="/admin">Admin </Link>
//             }
//               {/* The navbar will show these links after you log in */}
//               <Link to="/">Shop </Link>
//               <Link to="/userportal">My Account </Link>
//               <a href="#" onClick={handleClick}>Logout </a>
//               <Link to="/cart">Cart</Link>
//             </div>
//             : <div>
//               {/* The navbar will show these links before you log in */}
//               <Link to="/">Shop </Link>
//               <Link to="/login">Login </Link>
//               <Link to="/signup">Sign Up </Link>
//               <Link to="/cart">Cart</Link>
//             </div>
//         }
//         </ul>
//         </AppBar>
//       {children}
//     </div>
//   )
// }

return (
  <div>
    <nav>
    <div className="#3949ab indigo darken-1 nav-wrapper">
      <a href="/" className="brand-logo padding">Dunder Mifflin Inc.</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {
        isLoggedIn
          ? <div>
          {
            isAdmin &&
            <li><Link to="/admin">Admin</Link></li>
          }
            {/* The navbar will show these links after you log in */}
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/userportal">My Account</Link></li>
            <li><a href="#" onClick={handleClick}>Logout</a></li>
            <li><Link to="/cart">Cart</Link></li>
          </div>
          : <div>
            {/* The navbar will show these links before you log in */}
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </div>
      }
      </ul>
    </div>
    </nav>
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
