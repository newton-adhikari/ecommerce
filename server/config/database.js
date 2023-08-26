const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(res => {
            console.log(`database connected at ${res.connection.host}`)
        })
}

module.exports = { connectDatabase }