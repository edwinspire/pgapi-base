//-- No tiene WebSocket funcional por usar Cluster --//
require("dotenv").config({ override: true });
const jwt = require("jsonwebtoken");
const passport = require("passport");
const flash = require("connect-flash");
const { pgWebPush } = require("@edwinspire/express-pgapi/webpush");
const { Token } = require("@edwinspire/tokens/Tokendb");
const cluster = require("cluster");

//import * as sio from "socket.io";
import * as sapper from "@sapper/server";
import sirv from "sirv";
import compression from "compression";
import pgAccessPoint from "@edwinspire/express-pgapi/pgAccessPoint";
import GeneralRoutes from "@express-routes/routes";
import fs from "fs";

global.fecha = new Date();

var ListSockets = [];

// Para generar los certificados correr el siguiente comando, completar los datos que solicita y copiar los dos archivos que se generan
// openssl req -x509 -nodes -days 1825 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt
var privateKey = fs.readFileSync("./certs/selfsigned.key", "utf8");
var certificate = fs.readFileSync("./certs/selfsigned.crt", "utf8");
var credentials = { key: privateKey, cert: certificate, requestCert: false };

const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { PORT, NODE_ENV, TOKEN_ENCRYPT } = process.env;
const dev = NODE_ENV === "development";
//process.env.LOCAL_SERVER = true;
let iToken = new Token();

// Esto es para que se ejecute solo en el master y no en los workers
if (cluster.isMaster) {
  new pgWebPush();
  //createConnection();
  iToken.deleteAll();
}

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require("os").cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    let worker = cluster.fork();
  }
} else {
  const app = express(); //instancia de express
  app.use(morgan("dev"));
  app.use(cookieParser(TOKEN_ENCRYPT));
  app.use(express.json({ strict: false, limit: 50000000 })); //-- Limit 50M
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: TOKEN_ENCRYPT,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 2 * 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        //secure: false, // Uncomment this line to enforce HTTPS protocol.
        sameSite: true
      },
    })
  );
  app.use(passport.initialize());
  //  app.use(passport.session());

  require("@edwinspire/express-pgapi/Passport");

  app.use(flash());
  app.use(GeneralRoutes);
  app.use(pgAccessPoint);

  app.use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      // customize the session
      session: (req, res) => {

        let userT;
        try {
          let tokeUser = req.cookies["TOKEN_USER"];
          console.log(tokeUser, req.session);
          userT = iToken.verify(tokeUser)
        } catch (error) {
          console.trace(error);
        }
        return { user: userT, nada: 122222 };
      },
    })
  );

  console.log(process.env.LOCAL_SERVER, process.env.DATABASE_URL);

  let httpServer;

  if (!process.env.LOCAL_SERVER) {
    httpServer = require("http").createServer(app);
    console.log("Usando HTTP");
  } else {
    httpServer = require("https").createServer(credentials, app);
    console.log("Usando HTTPS");
  }

  let io = require("socket.io")(httpServer);

  /*
  io.use((socket, next) => {
    console.log(socket);
    next();
  });
*/

  //io.listen();
  io.on("error", (e) => {
    console.trace(e);
  });

  io.on("connection", (socket) => {
    io.emit("chat", "Bienvenido " + socket.id);

    setInterval(() => {
      io.emit("chat", new Date() + " - " + socket.id);
    }, 10 * 1000);
  });

  httpServer.on("error", (e) => {
    console.trace(e);
  });

  httpServer.listen(PORT, () => {
    console.log("App listening on port " + PORT + " " + cluster.worker.id);
  });
}

// Listen for dying workers
cluster.on("exit", function (worker) {
  // Replace the dead worker,
  // we're not sentimental
  console.log("Worker %d died :(", worker.id);
  cluster.fork();
});

//Formato de mensajes que se deben enviar desde ESP32 42["chat",{"id": "67", "name": "p"}]
