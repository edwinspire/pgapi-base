const dotenv = require("dotenv");
dotenv.config();
//const connectionString = process.env.DATABASE_URL;
const {DATABASE_URL, PG_WITH_SSL_REJECTUNAUTHORIZED_FALSE} = process.env;

const EventEmitter = require('events');
const { Client } = require('pg');

export class pgListen extends EventEmitter {
    constructor(listen_notification_list) {
        super();
        if (listen_notification_list && listen_notification_list.length > 0) {
            let events = listen_notification_list.map((event) => {
                return 'LISTEN "' + event + '";';
            });

            this.query = events.join(' ');

            let pgClientParams = {
                connectionString: DATABASE_URL,
                //ssl: {
                //    rejectUnauthorized: false
               // }
            };
            console.log(PG_WITH_SSL_REJECTUNAUTHORIZED_FALSE);
            if (PG_WITH_SSL_REJECTUNAUTHORIZED_FALSE === 'true'){

                console.log('PG_WITH_SSL_REJECTUNAUTHORIZED_FALSE');

                pgClientParams = {
                    connectionString: DATABASE_URL,
                    // Solo para Heroku 
                    ssl: {
                        rejectUnauthorized: false
                    }
                }
            }

//            console.log(this.query);
            this.client = new Client(pgClientParams);
            this.connect();

        }


    }

    connect() {
        this.client.connect();

        this.client
            .query(this.query)
            .then(result => {
                console.log('START LISTEN')
            })
            .catch((e) => {
                console.trace(e.stack);
            })


        this.client.on('error', err => {
            console.trace(err.stack)
        })

        this.client.on('notification', not => {
            this.emit('notification', not);
        })

    }

}