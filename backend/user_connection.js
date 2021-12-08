const express = require("express");
const bcrypt = require("bcrypt");
const cors = require('cors');
const router = express.Router();
const User = require('./models/User');


router.use(cors());
router.post('/register',(req, res) => {
    const name = req.body.name;        
    let email = req.body.email;         
    const password = req.body.password;     

    if (!name) {                           
        return res.send({
            success: false
        })
    }
    if (!email) {                           
        return res.send({
            success: false
        })
    }
    if (!password) {                       
        return res.send({
            success: false
        })
    }

    email = email.toLowerCase();            

    User.findOne({email: email}, (err, user) => {           
        if (err) {                                       
            return res.send({
                success:false,
                status:400,
                message:'erreur'
            });
        }
        if (user) {                                     
            return res.send({
                success:false,
                status:400,
                message:'utilisateur déjà existant'
            });
        }
        const newUser = new User({name, email, password});   
        newUser.save((err, user)=> {                       
            if (err)
                res.send({
                    success:false,
                    status:400,
                    message: 'Error du server'
                });
            res.send({
                success:true,
                status:200,
                message:'registered'
            })
        })
    })
});

router.post('/login', (req, res) => {   
    password = req.body.password;               
    email = req.body.email;                     
    User.findOne({email: email})                
        .then(user => {                 
            if (user) {                         
                console.log(password);          
                console.log(user.password);     
                if (password === user.password)    
                    return res.send({           
                        success:true,
                        status:200,
                        message:"authentificated"
                    });
                else                                    
                    return res.send({
                        success:false,
                        status:400,
                        message:"Password is incorrect"
                    })
            }
            else if (!user) {
                return res.send({
                    success: false,
                    status:400,
                    message: "no user with that email address"
                })
            }
        })
        .catch(err => {
            return res.send({
                success:false,
                message:"Tu n'existe pas"
            })
        })
});


module.exports = router;