import React from 'react'
import { connect } from 'react-redux'
import {pushPurchase} from '../store'
import {Link} from 'react-router-dom'
import { GridList, GridTile } from 'material-ui/GridList';


const Products = (props) => {
    const products = props.products
    const handleClick = props.handleClick
    const user = props.user
    return (
      <div className = "product-container" >
        <ul className = "product-list">
        <div className = "greeting">
        {
          user.id
        ? <div>{
          user.name
          ? <div>Welcome, {user.name}!</div>
          : <div>Welcome, {user.email}!</div>
        }</div>
        :
        <div>Welcome!</div>
      }
      </div>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
        {products.map(product =>
            (<GridTile
                key={product.id}
                title={product.title}
                subtitle={product.description}
              >
                <Link to={`products/${product.id}`}> { product.title } </Link>
                 <img className="product-photos-1" src={product.photos[0]} /> <img className="product-photos-2" src={product.photos[1]} />
                <button className="products-add" onClick={handleClick} value={product.id} >
                +
                </button>
            </GridTile>)
          )
        }
        </GridList>
      </div>
    )
}

const mapStateToProps = ({products, user}) => ({products, user})

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick(evt){
      evt.preventDefault()
      dispatch(pushPurchase(evt.target.value))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products)
