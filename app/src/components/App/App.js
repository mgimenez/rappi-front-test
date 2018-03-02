import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import HeaderNav from '../HeaderNav/HeaderNav';
import ProductList from '../ProductList/ProductList';
import Filters from '../Filters/Filters';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      products: [],
      productList: [],
    }

    this.getProductsByCategory = this.getProductsByCategory.bind(this);
    this.getProductsFiltred = this.getProductsFiltred.bind(this);
  }

  componentWillMount() {

    fetch('http://localhost:3000/categories')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({ categories: data.categories })
      })

    fetch('http://localhost:3000/products')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({ products: data.products })
        this.setState({ productList: data.products })
      })
  }


  getProductsByCategory(item) {
    var filtred = [];
    this.state.products.filter((product) => {
      if (item.id === product.sublevel_id) filtred.push(product);
    })

    this.setState({
      productList: filtred
    })
  }

  getProductsFiltred(orderBy, filterAvailable, filterMinPrice, filterMaxPrice, filterQuantity) {
    let filtred = [];

    if (filterAvailable) {
      var filtredAvailable = [];
      this.state.products.filter((product) => {
        (filterAvailable === product.available) ? filtredAvailable.push(product) : null;
      })
      filtred = filtredAvailable;
    } else {
      filtred = this.state.products;
    }

    if(filterMinPrice) {
      var filtredMinPrice = [];
      filtred.filter((product) => {
        let price = parseFloat(product.price.replace( /^\D+/g, '').replace(',', '.')),
            minPrice = filterMinPrice.replace(',', '.');

        (price > minPrice) ? filtredMinPrice.push(product) : null;
      })
      filtred = filtredMinPrice;
    }

    if(filterMaxPrice) {
      var filtredMaxPrice = [];
      filtred.filter((product) => {
        let price = parseFloat(product.price.replace( /^\D+/g, '').replace(',', '.')),
            maxPrice = filterMaxPrice.replace(',', '.');

        (price < maxPrice) ? filtredMaxPrice.push(product) : null;
      })
      filtred = filtredMaxPrice;
    }

    if(filterQuantity) {
      var filtredQuantity = [];
      filtred.filter((product) => {
        (product.quantity >= parseInt(filterQuantity)) ? filtredQuantity.push(product) : null;
      })
      filtred = filtredQuantity;
    }

    if(orderBy !== 'default') {
      let ordered = [];
      if (orderBy === 'minPrice') {
        let orderedMinPrice = [];
        orderedMinPrice = filtred.sort(function(a, b) {
          return parseFloat(a.price.replace( /^\D+/g, '').replace(',', '.')) - parseFloat(b.price.replace( /^\D+/g, '').replace(',', '.'));
        });
        ordered = orderedMinPrice;
      }

      if (orderBy === 'mayPrice') {
        let orderedMaxPrice = [];
        orderedMaxPrice = filtred.sort(function(a, b) {
          return parseFloat(b.price.replace( /^\D+/g, '').replace(',', '.') - parseFloat(a.price.replace( /^\D+/g, '').replace(',', '.')));
        });
        ordered = orderedMaxPrice;
      }

      if (orderBy === 'minQuantity') {
        let orderedMinQuantity = [];
        orderedMinQuantity = filtred.sort(function(a, b) {
          return parseFloat(a.quantity - b.quantity);
        });
        ordered = orderedMinQuantity;
      }

      if (orderBy === 'mayQuantity') {
        let orderedMayQuantity = [];
        orderedMayQuantity = filtred.sort(function(a, b) {
          return parseFloat(b.quantity - a.quantity);
        });
        ordered = orderedMayQuantity;
      }

      if (orderBy === 'available') {
        let orderedAvailable = [];
        orderedAvailable = filtred.sort(function(a, b) {
          return parseFloat(b.available - a.available);
        });
        ordered = orderedAvailable;
      }

      filtred = ordered;
    }

    this.setState({
      productList: filtred
    })
  }


  render() {
    return (
      <div>
        <HeaderNav categories={this.state.categories} getProductsByCategory={this.getProductsByCategory} />
        <main className="main-container">
          <Filters getProductsFiltred={this.getProductsFiltred} />
          <ProductList products={this.state.productList} />
        </main>
      </div>
    )
  }
}


export default App;