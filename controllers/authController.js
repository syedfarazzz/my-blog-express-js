const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// express async handler me error throw hota ya exception ati tw mazeed code execute nh hota
// try catch block me code nested likhna parhta hai conditions wrna rest of the code will execute

//@desc Register User
//@route POST /api/auth/register
//@access public
const registerUser = async(req, res, next) => 
{
    try
    {
        const {username , email, password , dob, phone, interests} = req.body;
        const userAvailable = await User.findOne({ email });

        if(!username || !email || !password || !dob || !phone)
        {
            res.status(400);
            throw new Error("All fields are mendatory");
        }
        
        else if(userAvailable)
        {
            res.status(400);
            throw new Error("This Email is in already use");
        }
        
        else 
        {
            //Since we should not store raw password in our Database, So, we hash password
            //Hash Password
            const hashedPassword = await bcrypt.hash(password, 10);     //10 is the number of solved password(no.of times it hashed ig)
            console.log("Hashed Password: ", hashedPassword);
            
            try{ 
            const user = await User.create(
                {
                    username,
                    email,
                    password: hashedPassword,
                    dob,
                    phone,
                    interests
                }
            );
            console.log("after user");
            if(!user)
            {
                res.status(400);
                throw new Error("User Data isn't valid");
            }
            res.status(201).json(user);
            }
            catch(er){
                // console.log(er);
                console.log("before before one");
                res.status(400);
                throw new Error("User Data is not valid");
            }
            // console.log(`User created ${user}`);
            // res.status(201).json(user);
            // if(user)
            // {
                // res.status(201).json({ _id: user.id, email: user.email});

            // }   
        }
    }
    catch(err)
    {
        console.log(err);
        console.log("before next");
        next(err);
    }
}

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All Fields are mendatory");
    }
    const user = await User.findOne({email});

    //compare password with hashpassword
    if(user && (await bcrypt.compare(password, user.password))){
        //Didn't chose the whole fetched user as don't want to embed password
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            // { expiresIn: "15m"}
            { expiresIn: "15h"}
            // { expiresIn: "90d"}
            // { expiresIn: "365d"}

        );
        res.status(200).json({ accessToken });
    }
    else
    {
        res.status(401);
        throw new Error("Username or Password not Correct");
    }
    
});

//@desc Current User Information
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler( async(req, res) => {
    // res.json(req.user);
    const user = await User.findOne({email:req.user.email});
    res.json(user);
});



module.exports = {registerUser, loginUser, currentUser};