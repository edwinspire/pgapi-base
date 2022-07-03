//const dotenv = require("dotenv");
//dotenv.config();
//const connectionString = process.env.DATABASE_URL;
//TODO: Cuando se pierde conexion con la base de datos, se cae el servidor. Revisar
const { DATABASE_URL, PG_WITH_SSL_REJECTUNAUTHORIZED_FALSE } = process.env;

const EventEmitter = require("events");
const { Client } = require("pg");

export class pgListen extends EventEmitter {
  constructor(channel_list) {
    super();
    this.isConnected = false;
    this.isConnecting = false;
    this.client = new Client(this.clientParams());

    if (channel_list && Array.isArray(channel_list) && channel_list.length > 0) {
      let events = channel_list.map((event) => {
        return 'LISTEN "' + event + '";';
      });

      this.query = events.join(" ");

      //this.connect();
      setInterval(() => {
        this._connect();
      }, 5000);
    }
  }

  clientParams() {
    let pgClientParams = {
      connectionString: DATABASE_URL,
    };
    console.log(PG_WITH_SSL_REJECTUNAUTHORIZED_FALSE);
    if (PG_WITH_SSL_REJECTUNAUTHORIZED_FALSE === "true") {
      console.log("PG_WITH_SSL_REJECTUNAUTHORIZED_FALSE");

      pgClientParams = {
        connectionString: DATABASE_URL,
        // Solo para Heroku
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }
    return pgClientParams;
  }

  async _connect() {
    if (!this.isConnected && !this.isConnecting) {
      this.isConnecting = true;
      console.log("pgListen: connecting", this.isConnecting);
      try {
        delete this.client;
        this.client = new Client(this.clientParams());

        this.client.on("error", (err) => {
          console.trace(err.stack);
        });

        this.client.on("end", () => {
          console.log("END LISTEN");
          this.isConnected = false;
        });

        this.client.on("notification", (not) => {
          this.isConnected = true;
          this.emit("notification", not);
        });

        await this.client.connect();
        await this.client.query(this.query);
        console.log("pgListen: connected");
        this.isConnected = true;
        this.isConnecting = false;
      } catch (error) {
        this.isConnected = false;
        this.isConnecting = false;
        console.trace(error.stack);
        this.client.end();
      }
    }
  }
}
