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
            {
              this.state.categories.map((item, index) => {
                return <ItemNav key={index} item={item}>
                  {
                    (item.sublevels) ? item.sublevels.map((item, index) => {
                      return <ItemNav key={index} item={item}>
                        {
                          (item.sublevels) ? item.sublevels.map((item, index)=>{
                            return <ItemNav key={index} item={item}/>
                          }) : null
                        }
                      </ItemNav>
                    })  : null
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