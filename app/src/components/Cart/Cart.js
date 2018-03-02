import './Cart.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ProductList from '../ProductList/ProductList';

Modal.setAppElement('#root');

class Cart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  render() {
    return (
      <div className={this.props.cls}>
        <a href="#" onClick={this.openModal}>Carrito ({this.props.cartLength})</a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          <div className="modal-cart">
            <h2 className="modal-title">Productos Agregados</h2>
            <a href="#" onClick={this.closeModal} className="btn-close">close</a>

            <ProductList products={this.props.cart} removeToCart={this.props.removeToCart} />
          </div>

        </Modal>
      </div>
    )
  }

}


export default Cart;