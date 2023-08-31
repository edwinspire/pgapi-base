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
  TOKEN_ENCRYPT,
  EXPRESSJS_SERVER_TIMEOUT,
  PGAPI_DEBUG
} = process.env;
const dev = NODE_ENV === "development";

const AccessPoint = require("./class/fnAccessPoint.js").AccessPoint;

const EventEmitter = require("events");

const express = require("express");

var methodOverride = require("method-override");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const {
  pgListen
} = require("./class/pgListen");

const {
  WebSocketPlugin
} = require("./class/WebSocket");

const {
  MqttPlugin
} = require("./class/Mqtt"); //const { SocketIO } = require("./class/SocketIO");


const {
  Token
} = require("./class/Tokendb");

var bodyParser = require("body-parser");

class Server extends EventEmitter {
  constructor({
    credentials,
    cluster,
    pg_listen_channel_list,
    custom_response,
    sapper,
    mqtt_config
  }) {
    super();
    this.credentials = credentials;
    this.cluster = cluster;
    this.AccessPoint = new AccessPoint(custom_response);
    this.pg_listen_channel_list = pg_listen_channel_list;
    this.WebSocket = undefined;

    if (mqtt_config) {
      this.Mqtt = new MqttPlugin(mqtt_config);
    } // console.log("pg_listen_channel_list",pg_listen_channel_list);

    /*
    if (pg_listen_channel_list && pg_listen_channel_list.length > 0) {
      new pgListen(pg_listen_channel_list).on("notification", (notify) => {
        this.emit("pgNotify", notify);
      });
    }
    */


    this.token = new Token();
    this.token.deleteAll();

    this.socketio = () => {};

    this.app = express(); //instancia de express

    this.app.use(morgan("dev"));
    this.app.use(methodOverride());
    this.app.use(cookieParser(TOKEN_ENCRYPT));
    this.app.use(bodyParser.json({
      strict: false,
      limit: "100mb"
    })); //-- Limit 100M

    this.app.use(bodyParser.urlencoded({
      limit: "100mb",
      extended: true
    }));
    this.app.use(bodyParser({
      limit: "100mb"
    }));
    this.app.use((req, res, next) => {
      this.AccessPoint.Middleware(req, res, next);
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
      // Se crea el servidor de websocket
      this.WebSocket = new WebSocketPlugin(httpServer);
      /*
      setInterval(() => {
        this.WebSocket.broadcast("prueba", { hola: 1234, fecha: Date.now() });
        this.Mqtt.send("prueba", { hola: 1234, fecha: Date.now() });
      }, 5000);
      */
      // Se capturan notificaciones de postgres si se ha configurado canales para escuchar

      console.log("this.pg_listen_channel_list", this.pg_listen_channel_list);

      if (this.pg_listen_channel_list && Array.isArray(this.pg_listen_channel_list) && this.pg_listen_channel_list.length > 0) {
        new pgListen(this.pg_listen_channel_list).on("notification", notify => {
          this.emit("pgNotify", notify);

          if (this.WebSocket) {
            this.WebSocket.broadcast("pgNotify", notify);
          }

          if (this.Mqtt) {
            this.Mqtt.send("pgNotify", notify);
          }
        });
      }

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
      let rto = 1000 * 60 * 5;

      if (EXPRESSJS_SERVER_TIMEOUT && Number(EXPRESSJS_SERVER_TIMEOUT) > 1000) {
        rto = Number(EXPRESSJS_SERVER_TIMEOUT);
      }

      console.log("EXPRESSJS_SERVER_TIMEOUT: " + EXPRESSJS_SERVER_TIMEOUT);
      httpServer.setTimeout(rto); // Para 5 minutos
    }
  }
  /*
  get clients() {
    return this.socketio.sockets.sockets;
  }
  */


}

exports.Server = Server;