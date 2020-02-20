module.exports = (sequelize,DataTypes) =>{
    let Coin = sequelize.define('Coin', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        symbol: {
            type:DataTypes.STRING,
            unique: true
        },
        name: {
            type:DataTypes.STRING,
            unique: true
        },
        btcprice: {
            type:DataTypes.DECIMAL(10,8),
            defaultValue: 0
        },
        usdprice: {
            type:DataTypes.DECIMAL(10,2),
            defaultValue: 0
        },
        sort:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:null
        },

    })
    return Coin
}