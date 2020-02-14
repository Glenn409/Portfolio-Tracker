import React from 'react';
import './index.css'
import {Link} from 'react-router-dom'

function NavBar(){
        return(
            <div className='nav-container'>
                
                <div className='nav-box'>
                    <Link to='/dashboard/portfolio'>Portfolio</Link>
                </div>
                <div className='nav-box'>
                    <Link to='/dashboard/settings'>Settings</Link>
                </div>
                <div className='nav-box'>
                    <p>Box3</p>
                </div>
                <div className='nav-box'>
                    <p>Box4</p>
                </div>
                <div className='nav-box'>
                    <p>Log Out</p>
                </div>
            </div>
        )
}

export default NavBar;