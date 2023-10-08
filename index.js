
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { connection } = require("./config/db");
const { userRouter } = require('./routes/user.routes');
const { taskRouter } = require('./routes/todo.routes');
const { rateLimiting } = require('./utils/ratelimiter');
const { logger } = require('./utils/logger');

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome To TaskManagement API." })
})

// rate limiting middleware
app.use(rateLimiting);

// logging middleware
app.use(logger);


// Routers

app.use("/user", userRouter);

app.use("/tasks", taskRouter);




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



