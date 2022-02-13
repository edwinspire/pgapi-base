//const Router = require("express-promise-router");
const db = require("./pgexpress");
const { Token } = require("./Tokendb");
const { Response } = require("./Response");
export class AccessPoint {
  constructor(custom_response) {
    if (!(custom_response.prototype instanceof Response)) {
      throw new Error("custom_response must be instance of Response");
    }
    this.pgAPIEndPoints = [];
    this.CustomResponse = new Response();
    this.TokenDB = new Token();
    if (custom_response) {
      this.CustomResponse = new custom_response();
    }
  }

  async _execFunctionMethod(pgAPI, data) {
    try {
      let query = {
        //name: "execFunctionMethod",
        text: `SELECT api.${pgAPI.fn_method}($1::JSON) as fn_method;`,
        values: [JSON.stringify(data)],
      };

      let respg = await db.query(query);
      //console.log('>>>>>> _execFunctionMethod', pgAPI, data, respg);
      if (respg.rows && respg.rows.length > 0) {
        //console.log('fn_method >>>>>> ',respg.rows[0].fn_method);
        return respg.rows[0].fn_method;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

  async Middleware(req, res, next) {
    if (!req.originalUrl.startsWith("/pgapi")) {
      next();
    } else {
      try {
        let user = await this.TokenDB.getUserFromRequest(req);

        const myURL = new URL("https://" + req.hostname + req.originalUrl);
        //console.log(myURL);
        let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        let idata = {
          cookies: req.cookies,
          body: req.body,
          query: req.query,
          method: req.method,
          pathname: myURL.pathname,
          ipclient: ip,
          headers: req.headers,
          user: user,
          //  token: toke_user
        };

        let query = {
          name: idata.method,
          text: `SELECT api.fn_access_point($1::JSON)`,
          values: [JSON.stringify(idata)],
        };
        let respgapi = await db.query(query);
        //console.log(respgapi);
        if (
          respgapi &&
          respgapi.rows &&
          respgapi.rows.length > 0 &&
          respgapi.rows[0] &&
          respgapi.rows[0].fn_access_point
        ) {
          let r = respgapi.rows[0].fn_access_point.endpoint;

          if (!r.endpoint_enabled) {
            res.status(404).json(r.data);
          } else if (
            r.ispublic ||
            (!r.ispublic && idata.user && idata.user.username)
          ) {
            idata.body = req.body;
            idata.query = req.query;
            let rexec = await this._execFunctionMethod(r, idata);
            //console.log('rexec>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', r, rexec);
            if (rexec && rexec.EXECUTE) {
              this.CustomResponse.execute(rexec.EXECUTE, rexec, req, res);
            } else {
              res.status(200).json(rexec);
            }
          } else if (!r.ispublic && !(idata.user && idata.user.username)) {
            res.cookie(
              "TOKEN_USER",
              {},
              {
                expire: 1,
              }
            );
            res.status(401).location("/").end();
          } else {
            res.status(204).json(r.data);
          }
        } else {
          res.status(204).json([]);
        }
      } catch (e) {
        console.trace(e);
        res.status(500).json(e);
      }
    }
  }
}
