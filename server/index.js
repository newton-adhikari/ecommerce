const dotenv = require("dotenv");
const app = require("./app");
const { connectDatabase } = require("./config/database");

// global uncaughtException
process.on("uncaughtException", (err) => {
    console.log(`Error ${err.message}`);
    console.log("Shutting the server down because of uncaught exception");

    process.exit(1);
})

// global unhandledRejction
process.on("unhandledRejection", (err) => {
    console.log(`Error ${err.message}`);
    console.log("shutting down the server due to unhandled rejection");

    process.exit(1);
})

dotenv.config({path: "server/config/config.env"});
connectDatabase();

app.listen(process.env.PORT, () => console.log(`server listening on PORT ${process.env.PORT}`));