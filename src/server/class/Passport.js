const db = require("./pgexpress");
const passport = require("passport");
const LocalStrategy = require("passport-local"); //
//const { Token } = require("./Tokendb");
//const TokenBD = new Token();
//var soap = require("soap");

// Usa base de datos en PostgreSQL
passport.use(
  "local-pg",
  new LocalStrategy(
    { usernameField: "user", passwordField: "pwd", passReqToCallback: true },
    async (req, user, pwd, done) => {
      try {
        let query = {
          name: "login",
          text: `SELECT users.fn_login($1::TEXT, $2::TEXT)`,
          values: [user, pwd],
        };
        let respg = await db.query(query);

        if (respg.rows.length > 0) {
          let r = respg.rows[0].fn_login;
          if (r.login) {
            return done(null, r);
          } else {
            return done(null, r, { message: r.message });
          }
        } else {
          return done(null, false, { message: "No se pudo" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "user", passwordField: "pwd", passReqToCallback: true },
    (req, user, pwd, done) => {
      let result = {
        message: "Bienvenid@ demo",
        login: true,
        user: {
          profile: null,
          username: "demo",
          fullname: "Usuario DEMO",
          multilogin: true,
          payload: { iduser: 1, rowkey: 999 },
        },
      };

      try {
        if (user == "demo" && pwd == "demo") {
          return done(null, result);
        } else {
          result.login = false;
          result.message = "Acceso no permitido";
          return done(null, result, { message: "No tiene acceso" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
