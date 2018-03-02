import './Filters.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Filters extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orderBy: 'default',
      filterAvailable: false,
      filterMinPrice: '',
      filterMaxPrice: '',
      filterQuantity: ''
    }
  }

  changeValue(key, value) {
    this.setState({
      [key]: value
    }, () => {
      let {orderBy, filterAvailable, filterMinPrice, filterMaxPrice, filterQuantity} = this.state;
      this.props.getProductsFiltred(orderBy, filterAvailable, filterMinPrice, filterMaxPrice, filterQuantity);
    })

  }

  render() {
    return (
      <form className="filters">
        <h3 className="filters__title">Ordenar por</h3>
        <select className="filters__group" defaultValue={this.state.orderBy} onChange={(e) => this.changeValue('orderBy', e.target.value)}>
          <option value="default">Default</option>
          <option value="mayPrice">Mayor Precio</option>
          <option value="minPrice">Menor Precio</option>
          <option value="available">Disponibilidad</option>
          <option value="mayQuantity">Mayor Cantidad</option>
          <option value="minQuantity">Menor Cantidad</option>
        </select>
        <h3 className="filters__title">Filtrar por</h3>
        <ul className="filters__group">
          <li>
            <label htmlFor="available">Disponible</label>
            <input type="checkbox" id="available" defaultChecked={this.state.filterAvailable} onChange={(e) => this.changeValue('filterAvailable', e.target.checked)} />
          </li>
          <li className="filters__price">
            <label htmlFor="price">Precio:</label>
            <input type="text" id="price" placeholder="Min" defaultValue={this.state.filterMinPrice} onChange={(e) => this.changeValue('filterMinPrice', e.target.value)}/>
            <input type="text" placeholder="Max" defaultValue={this.state.filterMaxPrice} onChange={(e) => this.changeValue('filterMaxPrice', e.target.value)} />
          </li>
          <li className="filters__quantity">
            <label htmlFor="quantity">Cantidad:</label>
            <input type="text" id="quantity" defaultValue={this.state.filterQuantity} onChange={(e) => this.changeValue('filterQuantity', e.target.value)} />
          </li>
        </ul>
      </form>
    )
  }


}


export default Filters;