import ws from "ws";
const EventEmitter = require("events");
//const { MQTT_SERVER } = process.env;

export class WebSocketPlugin extends EventEmitter {
  constructor(express_server) {
    super();

    this.WebSocket = new ws.Server({ noServer: true });
    WebSocket.on("connection", (socket) => {
      this.emit("connect", {});
      socket.on("message", (message) => {
        this.emit("message", message);
        console.log(message);
      });
    });

    express_server.on("upgrade", (request, socket, head) => {
      this.WebSocket.handleUpgrade(request, socket, head, (socket) => {
        this.WebSocket.emit("connection", socket, request);
      });
    });
  }

  emit(topic, message) {
    console.log("emit", topic, message.toString());
    this.WebSocket.send({ topic: topic, message: message });
  }
}
