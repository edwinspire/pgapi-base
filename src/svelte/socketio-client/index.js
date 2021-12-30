const EventEmitter = require("events");
const sioc = require("socket.io-client");
import { writable } from "svelte/store";
const storeChangedTables = writable({});

export class socketIoClient extends EventEmitter {
  constructor() {
    super();
  }

  connect() {
    let url_wwebsocket = window.location.protocol + "//" + window.location.host;
    console.log(url_wwebsocket);
    const socketc = sioc.io(url_wwebsocket);
    socketc.on("connect", function (c) {
      console.log("connected", c);
    });

    socketc.on("pg-change-table", (c) => {
      console.log("pg-change-table", c, changedTables, $changedTables);
      changedTables.set(c);
      /*
        changedTables.subscribe((data) => {
  
          console.log("changedTables", data);
        });
        */
    });
  }
}
