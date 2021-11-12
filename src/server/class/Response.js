import { Token } from "./Tokendb";

const TediousMssql = require("@edwinspire/tedious-mssql");

export class Response {
  constructor() {}
  execute(function_name, pgdata, req, res) {
    console.log("Execute: " + function_name);
    try {
      this[function_name](pgdata, req, res);
    } catch (error) {
      console.trace(error);
      res.status(500).json({ error: error, function_name: function_name });
    }
  }
  Test(pgdata, req, res) {
    res
      .status(200)
      .json({ ok: "Personalizado y llamado por pgapi", data: pgdata });
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

_setToken(res, user){
  var token = new Token();
token.setToken(res, user);
}

  BasicLoginDemo(pgdata, req, res) {
    let authorization = Token.get_authorization(req);

    if (authorization.type == "basic") {
      let user = authorization.user;
      let password = authorization.password;
      if (user == "demo" && password == "demo") {
        res
          .status(200)
          .json({ message: "Personalizado y llamado por pgapi", data: pgdata });
      } else {
        res
          .status(401)
          .json({ message: "Las credenciales no son correctas", data: pgdata });
      }
    } else {
      res
        .status(401)
        .json({ message: "No hay credenciales para el acceso", data: pgdata });
    }
  }
}
