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

  renderSubMenu(item) {
    if (item.sublevels) {
      return item.sublevels.map((item, index) => {
        return <ItemNav key={index} item={item}>
          {
            (item.sublevels) ? this.renderSubMenu(item.sublevels) : null
          }
          </ItemNav>
      })
    } else {
      return item.map((item, index) => {
        if (item.sublevels) {
          return <ItemNav key={index} item={item}>
            {
              this.renderSubMenu(item.sublevels)
            }
            </ItemNav>
        } else {

          return <ItemNav key={index} item={item} />
        }
      })
    }
  }

  render() {
    if (this.state.categories.length > 0) {
        return (
          <header>
            {
              this.state.categories.map((item, index) => {
                return <ItemNav key={index} item={item}>
                  {
                    this.renderSubMenu(item)
                  }
                </ItemNav>
              })
            }
          </header>
        )
    } else {
      return <p>Cargando categorias</p>
    }
  }


}


export default HeaderNav;