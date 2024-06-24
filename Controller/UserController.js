const UserSchema=require('../Model/UserSchema');
const bcrypt = require('bcrypt');
const {response} = require("express");
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const registerUser=(req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const User=new UserSchema({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hash
        });
        User.save().then(savedResponse=>{
            res.status(201).json(savedResponse);
        }).catch(error=>{
            res.status(500).json(error);
        });
    });

}

const loginUser=(req,res)=>{
    UserSchema.findOne({email:req.body.email}).then(resultData=>{

        if (resultData){
            const token = jwt.sign({
                email:resultData.email,
                password:resultData.password,
                firstName:resultData.firstName,
                lastName:resultData.lastName
            }, process.env.PRIVATE_KEY);
            bcrypt.compare(req.body.password, resultData.password, function(err, result) {
                // result == false
                if (err){
                    res.status(401).json({message:'UnAuthorized'})
                }
                if (result){
                    res.status(200).json({message:'Logged', token: token})
                }else {
                    res.status(401).json({message:'UnAuthorized'})
                }
            });
        }else {
            res.status(404).json({message: 'User not found'})
        }
    }).catch(error=>{
        res.status(500).json(error)
    })
}

const getAllUsers = (req, res) => {
    UserSchema.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

module.exports={
    getAllUsers,
    registerUser,
    loginUser
}