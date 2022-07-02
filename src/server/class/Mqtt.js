const mqtt = require("mqtt");
const EventEmitter = require("events");
const { MQTT_SERVER } = process.env;

export class MqttCommunication extends EventEmitter {
  constructor(topics, mqtt_server) {
    super();
    let server = mqtt_server || MQTT_SERVER;
    console.log(server);
    this.client = mqtt.connect(server);

    this.client.on("connect", () => {
      this.emit("connect", {});

      this.client.subscribe("presence", (err) => {
        if (!err) {
          this.client.publish("presence", "Hello mqtt");
        }
      });

      if (Array.isArray(topics)) {
        topics.forEach((topic) => {
          this.client.subscribe(topic, function (err) {
            if (err) {
              console.error(err);
            }
          });
        });
      }
    });

    this.client.on("message", (topic, message) => {
      console.log(topic, message.toString());
      this.emit(topic, message);
    });
  }

  emit(topic, message) {
    console.log("Publish", message.toString());
    this.client.publish(topic, message);
  }
}
