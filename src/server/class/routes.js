require("dotenv").config({ override: true });
const Router = require("express-promise-router");
const router = new Router();
const { Token } = require("./Tokendb");
const TokenDB = new Token();
/*
router.get("/oms/logout", (req, res) => {
  TokenDB.delete(req.cookies["TOKEN_USER"]);
  res.cookie(
    "TOKEN_USER",
    {},
    {
      expire: 1,
    }
  );
  res.redirect("/oms");
});
*/
module.exports = router;
