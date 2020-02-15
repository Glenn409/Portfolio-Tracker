import React from 'react';
import Modal from 'react-modal';
import './index.css'
import axios from 'axios'

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
      modalIsOpen: false,
      email: '',
      password: '',
      error: ''
    };
 
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
 
  openModal(e) {
    e.preventDefault()
    this.setState({modalIsOpen: true});
  }
 
  closeModal(e) {
    e.preventDefault()
    this.setState({modalIsOpen: false});
  }

  handleChange(e){
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      console.log(res)
      if(res === false){
        this.setState({error: 'Invalid Username'})
      }
    })

  }
 
  render() {
    return (
      <div>
        <button onClick={this.openModal}>Sign In</button>
        <Modal className ='modal-container' isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <div className='modal-header'>  
                <i onClick={this.closeModal} className="material-icons close">close</i>
            </div>
          <form className='modal-form'>
            <p className='modal-title'>User Login</p>
            <div className='login-input-box'>
                <i className="material-icons" >email</i>
                <input className='login-input' placeholder='Email' onChange={this.handleChange} name='email'></input>
            </div>

              <div className='login-input-box'>
                <i className='material-icons'>lock</i>
                <input placeholder='Password' className='login-input' onChange={this.handleChange} name='password'></input>
              </div>

              <button className='login-button' onClick={this.handleSubmit}>Sign In</button>
              <p className='login-error'>{this.state.error}</p>
          </form>
          
        </Modal>
      </div>
    );
  }
}

export default loginModal
