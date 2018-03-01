import './ItemNav.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ItemNav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={this.props.cls}>
        <a href="#">{this.props.item.name}</a>
        {
          (this.props.children) ? <ul>{this.props.children}</ul> : null
        }
      </li>
    )
  }

}


export default ItemNav;