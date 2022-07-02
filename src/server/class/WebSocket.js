import ws from "ws";
const EventEmitter = require("events");
//const { MQTT_SERVER } = process.env;

export class WebSocketCommunication extends EventEmitter {
  constructor(topics, express_server) {
    super();

    this.wsServer = new ws.Server({ noServer: true });
    wsServer.on("connection", (socket) => {
      this.emit("connect", {});
      socket.on("message", (message) => {
        this.emit("message", message);
        console.log(message);
      });
    });

    express_server.on("upgrade", (request, socket, head) => {
      this.wsServer.handleUpgrade(request, socket, head, (socket) => {
        this.wsServer.emit("connection", socket, request);
      });
    });
  }

  emit(topic, message) {
    console.log("emit", topic, message.toString());
    this.wsServer.send({ topic: topic, message: message });
  }
}
