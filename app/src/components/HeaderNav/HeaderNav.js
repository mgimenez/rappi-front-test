import './HeaderNav.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ItemNav from '../ItemNav/ItemNav.js';

class HeaderNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: []
    }
  }

  componentWillMount() {
    fetch('http://localhost:3000/categories')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({ categories: data.categories })
      })
  }

  render() {
    if (this.state.categories.length > 0) {
        return (
          <header>
            <ItemNav categories={this.state.categories} />
          </header>
        )
    } else {
      return <p>Cargando categorias</p>
    }
  }


}


export default HeaderNav;
