
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const { UserModel } = require("../model/user.model");
const { isValidEmail, isPasswordValid, isNameValid } = require('./validation');



async function verifyUser(email) {
    try {
        return await UserModel.findOne({ email });
    } catch (error) {
        return null
    }
}

const registerUser = async (req, res) => {

    let { email, name, password } = req.body;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!isValidEmail(email)) {
        return res.status(400).send({ "error": "Invalid Email Address" });
    }
    if (!isNameValid(name)) {
        return res.status(400).send({ "error": "Name only contains alphanumeric characters" });
    }
    if (!isPasswordValid(password)) {
        return res.status(400).send({ "error": "Password Must be Strong that contains one lowercase, one uppercase, one special character , one number and minimum 8 characters" });
    }

    if (await verifyUser(email)) {
        return res.status(201).send({ "message": "User Already Exists" });
    }

    bcrypt.hash(password, 6, async (err, hash) => {
        try {

            const newUser = new UserModel({ email, name, password: hash });
            await newUser.save();

            return res.status(201).send({
                "message": "Your account has been created successfully!",
                "User": newUser
            });

        } catch (error) {
            return res.status(500).send({ "error": error.message });
        }
    });
}


const loginUser = async (req, res) => {

    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    try {

        if (!isValidEmail(email)) {
            return res.status(400).send({ "error": "Invalid Email Address" });
        }

        const user = await verifyUser(email);

        if (user) {

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(400).send({
                        "error": "Invaid Password"
                    });
                } else {
                    return res.status(200).send({
                        "message": "Login Successfully",
                        "token": jwt.sign({ userId: user._id }, process.env.SecretKey, { expiresIn: '24h' })
                    });
                }
            })
        } else {

            return res.status(404).send({
                "message": "User Not Found"
            })
        }
    } catch (error) {

        return res.status(500).send({
            "error": error.message
        })
    }
}


const getUserDetails = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await UserModel.findById({ _id: userId });

        if (user) {
            return res.status(200).send({ data: user });
        } else {
            return res.status(404).send({ "message": "User Not Found." })
        }
    } catch (error) {

        return res.status(500).send({ "error": error.message })
    }
}


const updateUserDetails = async (req, res) => {
    const { userId } = req.body;
    try {
        const userData = await UserModel.findById({ _id: userId });

        if (userData) {
            await UserModel.findByIdAndUpdate({ _id: userId }, { ...req.body });
            const user = await UserModel.findOne({ _id: userId });

            return res.status(200).send({
                "message": "User Details Has been Updated Successfully",
                "user": user
            });
        } else {
            return res.status(404).send({
                "message": "User Not Found"
            })
        }
    } catch (error) {

        return res.status(500).send({ "error": error.message });
    }
}


const deleteUserAccount = async (req, res) => {
    const { userId } = req.body;
    try {

        const userData = await UserModel.findById({ _id: userId });

        if (userData) {

            await UserModel.findByIdAndDelete({ _id: userId });
            await TodoModel.deleteMany({ userId });

            return res.status(200).send({
                "message": `User Account Deleted Successfully`
            });
        } else {

            return res.status(404).send({
                "message": "User Not Found"
            })
        }
    } catch (error) {

        return res.status(500).send({ "error": error.message })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUserDetails,
    updateUserDetails,
    deleteUserAccount
}