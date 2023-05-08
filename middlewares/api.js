
function middleware(req, res, next) {
    global.apiResponse = apiResponse;
    next();
}

module.exports = middleware