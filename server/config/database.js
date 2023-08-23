const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(res => {
            console.log(`database connected at ${res.connection.host}`)
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = { connectDatabase }