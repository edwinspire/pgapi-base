const mqtt = require("mqtt");
const EventEmitter = require("events");
const { MQTT_SERVER } = process.env;

export class MqttPlugin extends EventEmitter {
  constructor(mqtt_config) {
    super();

    let { topics, mqtt_server, options } = mqtt_config;

    let server = mqtt_server || MQTT_SERVER;
    console.log(server);
    this.MqttClient = mqtt.connect(server, options);

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
      let msg;
      try {
        msg = JSON.parse(message.toString());
      } catch (error) {
        msg = message.toString();
      }

      this.emit(topic, msg);
    });
  }

  convert_message(message) {
    let msg;
    let toffmsg = typeof message;

    if (toffmsg === "string" || toffmsg === "null" || toffmsg === "undefined") {
      msg = message;
    } else {
      msg = JSON.stringify(message);
    }

    return msg;
  }

  send(topic, message) {
    this.MqttClient.publish(topic, this.convert_message(message));
  }
}
