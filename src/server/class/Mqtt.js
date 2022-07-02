const mqtt = require("mqtt");
const EventEmitter = require("events");
const { MQTT_SERVER } = process.env;

export class MqttPlugin extends EventEmitter {
  constructor(topics, mqtt_server) {
    super();
    let server = mqtt_server || MQTT_SERVER;
    console.log(server);
    this.MqttClient = mqtt.connect(server);

    this.MqttClient.on("connect", () => {
      this.emit("connect", {});

      this.MqttClient.subscribe("presence", (err) => {
        if (!err) {
          this.MqttClient.publish("presence", "Hello mqtt");
        }
      });

      if (Array.isArray(topics)) {
        topics.forEach((topic) => {
          this.MqttClient.subscribe(topic, function (err) {
            if (err) {
              console.error(err);
            }
          });
        });
      }
    });

    this.MqttClient.on("message", (topic, message) => {
      console.log(topic, message.toString());
      this.emit(topic, message);
    });
  }

  emit(topic, message) {
    console.log("Publish", message.toString());
    this.MqttClient.publish(topic, message);
  }
}
