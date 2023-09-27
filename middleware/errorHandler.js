const {constants} = require('../constants');
//building this middleware which gonna accept req and res and convert it to JSON Object
//as before we were having an error as html
const errorHandler =  (err, req, res, next) => {
    //if we have statusCode then it will be given otherwise 500 
    console.log(res.statusCode);
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log("Error Handler Middleware");

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

            case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

            case constants.UNAUTHORIZED:
            res.json({
                title: "Un-Authorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

            case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

            case constants.SERVER_ERROR:
            res.json(
                {
                    title: 'Internal Server Error',
                    message: err.message,
                    stackTrace: err.stack,
                });
    
        default:
            console.error('An error occurred:', err);
            res.status(500).json(
            {
                title: 'Internal Server Error',
                message: 'Something went wrong on the server.',
                stackTrace: err.stack,
            });
            break;
        }

    // // Call next() to continue the middleware chain
    // next();
};

module.exports = errorHandler;