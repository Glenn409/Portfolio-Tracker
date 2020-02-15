import React from 'react';
import Modal from 'react-modal';
import './index.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
Modal.setAppElement('#root')
 
class loginModal extends React.Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
 
  openModal(e) {
    e.preventDefault()
    this.setState({modalIsOpen: true});
  }
 
  closeModal(e) {
    e.preventDefault()
    this.setState({modalIsOpen: false});
  }
 
  render() {
    return (
      <div>
        <button onClick={this.openModal}>Sign In</button>
        <Modal className ='modal-container' isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <div class='modal-header'>  
                <i onClick={this.closeModal} className="material-icons close">close</i>
            </div>
          <form className='modal-form'>
            <p className='modal-title'>User Login</p>
            <div className='login-input-box'>
                <i className="material-icons" >email</i>
                <input className='login-input' placeholder='Email'></input>
            </div>

              <div className='login-input-box'>
                <i className='material-icons'>lock</i>
                <input placeholder='Password' className='login-input'></input>
              </div>

              <button className='login-button'>Sign In</button>
          </form>
          
        </Modal>
      </div>
    );
  }
}

export default loginModal
