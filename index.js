
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { connection } = require("./config/db");
const { userRouter } = require('./routes/user.routes');

const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.status(200).send("Welcome To TaskManagement API.")
})



app.use("/api/v1/user", userRouter);

app.all('*', (req, res) => {
    return res.status(404).send({
        "error": "404! Route Not Found"
    })
})

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.error(error);
    }
    console.log(`Server is running on port ${process.env.port}`);
})



