const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler( async(req, res, next) => 
{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")) 
    {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => 
        {
            if(err)
            {
                res.status(401);
                throw new Error("User is Un-authorized or token is missing");
            }
            //Attaching the user information to req.user for further usage in the route handlers that come after this middleware in the request processing pipeline.
            req.user = decoded.user;    
            next();
        }
        );

        if(!token)
        {
            res.status(401);
            throw new Error("User in not authorized or token is missing");
        }
    }
    else
    {
        res.status(401);
        throw new Error("JWT Missing");
    }
}
);

module.exports = validateToken;