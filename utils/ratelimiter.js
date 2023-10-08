
const { rateLimit }  = require('express-rate-limit');

const rateLimiting = rateLimit({
    windowMs: 60 * 1000,
    max: 5, 
    message: 'Too many requests from this IP Address., please try again after one minit.',
});

module.exports = { rateLimiting }