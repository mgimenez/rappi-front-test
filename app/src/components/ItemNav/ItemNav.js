import './ItemNav.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ItemNav extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    this.props.categories.map((item, i) => {
        console.log(item);
        return <p>{item.name}</p>
      })
    }


}


export default ItemNav;
