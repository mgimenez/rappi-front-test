import './ProductList.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProductItem from '../ProductItem/ProductItem.js';

class ProductList extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="product-list">
        <h3 className="product-list__title">Productos </h3>
        <div className="product-list__grid">
          {
            this.props.products.map((item, index) => {
              return <ProductItem key={index} product={item} addToCart={this.props.addToCart} />
            })
          }
        </div>
      </div>
    )
  }

}


export default ProductList;