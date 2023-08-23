const dotenv = require("dotenv");
const app = require("./app");
const { connectDatabase } = require("./config/database");

dotenv.config({path: "server/config/config.env"});
connectDatabase();

app.listen(process.env.PORT, () => console.log(`server listening on PORT ${process.env.PORT}`));