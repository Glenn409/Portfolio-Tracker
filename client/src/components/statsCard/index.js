import React from 'react'
import './index.css'

class StatsCard extends React.Component{
    constructor(){
        super()
        this.state ={
            balance: 0,
            costbasis: 0,
            netfiat: 0,
            pastDay: 0,
            return: 0
        }
    }
    componentWillReceiveProps(prevProps){
        this.setState({balance: prevProps.portfolio.balance.usd})
        // this.setState({costbasis: prevProps.})
    }
    render(){
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
    });
        console.log(this.props)
        return(
            <div className='statsCard-content'>
                {/* <div class='statsCard-row'>
                    <div class='statsCard-info'>
                        <p className='label'>Market Value</p>
                        <p className='label-value'>{formatter.format(this.state.balance)}</p>
                    </div>
                    <div class='statsCard-info'>
                        <p className='label'>Cost Basis</p>
                        <p className='label-value'>{formatter.format(this.state.costbasis)}</p>
                    </div>
                </div>
                <div className='statsCard-row'>
                    <div class='statsCard-info'>
                        <p className='label'>Net Fiat Invested</p>
                        <p className='label-value'>{formatter.format(this.state.balance)}</p>
                    </div>
                    <div class='statsCard-info'>
                        <p className='label'>past</p>
                        <p className='label-value'>{formatter.format(this.state.balance)}</p>
                    </div>
                </div> */}

            </div>
        )
    }
}

export default StatsCard