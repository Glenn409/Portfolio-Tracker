import React from 'react'
import axios from 'axios'
import './index.css'
import {checkName, checkEmail,checkPW, checkRepeatingPW} from '../../validationFunctions'

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

    handleSubmit(e){
        e.preventDefault()
        if(
            this.state.nameTest === 'Passed' &&
            this.state.emailTest === 'Passed' &&
            this.state.passwordTest === 'Passed' &&
            this.state.repeatedPasswordTest === 'Passed'
        ){
            console.log('Creating Account...')
            axios.post('/api/signup',{
                email: this.state.email,
                password: this.state.password
            }).then(res =>{
                if(res.data.error){ 
                    this.setState({emailError: res.data.error})
                }else {
                        
                    this.setState({emailError: ''})
                }
            }).catch(err =>{
                console.log(err)
            })
        } else {
            this.setState({emailError: "Error signing up!"})
        }
    }

    render(){
        return (
            <div className='signup-container'>
                <h1>IMG HERE</h1>
    
                <div className='register-container'>
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
                        <button>Sign In</button>
                    </div>
                    </form>
                </div>
    
            </div>
        )
    }
}

export default signUpPage