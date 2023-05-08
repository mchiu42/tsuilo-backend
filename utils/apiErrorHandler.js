require('dotenv').config()
const { NODE_ENV } = process.env
const apiResponse = require('./apiResponse')

function handler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return apiResponse({
            success: false,
            code: 401,
            message: 'Unauthorized',
        }, res)
    }
    return apiResponse({
        success: false,
        code: 500,
        message: 'Internal Server Error',
    }, res)
}

module.exports = handler;