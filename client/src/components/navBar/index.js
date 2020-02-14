import React from 'react';
import './index.css'
import {Link} from 'react-router-dom'

function NavBar(){
        return(
            <div className='nav-container'>
                
                <Link className='text-link' to='/dashboard/portfolio'>
                    <div className='nav-box'>
                        <h1>Portfolio</h1>
                    </div>
                </Link>

                <Link className='text-link' to='/dashboard/settings'>
                    <div className='nav-box'>
                        <h1>Settings</h1>
                    </div>
                </Link>

                <Link className='text-link' to=''>
                    <div className='nav-box'>
                        <h1>box3</h1>
                    </div>
                </Link>

                <Link className='text-link' to=''>
                    <div className='nav-box'>
                        <h1>box4</h1>
                    </div>
                </Link>>

                <Link className='text-link' to=''>
                    <div className='nav-box'>
                        <h1>Logout</h1>
                    </div>
                </Link>
            </div>
        )
}

export default NavBar;