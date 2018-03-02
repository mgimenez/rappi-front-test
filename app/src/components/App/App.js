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
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      cartLength: localStorage.getItem('cartLength') || 0
    }

    this.getProductsByCategory = this.getProductsByCategory.bind(this);
    this.getProductsFiltered = this.getProductsFiltered.bind(this);
    this.addToCart = this.addToCart.bind(this);
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
    var filtered = [];
    this.state.products.filter((product) => {
      if (item.id === product.sublevel_id) filtered.push(product);
    })

    this.setState({
      productList: filtered
    })
  }

  getProductsFiltered(orderBy, filterAvailable, filterMinPrice, filterMaxPrice, filterQuantity) {
    let filtered = [];

    if (filterAvailable) {
      var filteredAvailable = [];
      this.state.products.filter((product) => {
        (filterAvailable === product.available) ? filteredAvailable.push(product) : null;
      })
      filtered = filteredAvailable;
    } else {
      filtered = this.state.products;
    }

    if(filterMinPrice) {
      var filteredMinPrice = [];
      filtered.filter((product) => {
        let price = parseFloat(product.price.replace( /^\D+/g, '').replace(',', '.')),
            minPrice = filterMinPrice.replace(',', '.');

        (price > minPrice) ? filteredMinPrice.push(product) : null;
      })
      filtered = filteredMinPrice;
    }

    if(filterMaxPrice) {
      var filteredMaxPrice = [];
      filtered.filter((product) => {
        let price = parseFloat(product.price.replace( /^\D+/g, '').replace(',', '.')),
            maxPrice = filterMaxPrice.replace(',', '.');

        (price < maxPrice) ? filteredMaxPrice.push(product) : null;
      })
      filtered = filteredMaxPrice;
    }

    if(filterQuantity) {
      var filteredQuantity = [];
      filtered.filter((product) => {
        (product.quantity >= parseInt(filterQuantity)) ? filteredQuantity.push(product) : null;
      })
      filtered = filteredQuantity;
    }

    if(orderBy !== 'default') {
      let ordered = [];
      if (orderBy === 'minPrice') {
        let orderedMinPrice = [];
        orderedMinPrice = filtered.sort(function(a, b) {
          return parseFloat(a.price.replace( /^\D+/g, '').replace(',', '.')) - parseFloat(b.price.replace( /^\D+/g, '').replace(',', '.'));
        });
        ordered = orderedMinPrice;
      }

      if (orderBy === 'mayPrice') {
        let orderedMaxPrice = [];
        orderedMaxPrice = filtered.sort(function(a, b) {
          return parseFloat(b.price.replace( /^\D+/g, '').replace(',', '.') - parseFloat(a.price.replace( /^\D+/g, '').replace(',', '.')));
        });
        ordered = orderedMaxPrice;
      }

      if (orderBy === 'minQuantity') {
        let orderedMinQuantity = [];
        orderedMinQuantity = filtered.sort(function(a, b) {
          return parseFloat(a.quantity - b.quantity);
        });
        ordered = orderedMinQuantity;
      }

      if (orderBy === 'mayQuantity') {
        let orderedMayQuantity = [];
        orderedMayQuantity = filtered.sort(function(a, b) {
          return parseFloat(b.quantity - a.quantity);
        });
        ordered = orderedMayQuantity;
      }

      if (orderBy === 'available') {
        let orderedAvailable = [];
        orderedAvailable = filtered.sort(function(a, b) {
          return parseFloat(b.available - a.available);
        });
        ordered = orderedAvailable;
      }

      filtered = ordered;
    }

    this.setState({
      productList: filtered
    })
  }

  addToCart(prod) {

    let exist = false;

    this.state.productList.find((item) => {
      if (prod.id === item.id) {
        item.quantity = item.quantity - 1;
      }
    })

    this.state.cart.find((item) => {
      if (prod.id === item.id) {
        item.quantity = item.quantity + 1;
        exist = true;
        this.state.cartLength ++;
      }
    })

    if (!exist) {
      this.state.cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        available: prod.available,
        quantity: 1
      });
      this.state.cartLength ++;
    }

    this.setState({
      productList: this.state.productList,
      cart: this.state.cart,
      cartLength: this.state.cartLength
    })

    localStorage.setItem('cart', JSON.stringify(this.state.cart));
    localStorage.setItem('cartLength', this.state.cartLength);


  }


  render() {
    return (
      <div className="container">
        <HeaderNav categories={this.state.categories} getProductsByCategory={this.getProductsByCategory} cartLength={this.state.cartLength} />
        <main className="main-container">
          <Filters getProductsFiltered={this.getProductsFiltered} />
          <ProductList products={this.state.productList} addToCart={this.addToCart} />
        </main>
      </div>
    )
  }
}


export default App;