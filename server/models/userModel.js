const mongoose   = require("mongoose");
const validator  = require("validator");
const bcrypt     = require("bcryptjs");
const jwt        = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is mandatory"],
        minLength: [4, "Name must be at least 4 characters"],
        maxLength: [30, "Name cannot be more than 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Email must be present"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password has to be at least 8 character"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type:String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// just before saving the user hash the password
userSchema.pre("save", async function(next) {
    // if the password field is not modified do nothing
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJWTToken = function() {
    const token = jwt.sign(
        {id: this._id}, 
        process.env.SECRET, 
        {expiresIn: process.env.JWT_EXPIRE}
    );

    return token;
}

userSchema.methods.checkPassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);