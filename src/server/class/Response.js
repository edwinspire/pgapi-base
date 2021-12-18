"use strict"
import { Token } from "./Tokendb";
const soap = require("soap");
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

  DriverGenericSOAP(pgdata, req, res) {
    let wsdl = pgdata.wsdl || req.body.wsdl;
    let args = pgdata.args || req.body.args || {};
    let Soapfunction = pgdata.SOAPFunction || req.body.SOAPFunction || {};

    if (wsdl.length > 0) {
      soap.createClient(wsdl, (err, client) => {
        //console.log("Consulta doc ", documento);
        if (err) {
          res.status(500).json(err);
        } else {
          //    console.log(client.describe());
          if (Soapfunction && Soapfunction.length > 0) {
            client[Soapfunction](args, (err, result) => {
              if (err) {
                console.trace(documento, err);
                res.status(500).json(err);
              } else {
                res.status(200).json(result);
              }
            });
          } else {
            res
              .status(500)
              .json({ error: "No se ha definido la funcion SOAP" });
          }
        }
      });
    } else {
      res.status(500).json({ error: "No se ha definido la URL del WSDL" });
    }
  }

  // TODO : Implementar que los datos necesario para el driver se los pueda obtener tambien extrayendolos del request
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

  _setToken(res, user) {
    var token = new Token();
    token.setToken(res, user);
  }

  LogOut(pgdata, req, res) {
    console.log("LogOut", pgdata);
    let redirect = pgdata.redirect || "/";
    var TokenDB = new Token();
    TokenDB.delete(req.cookies["TOKEN_USER"]);
    res.cookie(
      "TOKEN_USER",
      {},
      {
        expire: 1,
      }
    );
    res.redirect(redirect);
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
