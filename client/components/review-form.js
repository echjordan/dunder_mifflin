import React from 'react'
import {connect} from 'react-redux'

const ReviewForm = () => {
  return (
    <div className="review-form-container">
      <form>
        Title: <br />
        <input type="text" />
        <br />
        Review: <br />
        <input type="text" />
      </form>
    </div>
  )
}

//ADD THIS DISPATCH ONCE A REDUCER IS CREATED -- CREATE REIVEW COMPONENT
const mapDispatch = (dispatch) => {
  return {
    handleClick(evt) {
      evt.preventDefault()
      dispatch(postReview(evt.target.value.content))
    }
  }
}

export default connect(null, mapDispatch)(ReviewForm)
