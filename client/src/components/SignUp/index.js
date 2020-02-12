import React from 'react'
import './index.css'

function SignUpPage(){
    return (
        <div className='signup-container'>
            <h1>IMG HERE</h1>

            <div className='register-container'>
                <form className='signup-form'>
                    <h1>Sign Up</h1>
                    <label>Full Name: </label>
                    <input placeholder='Name'></input>
                    <label>Email: </label>
                    <input placeholder='Email'></input>
                    <label>Password: </label>
                    <input placeholder="*******"></input>
                    <button className='signup-button' type='submit'>Sign Up</button>
                </form>
                <div>
                    <h2>Already Have an account?</h2>
                    <button>Sign In</button>
                </div>
            </div>

        </div>
    )
}

export default SignUpPage