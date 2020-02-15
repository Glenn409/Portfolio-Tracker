const db = require('../models/')
const routeTools = require('./routeFunctions')

module.exports = app => {
    //used to show the current express-session, helps with debugging passport
    // app.use((req,res,next)=>{
    //     console.log('req.session: ',req.session)
    //     return next()
    // })
      
    app.get("/",(req,res) =>{
        res.send('hellllooooo')
    }) 
    
    app.post('/api/login', (req,res) =>{
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        routeTools.login(user)
    })

    app.post("/api/signup",(req,res) =>{
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        routeTools.signUp(newUser)
    })



}   