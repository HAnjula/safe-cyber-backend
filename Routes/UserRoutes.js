const express=require('express');
const userController=require('../Controller/UserController');
const {loginUser} = require("../Controller/UserController");

const router=express.Router();



router.post('/sign-up',userController.registerUser);
router.post('/login',userController.loginUser);

// Route to get all users
router.get('/', userController.getAllUsers);

module.exports=router;