const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3001
const db = require('./models')
const session = require('express-session')
const app = express()


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

db.sequelize.sync(syncOptions).then(function(){
    app.listen(port, function() {
    console.log(`Server now listening on PORT ${port}!`)
  })
})      