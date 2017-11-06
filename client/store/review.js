import axios from 'axios'

export default function reducer(reviews = [], action){
  switch (action.type){
    case POST_REVIEW:
      return [...reviews, action.review]
    default:
      return reviews
  }
}
