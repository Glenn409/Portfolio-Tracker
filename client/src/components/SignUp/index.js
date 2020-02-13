import React from 'react'
import axios from 'axios'
import './index.css'

class signUpPage extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            name: '',
            email: '',
            password: '',
            repeatedPassword: '',
            emailError: '',
            passwordError: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()

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
    }

    render(){
        return (
            <div className='signup-container'>
                <h1>IMG HERE</h1>
    
                <div className='register-container'>
                    <form className='signup-form'>
                        <h1>Sign Up</h1>
                        <p className='form-label'>Full Name </p> 
                        <input placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange}></input>
                        <p className='form-label'>Email</p> 
                        <input placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange}></input>
                        <p className='form-label'>Password</p> 
                        <input placeholder="*******" name='password' value={this.state.password} onChange={this.handleChange}></input>
                        <p className='form-label'>Repeat Password</p> 
                        <input placeholder="*******" name='repeatedPassword' value={this.state.repeatedPassword} onChange={this.handleChange}></input>
                        <p className='error'>{this.state.emailError}</p>
                    </form>
                    <div className='button-box'>
                        <button className='signup-button' onClick={this.handleSubmit}>Sign Up</button>
                        <button>Sign In</button>
                    </div>
                </div>
    
            </div>
        )
    }
}

export default signUpPage