import './Filters.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Filters extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <form className="filters">
        <h3 className="filters__title">Ordenar por</h3>
        <select className="filters__group">
          <option>Default</option>
          <option>Mayor Precio</option>
          <option>Menor Precio</option>
          <option>Disponibilidad</option>
          <option>Mayor Cantidad</option>
          <option>Menor Cantidad</option>
        </select>
        <h3 className="filters__title">Filtrar por</h3>
        <ul className="filters__group">
          <li>
            <label htmlFor="available">Disponible</label>
            <input type="checkbox" id="available" />
          </li>
          <li className="filters__price">
            <label htmlFor="price">Precio:</label>
            <input type="text" id="price" placeholder="Min"/>
            <input type="text" placeholder="Max"/>
          </li>
          <li className="filters__quantity">
            <label htmlFor="quantity">Cantidad:</label>
            <input type="text" id="quantity"/>
          </li>
          <li>
            <input type="submit" value="Filtrar" />
          </li>
        </ul>
      </form>
    )
  }


}


export default Filters;