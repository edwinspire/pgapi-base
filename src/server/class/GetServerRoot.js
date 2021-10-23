//require("dotenv").config({ override: true });
const { PORT, OMS_SERVER } = process.env;
module.exports = function GetServerRoot() {
    return OMS_SERVER + ":" + PORT;
}