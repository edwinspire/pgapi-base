require("dotenv").config({ override: true });
const { PASSPORT_STRATEGY } = process.env;
const Router = require("express-promise-router");
const passport = require("passport");
const router = new Router();
const { Token } = require("./Tokendb");

const TokenDB = new Token();

// Aqui se puede cambiar la estrategia que use passport
router.post(
  "/login",
  passport.authenticate(PASSPORT_STRATEGY, { session: false }),
  async function (req, res) {
    try {
      let user = req.user.user;
      TokenDB.setToken(req, resp, user);
      res.json(req.user);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  }
);

// TODO Borrar, esta ruta es lo de prueba
router.get("/tokens", (req, res) => {
  let tokens = TokenDB.all();
  res.status(200).json(tokens);
});

// TODO Borrar, esta ruta es lo de prueba
router.get("/token/verify", (req, res) => {
  let verify = false;
  if (TokenDB.verify(req.query.token)) {
    verify = true;
  }
  res.status(200).json({ verify: verify });
});

router.get("/oms/logout", (req, res) => {
  TokenDB.delete(req.cookies["TOKEN_USER"]);

  req.logout();
  res.cookie(
    "TOKEN_USER",
    {},
    {
      expire: 1,
    }
  );
  res.redirect("/oms");
});

router.get("/secure_path", TokenDB.validateAsMiddleware, (req, res) => {
  res.status(200).json({ ok: true });
});

/*
// Para subscribir usuarios web-push
router.post('/webpush-subscription', async (req, res) => {
    pushSubscription = req.body;
    fnAccessPoint(req, res);
});
*/

// Para subscribir usuarios web-push
router.get("/push", async (req, res) => {
  console.log("pushSubscription2 =>> " + pushSubscription);
  res.status(200).json({ pushSubscription: pushSubscription });
});

/*
router.all('/pgapi*', async (req, res) => {
    fnAccessPoint(req, res);
})
*/

router.all("/expresstest/test", (req, res) => {
  let q = req.query;
  //    console.log('Inicia', q);

  setTimeout(() => {
    res.status(200).json({ req: q, date: Date.now() });
  }, q.id * 500);
});

module.exports = router;
