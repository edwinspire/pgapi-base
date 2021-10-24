"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = void 0;

var _sirv = _interopRequireDefault(require("sirv"));

var _compression = _interopRequireDefault(require("compression"));

var _routes = _interopRequireDefault(require("./class/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  PORT,
  NODE_ENV,
  TOKEN_ENCRYPT
} = process.env;
const dev = NODE_ENV === "development";

const fnAccessPoint = require("./class/fnAccessPoint.js");

const EventEmitter = require("events");

const express = require("express");

const session = require("express-session");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const passport = require("passport");

const {
  pgListen
} = require("./class/pgListen");

const {
  SocketIO
} = require("./class/SocketIO");

const {
  Token
} = require("./class/Tokendb");

class Server extends EventEmitter {
  constructor({
    credentials,
    cluster,
    listen_notification_list,
    custom_response,
    sapper
  }) {
    super();
    this.credentials = credentials;
    this.cluster = cluster;

    if (listen_notification_list && listen_notification_list.length > 0) {
      new pgListen(listen_notification_list).on("notification", notify => {
        this.emit("pgNotify", notify);
      });
    }

    this.token = new Token();

    this.socketio = () => {};

    this.app = express(); //instancia de express

    this.app.use(morgan("dev"));
    this.app.use(cookieParser(TOKEN_ENCRYPT));
    this.app.use(express.json({
      strict: false,
      limit: 100000000
    })); //-- Limit 100M

    this.app.use(express.urlencoded({
      limit: "100mb",
      extended: true
    }));
    this.app.use(session({
      secret: TOKEN_ENCRYPT,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        // 1 hour
        httpOnly: true,
        //secure: false, // Uncomment this line to enforce HTTPS protocol.
        sameSite: true
      }
    }));
    this.app.use(passport.initialize());

    require("./class/Passport");

    this.app.all("/pgapi*", async (req, res) => {
      fnAccessPoint(req, res, custom_response);
    });
    this.app.use(_routes.default);
    this.app.use((0, _compression.default)({
      threshold: 0
    }), (0, _sirv.default)("static", {
      dev
    }), sapper.middleware({
      // customize the session
      session: (req, res) => {
        let userT;

        try {
          userT = this.token.getUserFromRequest(req);
        } catch (error) {
          console.trace(error);
        }

        return {
          user: userT
        };
      }
    }));
  }

  run() {
    let iToken = new Token();
    iToken.deleteAll();
    let httpServer;

    if (!process.env.LOCAL_SERVER) {
      httpServer = require("http").createServer(this.app);
      console.log("Usando HTTP");
    } else {
      httpServer = require("https").createServer(this.credentials, this.app);
      console.log("Usando HTTPS");
    }

    if (httpServer) {
      this.socketio = SocketIO(httpServer);
      httpServer.on("error", e => {
        console.trace(e);
      });
      httpServer.listen(PORT, () => {
        if (this.cluster) {
          console.log("App listening on port " + PORT + " " + this.cluster.worker.id);
        } else {
          console.log("App listening on port " + PORT);
        }
      });
    }
  }

  get clients() {
    return this.socketio.sockets.sockets;
  }

}

exports.Server = Server;