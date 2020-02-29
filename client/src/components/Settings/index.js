import React from 'react';
import './index.css'
import {getAccountInfo} from '../fetchFunctions'
import UpdateInfoModal from '../updateInfoModal'
class Settings extends React.Component{
    constructor(){
        super()
        this.state={
            userId: '',
            userName: '',
            userEmail: '',
        }
        this.updateEmail = this.updateEmail.bind(this)
    }
    componentDidMount(){
        this.timer = setInterval(()=>{
            if(this.props.userId){
                clearInterval(this.timer)
                this.timer = null
                this.setState({userId: this.props.userId})
                this.getUserInfo()

            }
        },100)
    }
    getUserInfo(){
        getAccountInfo(this.state.userId)
            .then(res => {
                
                this.setState({userName: res.data.name})
                this.setState({userEmail: res.data.email})

            })
    }
    updateEmail(){
        getAccountInfo(this.state.userId)
            .then(res => {
                this.setState({userEmail: res.data.email})
                
            })

    }
    render(){
        console.log(this.props)
        return (
            <div className='settings-container'>
                <div className='settings-content'>
                    <div className='card card-settings'>
                        <p className='settings-title'>Update Account Info</p>
                        <div className='settings-name'>
                            <p className='settings-label '>Name: </p>
                            <p>{this.state.userName}</p>
                        </div>
                        <div className='settings-button-box'>
                            <div className='settings-box-container'>
                                <div className='settings-box'>
                                    <p className='settings-label'>Email:</p>
                                    <p>{this.state.userEmail}</p>
                                </div>
                                <div className='settings-box'>
                                    <p className='settings-label'>Password:</p>
                                    <p>********</p>
                                </div>
                            </div>
                            <div className='settings-box-container'>
                                <div className='settings-box'>
                                    <UpdateInfoModal 
                                        updateEmail={this.updateEmail}
                                        id={this.state.userId}
                                        email={this.state.userEmail}
                                        update='email'
                                    />

                                </div>
                                <div className='settings-box'>
                                    <UpdateInfoModal
                                        id={this.state.userId}
                                        email={this.state.userEmail}
                                        update='password'
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings