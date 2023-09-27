// Create a middleware function to log response status codes
const logResponseStatus = (req, res, next) => 
{
    let dateTime = Date();
    let dateT = dateTime.split(' GMT');
    res.on('finish', () => 
    {
        console.log(`[${dateT[0]}] ${req.protocol} ${req.method} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
};

module.exports = logResponseStatus;