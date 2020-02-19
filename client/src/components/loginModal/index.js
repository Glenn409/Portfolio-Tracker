import React from 'react';
import Modal from 'react-modal';
import './index.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

 
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
      if(res.data.error){
        console.log(res.data.error)
      } else {
        localStorage.setItem('userToken', res.data.accessToken)
        this.props.history.push(`/dashboard/portfolio`)
      }
    }).catch(err =>{
      console.log(err)
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
                <input className='login-input' placeholder='Email' value={this.state.email} onChange={this.handleChange} name='email'></input>
            </div>

              <div className='login-input-box'>
                <i className='material-icons'>lock</i>
                <input placeholder='Password' className='login-input' value={this.state.password} onChange={this.handleChange} name='password'></input>
              </div>

              <button onClick={this.handleSubmit} className='login-button'>Sign In</button>
              <p className='login-error'>{this.state.error}</p>
          </form>
          
        </Modal>
      </div>
    );
  }
}

export default withRouter(loginModal)
