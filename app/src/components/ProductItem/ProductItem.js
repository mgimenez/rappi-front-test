import './ProductItem.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ProductItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="product-item">
        <p className="product-name">Name: {this.props.product.name}</p>
        <p className="product-quantity">Quantity: {this.props.product.quantity}</p>
        <p className="product-price">Price: {this.props.product.price}</p>
        <p className="product-available">Available: {this.props.product.available ? 'si' : 'no'}</p>
      </li>
    )
  }

}


export default ProductItem;