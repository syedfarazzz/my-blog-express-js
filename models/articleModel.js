const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
    {
    postTitle: {
        type: String,
        required: [true, "Please add Post Title"],
    },
    question: {
        type: Boolean,
        required: [true, "Select Question option"],
    },
    description: {
        type: String,
        required: [true, "Please add the Description"]
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
    },
    tags: {
        type: Array
    },
    socialLink: {
        type: String,
    },
    categories: {
        type: String,
        required: [true, "Select Category"]
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // comments: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    // },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Article", articleSchema);

