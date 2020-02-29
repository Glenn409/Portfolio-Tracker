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

// if( process.env.NODE_ENV === 'production'){
//     console.log('=========')
//     console.log('productions')
//     console.log('=========')
//     app.use(express.static('client/build'));
// }
// app.get('*', (request, response) => {
//     response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });
// app.use(bodyParser.json())
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

let task = cron.schedule('*/5 * * * * ',() => {
    console.log('RUNNING CRON JOB')
    routeTools.updatePrices() 
})

db.sequelize.sync(syncOptions).then(function(){
    app.listen(port, function() {
    console.log(`Server now listening on PORT ${port}!`)
    task.start()
    routeTools.updatePrices()
  })
})      