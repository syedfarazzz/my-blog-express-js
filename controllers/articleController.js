const Article = require("../models/articleModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
// const { options } = require("../routes/auth");

//@desc Create Article
//@route POST /api/articles/
//@access public
const createArticle = asyncHandler( async(req, res, next) => 
{
    const { postTitle, question, description, views, tags } = req.body;
    const currentUser = req.user;
    
    const article = await Article.create(
        {
            postTitle,
            question,
            description,
            publisher: currentUser.id,
            views,
            tags
        }
    )
    
    // Update the user's articles array
    await User.findByIdAndUpdate(currentUser.id, { $push: { articles: article._id }, });    // Add the article's _id to the user's articles array
    // The $ prefix is used to indicate that you are using an array update operator. 

    res.status(201).json(article);
}
);

const getArticles = asyncHandler( async(req, res, next) => 
{
    const article = await Article.find().populate('publisher');
    
    //path and match and Like, $eq, $ne, $gte
    // const article = await Article.find().populate({
    //     path: 'publisher',
    //     match: {email: { $regex: '.*gmail.*', $options: 'i'}}
    // });

    // const article = await Article.find().populate({
    //     path: 'publisher',
    //     select: "name -_id"
    //     select: ['name', 'email'],
    //     options: {
    //         sort: { email: -1 },             // 1 is for asscending and -1 is for descending
    //         limit: 2
    //     }
    // });
    
    res.status(200).json(article);
}
);

const getArticleById = asyncHandler( async(req, res, next) => 
{
    const article = await Article.findById(req.params.id).populate('publisher');
    
    res.status(200).json(article);
}
);

const updateArticle = asyncHandler( async(req, res, next) => 
{
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {new:true}).populate('publisher');
    
    res.status(200).json(article);
}
);

const deleteArticle = asyncHandler( async(req, res, next) => 
{
    const article = await Article.findByIdAndDelete(req.params.id, req.body, {new:true}).populate('publisher');
    
    res.status(200).json(article);
}
);

module.exports = { createArticle, getArticles, getArticleById, updateArticle, deleteArticle }