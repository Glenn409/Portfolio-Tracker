import React from 'react'
import './index.css'
import Collapsible from 'react-collapsible'
class Coinlist extends React.Component{
    // super()
    // this.state ={

    // }


    render(){
        console.log(this.props)
        return (
            <div className='coinList-container'>
                <i class='cf cf-btc-atl'></i>
                <i class="cf cf-btc"></i>
                <div className='coinList-headers'>
                    <p className='name'>Name</p>
                    <p className='quantity'>Quantity</p>
                    <p className='price'>Price</p>
                    <p className='coin-value'>Market Value</p>
                </div>
                <div>
                    
                </div>
        {/* <Collapsible trigger="Start here">
            <p>This is the collapsible content. It can be any element or React component you like.</p>
            <p>It can even be another Collapsible component. Check out the next section!</p>
        </Collapsible> */}

            </div>
        )
    }
}
export default Coinlist