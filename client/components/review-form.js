import React from 'react'
import {connect} from 'react-redux'
import {postReview} from '../store'

const ReviewForm = (props) => {
  const {handleSubmit} = props
  const pId = Number(props.match.params.productId)
  return (
    <div className="review-form-container">
      <form onSubmit={handleSubmit.bind(this, pId)}>
        Title: <br />
        <input type="text" id="title" className="review-title" />
        <br />
        Review: <br />
        <textarea type="text" id="content" className="reveiw-content" />
        <br />
        Stars: <br />
        <select id="stars" className="browser-default">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <button type="submit" >Submit review</button>
      </form>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(pId, evt) {
      evt.preventDefault()
      dispatch(postReview(pId,
        {title: evt.target.title.value,
        content: evt.target.content.value,
        stars: evt.target.stars.value
      }))
    }
  }
}

export default connect(null, mapDispatch)(ReviewForm)
