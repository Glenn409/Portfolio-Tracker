const db = require('../models/')

module.exports = app => {
    //used to show the current express-session, helps with debugging passport
    // app.use((req,res,next)=>{
    //     console.log('req.session: ',req.session)
    //     return next()
    // })
      
    app.get("/",(req,res) =>{
        res.send('hellllooooo')
    }) 

    app.post("/api/signup",(req,res) =>{
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }

        db.User.findOne({
            where: { email: req.body.email}
        }).then(user =>{
            if(user){
                res.json({error: "Email is already in use!"})
            } else {
                db.User.create(newUser).then(db =>{
                    res.json({success: 'created account'})
                })
            }
        })
        
    })



}   