
/* The issue you're facing is due to the placement of the getAllUsers function inside the object literal. In JavaScript, when defining properties and methods 
within an object literal, you should not use the const keyword. The correct way to export the getAllUsers function as part of the module.exports object is as follows: */

const User = require("../models/userModel");

//@desc Register User
//@route GET /api/users/
//@access public
const getAll = async(req, res) =>
{
    // #swagger.tags = ['User']
    res.status(201).json("Hello");
    // await res.send("hel")
}

//@desc Get All Users
//@route GET /api/users/
//@access public
const getAllUsers = async(req, res) =>
{
    const users = await User.find().populate('articles');
    res.status(200).json(users);
}

//@desc User By Id
//@route GET /api/users/:id
//@access public
const getUserById = async(req, res) =>
{
    const users = await User.findById(req.params.id).populate('articles');
    res.status(200).json(users);
}

module.exports = { getAllUsers, getUserById }


