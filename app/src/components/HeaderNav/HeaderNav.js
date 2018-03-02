import './HeaderNav.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ItemNav from '../ItemNav/ItemNav.js';

class HeaderNav extends Component {

  constructor(props) {
    super(props);
  }

  renderSubMenu(item) {
    if (item.sublevels) {
      return item.sublevels.map((item, index) => {
        return <ItemNav key={index} item={item} cls="sub-item" getProductsByCategory={this.props.getProductsByCategory}>
          {
            (item.sublevels) ? this.renderSubMenu(item.sublevels) : null
          }
          </ItemNav>
      })
    } else {
      return item.map((item, index) => {
        if (item.sublevels) {
          return <ItemNav key={index} item={item} cls="sub-item" getProductsByCategory={this.props.getProductsByCategory}>
            {
              this.renderSubMenu(item.sublevels)
            }
            </ItemNav>
        } else {

          return <ItemNav key={index} item={item} cls="sub-item" getProductsByCategory={this.props.getProductsByCategory} />
        }
      })
    }
  }

  render() {
    if (this.props.categories.length > 0) {
        return (
          <nav>
            <ul>
              {
                this.props.categories.map((item, index) => {
                  return <ItemNav key={index} item={item} cls="main-item" getProductsByCategory={this.props.getProductsByCategory}>
                    {
                      this.renderSubMenu(item)
                    }
                  </ItemNav>
                })

              }
            </ul>
            <a href="#" className="cart">Carrito ({this.props.cartLength})</a>
          </nav>
        )
    } else {
      return <p>Cargando categorias</p>
    }
  }


}


export default HeaderNav;