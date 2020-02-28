import React from 'react'
import axios from 'axios'
import './index.css'
import {checkName, checkEmail,checkPW, checkRepeatingPW} from '../../validationFunctions'
import LoginModal from '../loginModal'
import Particles from 'react-particles-js';

class signUpPage extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            name: '',
            nameTest: '',
            email: '',
            emailTest: '',
            password: '',
            passwordTest: '',
            repeatedPassword: '',
            repeatedPasswordTest: '',
            emailError: '',
            passwordError: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTest = this.handleTest.bind(this)
    }
    handleChange(e){
        let currentEvent = [e.target.name]
        this.setState({[e.target.name]: e.target.value},() =>{

            switch(currentEvent[0]){
                case "name":
                    this.setState({nameTest: checkName(this.state.name)})
                    break;
                case "email":
                    this.setState({emailTest: checkEmail(this.state.email)})
                    break;
                case "password":
                    this.setState({passwordTest: checkPW(this.state.password)})
                    break;
                case 'repeatedPassword':
                    this.setState({repeatedPasswordTest: checkRepeatingPW(this.state.password,this.state.repeatedPassword)})
                    break;
                default:
                    console.log('Login Switch Statement Failed')
                    break;
            }
        })
    }
    handleTest(test){
        if(test === 'Passed'){
            return <i class="material-icons passed">done</i>
        } else if (test === 'Failed'){
            return <i class="material-icons failed">error_outline</i>
        }

    }
    handleSubmit(e){
        e.preventDefault()
        if(
            this.state.nameTest === 'Passed' &&
            this.state.emailTest === 'Passed' &&
            this.state.passwordTest === 'Passed' &&
            this.state.repeatedPasswordTest === 'Passed'
        ){
            axios.post('/api/signup',{
                email: this.state.email,
                password: this.state.password
            }).then(res =>{
                console.log(res)
                if(res.data.res){ 
                    console.log('error')
                    this.setState({emailError: res.data.res.error})
                } else {
                    console.log('logging in ')
                    this.setState({emailError: ''})
                    console.log(localStorage.userToken)
                    localStorage.removeItem('userToken')
                    console.log(localStorage.userToken)
                    localStorage.setItem('userToken', res.data.success.accessToken)
                    console.log(localStorage.userToken)
                    this.props.history.push(`/dashboard/portfolio`)
                }
            }).catch(err =>{
                console.log(err)
            })
        } else if(this.state.passwordTest === 'Failed'){
            this.setState({emailError: "* Password must include upper and lower case,\n one number, and a unique character *"})
        } else {
            this.setState({emailError: '* Please fill in all forms *'})
        }
    }

    render(){
        return (
            <div className='signup-container'>
                <div className='signup-image-container'>
                    <div className='signup-cover'>
                    <Particles 
                    params={{
                        "particles": {
                            "number": {
                                "value":80
                            },
                            "size": {
                                "value": 2
                            }
                        },
                    }} 
                    style={{
                        width: '100%',
                      }} />
                    <div className='testcard'>
                      <div className='register-container'>
                        <div className='signup-title-box'>
                            <i className="fa fa-pie-chart icon"></i>
                            <p className= 'form-title-signup'>CryptoTracking</p>
                        </div>
                        <h1 className='signup-h1'>Sign Up</h1>
                        <form className='signup-form'>
                        

                        <p className='form-label full-name'>Full Name </p>
                        <div className='validation-container'>
                            <div className='input-box-signup'>
                                <input placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange}></input>
                                {this.handleTest(this.state.nameTest)}
                            </div> 
                            <span className='border-animation'></span>
                        </div>


                        <p className='form-label'>Email</p> 
                        <div className='validation-container'>
                            <div className='input-box-signup'>
                                <input placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange}></input>
                                {this.handleTest(this.state.emailTest)}
                            </div>
                            <span className='border-animation'></span>
                        </div>

                        
                        <p className='form-label'>Password</p> 
                        <div className='validation-container'>
                            <div className='input-box-signup'>
                                <input placeholder="*******" name='password' type='password'value={this.state.password} onChange={this.handleChange}></input>
                                {this.handleTest(this.state.passwordTest)}
                            </div>
                            <span className='border-animation'></span>
                        </div>

                        <p className='form-label'>Repeat Password</p> 
                        <div className='validation-container'>
                            <div className='input-box-signup'>
                                <input placeholder="*******" name='repeatedPassword' type='password' value={this.state.repeatedPassword} onChange={this.handleChange}></input>
                                <span>{this.handleTest(this.state.repeatedPasswordTest)}</span>
                            </div>
                            <span className='border-animation'></span>
                        </div>

                        <p className='error'>{this.state.emailError}</p>

                    </form>
                        <div className='signup-button-box'>
                            <button className='signup-button' onClick={this.handleSubmit}>Sign Up</button>
                            {/* <div> */}
                                {/* <h2>already have an account?</h2> */}
                                <LoginModal  />
                            {/* </div> */}
                        </div>
                      </div>
                    </div>
                    </div>
                </div>
    
                {/* <div className='register-container'>

                    <form className='signup-form'>
                        <h1>Sign Up</h1>

                        <p className='form-label'>Full Name </p>
                        <div className='validation-container'>
                            <div>
                                <input placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange}></input>
                                <span className='border-animation'></span>
                            </div> 
                            <span>{this.state.nameTest}</span>
                        </div>


                        <p className='form-label'>Email</p> 
                        <div className='validation-container'>
                            <div>
                                <input placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange}></input>
                                <span className='border-animation'></span>
                            </div>
                            <span>{this.state.emailTest}</span>
                        </div>

                        
                        <p className='form-label'>Password</p> 
                        <div className='validation-container'>
                            <div>
                                <input placeholder="*******" name='password' value={this.state.password} onChange={this.handleChange}></input>
                                <span className='border-animation'></span>
                            </div>
                            <span>{this.state.passwordTest}</span>
                        </div>

                        <p className='form-label'>Repeat Password</p> 
                        <div className='validation-container'>
                            <div>
                                <input placeholder="*******" name='repeatedPassword' value={this.state.repeatedPassword} onChange={this.handleChange}></input>
                                <span className='border-animation'></span>
                            </div>
                            <span>{this.state.repeatedPasswordTest}</span>
                        </div>

                        <p className='error'>{this.state.emailError}</p>

                        <div className='button-box'>
                            <span className='border-animation'></span>

                            <button className='signup-button' onClick={this.handleSubmit}>Sign Up</button>
                            <h2>already have an account?</h2>
                            <LoginModal />
                        </div>
                    </form>
                </div> */}
    
            </div>
        )
    }
}

export default signUpPage