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
      <div>
        {
          this.props.products.map((item, index) => {
            return <ProductItem key={index} product={item} />
          })
        }
      </div>
    )
  }

}


export default ProductList;