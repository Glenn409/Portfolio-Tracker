let mysql = require('mysql');
let connection = mysql.createConnection(process.env.JAWSDB_URL);
connection.connect();  
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3001
const db = require('./models')
const session = require('express-session')
const app = express()
const cron = require('node-cron')
const routeTools = require('./routes/routeFunctions')
const path = require('path')

if( process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client','index.html'))
    })
}
app.use(bodyParser.json())
app.use( bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use (session({
    secret:'llama',
    resave: false, 
    saveUninitialized: false
}))

require('./routes/api')(app)

let syncOptions = {force: false}

if(process.env.NODE_ENV === 'test'){
    syncOptions.force = true
}
// function timeConverter(UNIX_timestamp){
//     var a = new Date(UNIX_timestamp * 1000);
//     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var year = a.getFullYear();
//     var month = months[a.getMonth()];
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//     return time;
//   }
//   console.log('date')
//   console.log(timeConverter(1574380800));
//   console.log(timeConverter(1574640000))
//   console.log(timeConverter(1582243200))
let task = cron.schedule('*/5 * * * * ',() => {
    console.log('RUNNING CRON JOB')
    // routeTools.updatePrices() 
})

db.sequelize.sync(syncOptions).then(function(){
    app.listen(port, function() {
    console.log(`Server now listening on PORT ${port}!`)
    task.start()
    routeTools.updatePrices()
  })
})      