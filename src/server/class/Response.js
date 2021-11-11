const TediousMssql = require("@edwinspire/tedious-mssql");

export class Response {
  constructor() {}
  execute(function_name, pgdata, req, res) {
    try {
      this[function_name](pgdata, req, res);
    } catch (error) {
      console.trace(error);
      res.status(500).json({ error: error, function_name: function_name });
    }
  }
  Test(pgdata, req, res) {
    res.status(200).json({ ok: "Personalizado y llamado por pgapi" });
  }

  async DriverMsSql(pgdata, req, res) {
    try {
      let query = pgdata.query;
      let sql = new TediousMssql(pgdata.connection_string);
      const result = await sql.execSql(query, pgdata.query_parameters);
      res.status(200).json(result.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  DrivePassport(pgdata, req, res) {
      console.log(pgdata);
    passport.authenticate(PASSPORT_STRATEGY, { session: false }),
      async function (req, res) {
        try {
          let user = req.user.user;
          let token = await TokenDB.token(
            req,
            user.username,
            user.fullname,
            user.multilogin,
            user.profile,
            user.payload
          );
          if (token) {
            res.cookie("TOKEN_USER", token, {
              expire: 3600 * 1000 * 24 * 365 * 50, // Expira en 10 años, sin ambargo internamente el token tiene su propia fecha de expiración
            });
            res.json(req.user);
          } else {
            res.status(500).json({ message: "Token not generated" });
          }
        } catch (e) {
          console.error(e);
          res.status(500).json(e);
        }
      };
  }
}
