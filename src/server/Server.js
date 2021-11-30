const { PORT, NODE_ENV, TOKEN_ENCRYPT, EXPRESSJS_SERVER_TIMEOUT } = process.env;
const dev = NODE_ENV === "development";
import sirv from "sirv";
import compression from "compression";
const AccessPoint = require("./class/fnAccessPoint.js").AccessPoint;
import GeneralRoutes from "./class/routes";
const EventEmitter = require("events");
const express = require("express");
//const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { pgListen } = require("./class/pgListen");
const { SocketIO } = require("./class/SocketIO");
const { Token } = require("./class/Tokendb");

export class Server extends EventEmitter {
  constructor({
    credentials,
    cluster,
    listen_notification_list,
    custom_response,
    sapper,
  }) {
    super();
    this.credentials = credentials;
    this.cluster = cluster;
    this.AccessPoint = new AccessPoint(custom_response);

    if (listen_notification_list && listen_notification_list.length > 0) {
      new pgListen(listen_notification_list).on("notification", (notify) => {
        this.emit("pgNotify", notify);
      });
    }

    this.token = new Token();
    this.token.deleteAll();
    this.socketio = () => {};

    this.app = express(); //instancia de express
    this.app.use(morgan("dev"));
    this.app.use(cookieParser(TOKEN_ENCRYPT));
    this.app.use(express.json({ strict: false, limit: 100000000 })); //-- Limit 100M
    this.app.use(express.urlencoded({ limit: "100mb", extended: true }));
    this.app.use(express.bodyParser({limit: '100mb'}));
    /*
    this.app.use(
      session({
        secret: TOKEN_ENCRYPT,
        resave: true,
        saveUninitialized: true,
        cookie: {
          maxAge: 2 * 60 * 60 * 1000, // 1 hour
          httpOnly: true,
          //secure: false, // Uncomment this line to enforce HTTPS protocol.
          sameSite: true,
        },
      })
    );
    */
    /*
    this.app.all("/pgapi*", async (req, res) => {
      fnAccessPoint(req, res, custom_response);
    });
*/

    //console.log(this.AccessPoint.Middleware);

    this.app.use((req, res, next) => {
      this.AccessPoint.Middleware(req, res, next);
    });

    //this.app.use(passport.initialize());
    //require("./class/Passport");
    this.app.use(GeneralRoutes);

    this.app.use(
      compression({ threshold: 0 }),
      sirv("static", { dev }),
      sapper.middleware({
        // customize the session
        session: (req, res) => {
          let userT;
          try {
            userT = this.token.getUserFromRequest(req);
          } catch (error) {
            console.trace(error);
          }
          return { user: userT };
        },
      })
    );
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
      //      httpServer.timeout = EXPRESSJS_SERVER_TIMEOUT||120000;
      this.socketio = SocketIO(httpServer);

      httpServer.on("error", (e) => {
        console.trace(e);
      });

      httpServer.listen(PORT, () => {
        if (this.cluster) {
          console.log(
            "App listening on port " + PORT + " " + this.cluster.worker.id
          );
        } else {
          console.log("App listening on port " + PORT);
        }
      });

      let rto = 1000 * 60 * 5;
      if (EXPRESSJS_SERVER_TIMEOUT && Number(EXPRESSJS_SERVER_TIMEOUT) > 1000) {
        rto = Number(EXPRESSJS_SERVER_TIMEOUT);
      }

      httpServer.setTimeout(rto); // Para 5 minutos
    }
  }

  get clients() {
    return this.socketio.sockets.sockets;
  }
}
