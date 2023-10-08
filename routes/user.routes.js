
const { Router } = require('express');

const userRouter = Router();

const { registerUser, loginUser, getUserDetails, updateUserDetails, deleteUserAccount } = require('../controller/user.controller');
const { auth } = require('../middleware/auth.middleware');


// create user account
userRouter.post("/register", registerUser);

// login user by email and password
userRouter.post("/login", loginUser);


// Protected Routes are accessible only after login


// get user details by jwt token
userRouter.get('/', auth, getUserDetails);


// update user details by jwt token
userRouter.patch('/', auth, updateUserDetails);

userRouter.put('/', auth, updateUserDetails);


// delete user details by jwt token
userRouter.delete('/', auth, deleteUserAccount);


module.exports = {
    userRouter
}