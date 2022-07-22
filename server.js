const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./user');
mongoose.Promise = global.Promise;
app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
    mongoose.connect('mongodb://localhost/loginpage');
    mongoose.connection.once('open',function(){
        console.log("Connection has been made now call fireworks");
        app.listen(3000,()=>{
            console.log(`listening on port ${3000}...`);
        })
    }).on('error',function(error){
        console.log("Connection Error", error);
    });
    
app.post('/login',(req,res)=>{
  console.log("login request recieved");
  
     User.findOne({email: req.body.email}).then((result)=>{
        if(!result)
        res.send(401);
        else if(req.body.password === result.password )
        res.send(200);
        else
        res.send(401);
        console.log(req.headers);
    })
})
app.post('/signup',(req,res)=>{
    console.log("signup request recieved");
    
       const newUser = new User(req.body);
       newUser.save().then(()=>{
        res.send(200);
       })
  })
  app.get('/info/:email',(req,res)=>{
    console.log("info request recieved for ",req.params.email);
    User.findOne({email: req.params.email}).then((result)=>{
       console.log("found");
       res.type('json');
       console.log(res.json(result));
    })
  
  })

  app.post('/editUser', (req,res)=>{
    console.log("edit request recieved for ",req.body.email);
    User.findOne({email: req.body.email}).then((result)=>{
        if(result !== null){
       result.name = req.body.name;
       result.phone = req.body.phone;
       result.adress = req.body.adress;
       if(req.body.password)
       result.password = req.body.password;
       result.save().then(()=>{
        res.send(200);
       })
        }
        else
        res.send(404);

    })
  
  })
//mongoose.connection.collections.users.drop();
//let demoUser = new User({email:"agrawaldev14@gmail.com" , password:"1234"});
//demoUser.save();

















///////////////////////////////////////////////////////////////////////////////
    