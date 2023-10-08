
const { Router } = require('express');
const taskRouter = Router();

const { addTask, getTaskById, getAllTask, updateTaskById, deleteTaskById } = require('../controller/todo.controller');

const { auth } = require('../middleware/auth.middleware');



// Protected routes are accessible only after login.

taskRouter.use(auth);


// Create todo
taskRouter.post("/", addTask);

// Get all todos
taskRouter.get("/", getAllTask);

// Get todo by todo id
taskRouter.get('/:id', getTaskById);

// update todo details by todo id
taskRouter.put("/:id", updateTaskById);

// update todo details by todo id
taskRouter.patch("/:id", updateTaskById);

// delete todo by todo id
taskRouter.delete("/:id", deleteTaskById);


module.exports = {
    taskRouter
}