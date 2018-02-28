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
    return (
      <div>
        {
          this.props.categories.map((item, i) => {
            console.log('-', item.name);
            if(item.sublevels.length > 0) {
              item.sublevels.map((subitem, j) => {
                console.log(subitem.name);
              })
            }
            return (
              <p key={item.id}>{item.name}</p>
            )
          })
        }
      </div>
    )
  }

}


export default ItemNav;
