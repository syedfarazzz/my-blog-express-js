const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
    username: {
        type: String,
        required: [true, "Please add the username"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
        validate: {
            validator: function (value) {
              // Use a regular expression to validate the email format
              return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value);
            },
            message: "Please enter a valid email address",
          },
    },
    password: {
        type: String,
        required: [true, "Please add the user Password"]
    },
    dob: {
        type: Date,
        required: [true, "Please Enter DoB"]
    },
    phone: {
        type: Number,
        required: [true, "Please add phone number"]
    },
    interests: {
        type: Array
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    }],
    // likedArticles: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Article'
    // } 
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);

