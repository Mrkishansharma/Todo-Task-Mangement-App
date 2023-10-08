# Todo-Task-Mangement-App

Our API provides comprehensive functionality for task management. Users can seamlessly create, access, modify, and delete tasks. Additionally, we offer optional features such as authentication and rate limiting to enhance the user experience. Our API also encompasses all CRUD (Create, Read, Update, Delete) operations for user-related data, providing a holistic solution for task management and user interaction.

## Table of Contents

- Getting Started
- Prerequisites
- Installation
- Usage
- Running the API
- Task structure
- Endpoints
- Authentication
- Error Handling
- Logging
- Rate Limiting


## Getting Started

Prerequisites
Before you begin, ensure that you have met the following requirements :
- Node.js
- MongoDB


## Clone this repository:

- git clone https://github.com/Mrkishansharma/Todo-Task-Mangement-App <br/>
- cd Todo-Task-Mangement-App

## Install dependencies:

npm install <br/>

Add a .env file and add below three varibales:-<br/>
mongoURL=your mongodb atlas url <br/>
port=8080<br/>
SecretKey=Your Private Secret Key<br/>

- Running the APP: <br/>

    npm run server <br/>

## Task Structure

### Task Schema :
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
        title: { type: String, required: true },
        description: { type: String },
        createdDate: { type: Date },
        status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
    }

### User Schema :

    {
        name:{type:String, required:true},
        email: {type:String, required:true,unique:true},
        password: {type:String, required:true}
    }


## API Endpoints :

POST /tasks: Add a new task to Database.<br/>
GET /tasks: Retrieve a list of all tasks from Database.<br/>
GET /tasks/:id Retrieve a specific task by task-ID.<br/>
PUT /tasks/:id Update a specific task by task-ID.<br/>
PATCH /tasks/:id Update a specific task by task-ID.<br/>
DELETE /tasks/:id Delete a specific task by task-ID.<br/>


## Authentication Endpoints 

POST /user/register: Register a new user.<br/>
POST /user/login: Authenticate and login a user.<br/>
POST /user/logout: Logout a user from application.<br/>

## User Endpoints

GET /user: Get user information from Database.<br/>
PUT /user : Update user informations. <br/>
PATCH /user : Update user informations. <br/>
DELETE /user : Delete user Account. <br/>

## Authentication:

To use authentication, you must register and log in to manage tasks. Protected endpoints require authentication which is being handle by JWT authentication.

## Error Handling

Appropriate HTTP status codes and error messages will be returned in case of errors occurs during requests.

## Logging 

API requests and responses is being logged into a apilogs.txt file using which we can track all requests.

## Rate Limiting 

Rate limiting is applied to restrict the number of requests from clients within a specified time period so our server won't get overloaded by too many requests.

<h1 align="center">Thank You.⭐</h1>