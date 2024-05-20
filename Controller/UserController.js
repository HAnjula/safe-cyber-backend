const UserSchema=require('../Model/UserSchema');

const registerUser=(req,res)=>{
    const User=new UserSchema({
        email:req.body.email,
        password:req.body.password,
        fullName:req.body.fullName,
        avatar:req.body.avatar
    });
    User.save().then(savedResponse=>{
        res.status(201).json(savedResponse);
    }).catch(error=>{
        res.status(500).json(error);
    });
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
const loginUser=(req,res)=>{}

module.exports={
    getAllUsers,
    registerUser,
    loginUser
}