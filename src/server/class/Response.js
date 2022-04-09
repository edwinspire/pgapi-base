"use strict";
import { Token } from "./Tokendb";
const soap = require("soap");
const TediousMssql = require("@edwinspire/tedious-mssql");
const PromiseUtils = require("@edwinspire/sequential-promises");
const uFetch = require("@edwinspire/universal-fetch");

const { DEGUB_MODE } = process.env;

export class Response {
  constructor() {}
  execute(function_name, pgdata, req, res) {
    console.log("Execute: " + function_name);
    try {
      this[function_name](pgdata, req, res);
    } catch (error) {
      //console.trace(error);
      res
        .status(500)
        .json({ error: error.message, function_name: function_name });
    }
  }
  Test(pgdata, req, res) {
    res
      .status(200)
      .json({ ok: "Personalizado y llamado por pgapi", data: pgdata });
  }

  //static async SOAPGenericClient(wsdl, SOAPFunctionName, RequestArgs) {
  static async SOAPGenericClient(SOAPParameters) {
    console.log("SOAPGenericClient", SOAPParameters);

    try {
      if (
        SOAPParameters &&
        SOAPParameters.wsdl &&
        SOAPParameters.wsdl.length > 0
      ) {
        if (
          SOAPParameters.FunctionName &&
          SOAPParameters.FunctionName.length > 0
        ) {
          //      console.log("SOAPGenericClient createClient", wsdl);
          //         console.log("SOAPGenericClient createClient", wsdl);

          let client = await soap.createClientAsync(SOAPParameters.wsdl);

          if (
            SOAPParameters.BasicAuthSecurity &&
            SOAPParameters.BasicAuthSecurity.User
          ) {
            client.setSecurity(
              new soap.BasicAuthSecurity(
                SOAPParameters.BasicAuthSecurity.User,
                SOAPParameters.BasicAuthSecurity.Password
              )
            );
          }

          //console.log("SOAPGenericClient createClient", client);
          let result = await client[SOAPParameters.FunctionName + "Async"](
            SOAPParameters.RequestArgs
          );
          let r = await result;
          console.log("SOAPGenericClient result", r);
          return r[0];
        } else {
          return { error: "No se ha definido la funcion SOAP" };
        }
      } else {
        return { error: "No se ha definido la URL del WSDL" };
      }
    } catch (error) {
      console.trace(error);
      return { error: error.message };
    }
  }

  async DriverGenericSOAP(pgdata, req, res) {
    //    let wsdl = pgdata.wsdl || req.body.wsdl || pgdata.SOAP.wsdl || req.body.SOAP.wsdl;
    let args_data = pgdata.args || req.body.args || {};
    /*
    let Soapfunction = pgdata.SOAPFunction || pgdata.SOAP.Function || req.body.SOAPFunction || req.body.SOAP.Function || {};
*/
    let SOAPParameters = pgdata.SOAP || req.body.SOAP || {};
    SOAPParameters.RequestArgs = args_data;

    try {
      let soap_response = await Response.SOAPGenericClient(SOAPParameters);
      res.status(200).json(soap_response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async DriverMsSqlMultiRequest(pgdata, req, res) {
    try {
      let NumberThreads = pgdata.NumberThreads || req.body.NumberThreads;
      let paramsQueries = pgdata.paramsQueries || req.body.paramsQueries;

      let rDoc = await PromiseUtils.ByBlocks(
        async (paramsQuery) => {
          try {
            let sql = new TediousMssql(paramsQuery.connection_params);
            const result = await sql.execSql(
              paramsQuery.query,
              paramsQuery.params
            );
            res.status(200).json(result.rows);
          } catch (error) {
            return {
              query: paramsQuery,
              error: error.message,
            };
          }
        },
        paramsQueries,
        NumberThreads
      );

      let data = rDoc.map((x) => x.value);

      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      //console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  async DriverFetchMultiRequest(pgdata, req, res) {
    try {
      let NumberThreads = pgdata.NumberThreads || req.body.NumberThreads;
      let paramsRequests = pgdata.paramsRequests || req.body.paramsRequests;

      let rDoc = await PromiseUtils.ByBlocks(
        async (paramsRequest) => {
          try {
            const FData = new uFetch();
            let resp = await FData[paramsRequest.Method](
              paramsRequest.Url,
              paramsRequest.Params,
              req.headers
            );
            return await resp.json();
          } catch (error) {
            return {
              request: paramsRequest,
              error: error.message,
            };
          }
        },
        paramsRequests,
        NumberThreads
      );

      let data = rDoc.map((x) => x.value);
      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      //console.log(err);
      res.status(500).json({ error: err.message });
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
      //console.log(err);
      res.status(500).json({ error: err.message });
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
