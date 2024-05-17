const express=require('express');
const userController=require('../Controller/UserController');

const router=express.Router();



router.post('/sign-up',userController.registerUser);

module.exports=router;