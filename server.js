const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5000
const Account = ('./routes/account')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/account',Account)

app.listen(port, () =>{
    console.log('app is listening on port: '+ port)
})