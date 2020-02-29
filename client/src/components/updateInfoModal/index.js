import React from 'react';
import Modal from 'react-modal';
import './index.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import  {updateEmail,updatePW} from '../fetchFunctions'
import {checkEmail, checkPW} from '../../validationFunctions'
Modal.setAppElement('#root')

class UpdateInfoModal extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            updateEmail:false,
            updatePassword:false,
            newEmail: '',
            emailTest:'',
            password: '',
            emailError: '',
            passwordError: '',
            loginError: '',
            oldPasswordError: '',
            oldPassword: '',
            newPassword: '',
            newPasswordError:'',
            newPasswordTest:''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        this.timer = setInterval(() =>{
            if(this.props){
                clearInterval(this.timer)
                this.timer = null
                this.setState({email: this.props.email})
            }
        },100)
    }
    componentWillReceiveProps(prop){
        if(prop.update === 'email'){
            this.setState({updateEmail: true})
        } else if(prop.update === 'password'){
            this.setState({updatePassword: true})
        }
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
        let currentEvent = [e.target.name]
        this.setState({[e.target.name]: e.target.value},() =>{
            switch(currentEvent[0]){
                case 'newEmail':
                    this.setState({emailTest: checkEmail(this.state.newEmail)})
                    break;
               case 'password':
                    this.setState({passwordTest: checkPW(this.state.password)})
                    break;
                case 'newPassword':
                    this.setState({newPasswordTest: checkPW(this.state.newPassword)})
                    break;
                default:
                    console.log('Update Email switch failed')
                    break;
            }
        })
      }
      handleSubmit(e){
        e.preventDefault()
        if(this.state.updateEmail){
            if(this.state.emailTest === 'Failed'){
                this.setState({emailError:'* Invalid Email *'})
            } else {
                let user = {
                    id: this.props.id,
                    email: this.state.newEmail,
                    password: this.state.password
                }
                updateEmail(user).then(res =>{
                    if(res.data.emailError){
                        this.setState({passwordError: ''})
                        this.setState({emailError: res.data.emailError})
                    } else if(res.data.passwordError){
                        this.setState({emailError:''})
                        this.setState({passwordError: res.data.passwordError})
                    } else if(res.data.success){
                        this.closeModal(e)
                        this.setState({email: res.data.email})
                        this.props.updateEmail()
                    }
                })
            }

        } else if(this.state.updatePassword){
            if(this.state.newPasswordTest === 'Failed'){
                this.setState({passwordError: '* Invalid Password Format *'})
            }
            let user ={
                id: this.props.id,
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            }
            updatePW(user).then(res =>{
                if(res.data.error){
                    this.setState({newPasswordError: ''})
                    this.setState({oldPasswordError: res.data.error})
                } else if(res.data.success){
                    this.closeModal(e)
                    this.setState({oldPasswordError: ''})
                }
            })
        }
      }

    render(){
        console.log(this.props)

        let display = <p></p>
        if(this.state.updateEmail){
             display = <div>
                            <button className='modal-button' onClick={this.openModal}>Update Email</button>
                            <Modal   style={{overlay:{outline: 'none', backgroundColor: 'rgba(0, 0, 0,0.8)'}, content:{backgroundColor:'#354052'}}}
                                className ='modal-container' isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                                <div className='modal-header'>  
                                <i onClick={this.closeModal} className="material-icons close">close</i>
                            </div>

                            <form className='modal-form'>
                                <div className='modal-title'>
                                    <div className='signup-title-box login-title-box'>
                                        <i className="fa fa-pie-chart login-title-icon"></i>
                                        <p className= 'form-title-signup form-title-login'>CryptoTracking</p>
                                    </div>
                                    <p className='user-email-login'>Update Email</p> 
                                    <p className='user-email-login'>Current Email: {this.state.email} </p>
                                </div>
                                <div className={ this.state.emailError ? 'error-box login-input-box' : 'login-input-box'}>
                                    <i className="material-icons login-icon" >email</i>
                                    <input className='login-input' placeholder='New Email' value={this.state.newEmail} onChange={this.handleChange} name='newEmail'></input>
                                    <span role='img' className={this.state.emailError ? '' : 'error-icon-hide'}>&#10060;</span>
                                </div>

                                <div className={this.state.passwordError ? ' error-box login-input-box' : 'login-input-box'}>
                                    <i className='material-icons login-icon'>lock</i>
                                    <input type='password' placeholder='New Password' className='login-input' onChange={this.handleChange} name='newPassword'></input>
                                    <span  role ='img'className={this.state.passwordError ? '' : 'error-icon-hide'}>&#10060;</span>
                                </div>

                                <button onClick={this.handleSubmit} className='login-button'>Update Email</button>
                                <p className='error'>{this.state.emailError}{this.state.passwordError}</p>
                            </form>
                            </Modal>
                        </div>
        } else if(this.state.updatePassword){
            display = <div>
                        <button className='modal-button' onClick={this.openModal}>Update Password</button>
                        <Modal   style={{overlay:{outline: 'none', backgroundColor: 'rgba(0, 0, 0,0.8)'}, content:{backgroundColor:'#354052'}}}
                            className ='modal-container' isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                            <div className='modal-header'>  
                            <i onClick={this.closeModal} className="material-icons close">close</i>
                        </div>

                        <form className='modal-form'>
                            <div className='modal-title'>
                                <div className='signup-title-box login-title-box'>
                                    <i className="fa fa-pie-chart login-title-icon"></i>
                                    <p className= 'form-title-signup form-title-login'>CryptoTracking</p>
                                </div>
                                <p className='user-email-login'>Update Password</p> 
                            </div>
                            <div className={ this.state.oldPasswordError ? 'error-box login-input-box' : 'login-input-box'}>
                                <i className="material-icons login-icon" >lock</i>
                                <input  type='password' className='login-input' placeholder='Old Password' value={this.state.oldPassword} onChange={this.handleChange} name='oldPassword'></input>
                                <span role='img' className={this.state.oldPasswordError ? '' : 'error-icon-hide'}>&#10060;</span>
                            </div>

                            <div className={this.state.passwordError ? ' error-box login-input-box' : 'login-input-box'}>
                                <i className='material-icons login-icon'>lock</i>
                                <input type='password' placeholder='Password' className='login-input' onChange={this.handleChange} name='newPassword'></input>
                                <span  role ='img'className={this.state.passwordError ? '' : 'error-icon-hide'}>&#10060;</span>
                            </div>

                            <button onClick={this.handleSubmit} className='login-button'>Update Password</button>
                            <p className='error'>{this.state.oldPasswordError}{this.state.passwordError}</p>
                        </form>
                        </Modal>
                    </div>
        } else {
            display = <p></p>
        }   
        return(
            <div>
                {display}
            </div>
        )
    }
}

export default UpdateInfoModal