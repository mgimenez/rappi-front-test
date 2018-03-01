import './ItemNav.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ItemNav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li>
          <a href="#">{this.props.item.name}</a>
          {this.props.children}
        </li>
      </ul>
    )
  }

}


export default ItemNav;