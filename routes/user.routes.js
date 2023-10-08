const { Router } = require('express');
const userRouter = Router();

const {
    registerUser,
    loginUser,
} = require('../controller/user.controller')


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);


module.exports = {
    userRouter
}