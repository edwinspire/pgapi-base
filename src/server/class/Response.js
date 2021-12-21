"use strict";
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

  static SOAPGenericClient(wsdl, SOAPFunctionName, RequestArgs) {
    console.log("SOAPGenericClient", wsdl, SOAPFunctionName, RequestArgs);
    return new Promise((resolve, reject) => {
      try {
        if (wsdl && wsdl.length > 0) {
          if (SOAPFunctionName && SOAPFunctionName.length > 0) {
            console.log("SOAPGenericClient createClient", wsdl);
            soap.createClient(wsdl, (err, client) => {

              console.log("SOAPGenericClient createClient Error", err);
              console.log("SOAPGenericClient createClient Error", client);
              if (err) {
                reject(err);
              } else {
                console.log("SOAPGenericClient createClient SOAPFunctionName: ", SOAPFunctionName, client.describe());

                client[SOAPFunctionName](
                  RequestArgs,
                  (err1, result) => {
                    console.log("SOAPGenericClient createClient SOAPFunctionName Terminada: ", err1);
                    //console.log(rawRequest);
                    if (err1) {
                      console.trace(err1);
                      reject(err1);
                    } else {
                      resolve(result);
                    }
                  }
                );
              }
            });
          } else {
            reject({ error: "No se ha definido la funcion SOAP" });
          }
        } else {
          reject({ error: "No se ha definido la URL del WSDL" });
        }
      } catch (error) {
        reject({ error: error.message });
      }
    });
  }

  async DriverGenericSOAP(pgdata, req, res) {
    let wsdl = pgdata.wsdl || req.body.wsdl;
    let args_data = pgdata.args || req.body.args || {};
    let Soapfunction = pgdata.SOAPFunction || req.body.SOAPFunction || {};

    try {
      let soap_response = await Response.SOAPGenericClient(
        wsdl,
        Soapfunction,
        args_data
      );
      res.status(200).json(soap_response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async DriverMsSql(pgdata, req, res) {
    try {
      let query = pgdata.query || req.body.query;
      let connection_params =
        pgdata.connection_string ||
        pgdata.connection_params ||
        req.body.connection_params;
      let query_params = pgdata.query_params || req.body.query_params;
      let sql = new TediousMssql(connection_params);
      const result = await sql.execSql(query, query_params);
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
