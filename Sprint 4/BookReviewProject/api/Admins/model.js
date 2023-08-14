const mongoose = require("mongoose");
const {isEmail} = require("validator")

const userSchema = new mongoose.Schema(
    { 
        firstName: {
            type: String,
            required: [true, "Please provide your first name"],
            maxlength: [100, "First name can not exceed 100 characters"],
            minlength: [2, "First name can not be less than 2 character"],
        },
        lastName: {
          type: String,
          required: [true, "Please provide your last name"],
          maxlength: [100, "Last name can not exceed 100 characters"],
          minlength: [2, "Last name can not be less than 2 character"],
        },
        email: {
          type: String, 
          require: [true, "Please provide and email"],
          maxlength: [100, "Email can not exceed 100 characters"],
          minlength: [1, "Email can not be less than 1 character"],
          unique: true,
          validation: [ isEmail, "Please enter a vaild email." ]
        },
        password: {
            type: String, 
            required: [true, "Please provide a password"]
        },
        role: {
            type: String,
            enum: {
              values: ["Super-admin", "Admin", "Client"],
              message: "Unknown role name selected",
            },
        },
        is_active: {
            type: Boolean, 
            default: true
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        following_readers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        following_authors: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Author'
        }],
        reviews: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Reviews'
        }],
        favorite_books: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Books'
        }]
    },
        
    { timestamps: true }
    
)

const User = mongoose.model('Users', userSchema);
module.exports = User;