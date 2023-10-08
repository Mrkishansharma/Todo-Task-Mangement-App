
const { TodoModel } = require('../model/todo.model');

const mongoose = require('mongoose');


const addTask = async (req, res) => {

    // createdDate is not get then assign to current Date
    if (req.body.createdDate === undefined) {
        req.body.createdDate = new Date();
    }

    try {

        const newTodo = new TodoModel(req.body);

        // task save in database
        await newTodo.save();

        return res.status(201).send({
            "message": "Task Added Successfully",
            "data": newTodo
        })

    } catch (error) {

        return res.status(500).send({
            "error": error.message
        })
    }
}


const getTaskById = async (req, res) => {

    const { id } = req.params;

    const { userId } = req.body;

    try {

        const todo = await TodoModel.findById({ _id: new mongoose.Types.ObjectId(id) }).populate("userId");

        if (todo.userId._id == userId) {

            return res.status(200).send({ data: todo });
        } else {

            return res.status(400).send({ "message": "Unauthorized. You are not able to access other users task" });
        }
    } catch (error) {

        return res.status(500).send({ "error": error.message });
    }
}

const getAllTask = async (req, res) => {

    const { userId } = req.body;

    try {

        const todos = await TodoModel.find({ userId }).populate("userId");
        return res.status(200).send({ data: todos });

    } catch (error) {

        return res.status(500).send({ "error": error.message });
    }
}


const updateTaskById = async (req, res) => {

    const { id } = req.params;

    if (req.body.status) {
        if (!["Pending", "Completed", "In Progress"].includes(req.body.status)) {
            return res.status(400).send({
                "error": "Invalid status Detected",
                "Info": `only allow these tasks :- Pending, Completed, In Progress`
            })
        }
    }

    try {

        const todoData = await TodoModel.findById({ _id: new mongoose.Types.ObjectId(id) });

        if (!todoData) {
            return res.status(404).send({
                "message": "Todo not found."
            })
        }

        if (todoData.userId == req.body.userId) {

            await TodoModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, req.body);

            const newTodo = await TodoModel.findById({ _id: new mongoose.Types.ObjectId(id) });

            return res.status(200).send({
                "message": `Todo Details has been updated successfully.`,
                data: newTodo
            });

        } else {

            return res.status(400).send({
                "message": "Unauthorized. You are not able to update other users task"
            })
        }
    } catch (error) {

        return res.status(500).send({
            "message": error.message
        })
    }
}


const deleteTaskById = async (req, res) => {

    const { id } = req.params;

    try {

        const todo = await TodoModel.findById({ _id: new mongoose.Types.ObjectId(id) });
        if (!todo) {
            return res.status(400).send({
                "message": "Todo Not Found."
            })
        }

        if (todo.userId == req.body.userId) {

            await TodoModel.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(id) });

            return res.status(200).send({
                "message": "Todo has been deleted successfully."
            });
        } else {

            return res.status(400).send({
                "message": "Unauthorized. You are not able to delete other users task"
            })
        }
    } catch (error) {

        return res.status(500).send({
            "message": error.message
        })
    }
}


module.exports = {
    addTask,
    getTaskById,
    getAllTask,
    updateTaskById,
    deleteTaskById
}