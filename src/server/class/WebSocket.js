import ws from "ws";
const EventEmitter = require("events");
//const { MQTT_SERVER } = process.env;

export class WebSocketPlugin extends EventEmitter {
  constructor(http_server) {
    super();

    this.WebSocket = new ws.Server({ noServer: true });
    WebSocket.on("connection", (socket) => {
      this.emit("connect", {});
      socket.on("message", (message) => {
        this.emit("message", message);
        console.log(message);
      });
    });

    http_server.on("upgrade", (request, socket, head) => {
      this.WebSocket.handleUpgrade(request, socket, head, (socket) => {
        this.WebSocket.emit("connection", socket, request);
      });
    });
  }

  emit(topic, message) {
    console.log("emit", topic, message.toString());
    let msg;
    let toffmsg = typeof message;

    if (toffmsg === "string" || toffmsg === "null" || toffmsg === "undefined") {
      msg = message;
    } else {
      msg = JSON.stringify(message);
    }

    this.WebSocket.send({ topic: topic, message: msg });
  }
}
