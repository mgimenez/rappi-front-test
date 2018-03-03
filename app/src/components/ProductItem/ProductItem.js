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
        <h4 className="product-name">{this.props.product.name}</h4>
        <p className="product-quantity">Quantity: {this.props.product.quantity} {this.props.context !== 'list' ? <span><button className="btn-add-remove" onClick={() => this.props.addToCart(this.props.product)}>+1</button><button className="btn-add-remove" onClick={() => this.props.removeToCart(this.props.product)}>-1</button></span> : null}</p>
        <p className="product-price">Price: {this.props.product.price}</p>
        <p className="product-available">{this.props.product.available ? 'Disponible' : 'No Disponible'}</p>
        {this.props.context === 'list' ? <a href="#" onClick={() => this.props.addToCart(this.props.product)}>Agregar al carrito</a> : <a href="#" onClick={() => this.props.removeToCart(this.props.product, true)}>Eliminar</a> }
      </li>
    )
  }

}


export default ProductItem;