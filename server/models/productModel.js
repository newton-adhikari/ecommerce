const mongoose = require("mongoose");

const produtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product must have a name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product must have a description"]
    },
    price: {
        type: Number,
        required: [true, "Product must have a price"],
        maxLength: [8, "Price cannot exceed 8 digits"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        required: [true, "product must belong to a category"]
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        minLength: [4, "Stocks size can't exceed 4 digits"],
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", produtSchema);