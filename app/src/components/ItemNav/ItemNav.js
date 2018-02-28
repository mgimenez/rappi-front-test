import './ItemNav.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ItemNav extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  // menu() {
  //   let itemNav = [], str = '';
  //   return this.props.categories.map((item, i) => {
  //     str += `<p>${item.name}`;
  //     item.sublevels.forEach((subitem, j) => {
  //       str += `<p>${subitem.name}`;
  //       subitem.sublevels.forEach((subitem2, k) => {
  //         str += `<p>${subitem2.name}</p>`;
  //       })
  //       str+= '</p>';
  //     })
  //
  //     str+= '</p>';
  //     return str;
  //   });
  //
  // }

  render() {
    let item, subitem;
    return (
      <p>
      {this.props.item.name}
      {
        this.props.children
        }
      </p>
    )
  }

}


export default ItemNav;