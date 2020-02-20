import React from 'react';
import './index.css'
import DonutOverall from '../donutOverall/index'


class Portfolio extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }
    componentDidMount(){
        
    }
    createTransactionList(){
        let div = []

        for(let i = 0; i < (this.props.transactions).length;i++){
            Object.keys(this.props.transactions[i]).map(function(key,index) {
                div.push(<div> Key: {key} Value: {this.props.transactions[i][key]}</div>)
            }, this)
        }
        return div
    }
    render(){
        
        return(
            <div>
                {
                Object.keys(this.props.portfolio).map(function(key,index) {
                    return <div> Key: {key} Value: {this.props.portfolio[key]}</div>
                }, this)
                }
                <h1></h1>
                <h1>userID: {this.props.userId}</h1>
                <h1>Transaction List</h1>
                <div>
                    {this.createTransactionList()}
                </div>
                <DonutOverall 
                    data={this.props.portfolio}
                />
            </div>
        )
    }
}

export default Portfolio;