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

    this.filterProducts = this.filterProducts.bind(this);
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


  filterProducts(item) {
    var filtred = [];
    this.state.products.filter((product) => {
      if (item.id === product.sublevel_id) filtred.push(product);
    })

    this.setState({
      productList: filtred
    })
  }

  render() {
    return (
      <div>
        <HeaderNav categories={this.state.categories} filterProducts={this.filterProducts} />
        <main className="main-container">
          <Filters />
          <ProductList products={this.state.productList} />
        </main>
      </div>
    )
  }
}


export default App;