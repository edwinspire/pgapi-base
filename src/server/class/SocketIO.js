export function SocketIO(httpServer) {

  let io = require("socket.io")(httpServer, {

    allowEIO3: true // false by default

  });
//console.log(io.engine);
  io.on("error", (e) => {
    console.trace(e);
  });

  /*
  io.on('connection', (s) => {
    s.emit("chat", "Bienvenido " + s.id);
  });
*/
/*
  io.engine.on("connection_error", (err) => {
    //console.log(err.req);	     // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });
*/
  /*
  io.on("connection", (socket) => {
    
    socket.on("register", (socket1) => {
      socket.emit("registred", socket1);
      console.log("Registrado");
    });
    io.emit("connected", "Welcome...");
    console.log("Inicio websocket");
    
  });
  */
 
  return io;
}