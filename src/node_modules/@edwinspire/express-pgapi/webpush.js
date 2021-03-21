const dotenv = require("dotenv");
const webpush = require("web-push");
const { Client } = require('pg')
dotenv.config();

const connectionString = process.env.DATABASE_URL;


console.log(process.env.WEBPUSH_PUBLICK,
    process.env.WEBPUSH_PRIVATEK);

webpush.setVapidDetails(
    'mailto:edwinspir@gmail.com',
    process.env.WEBPUSH_PUBLICK,
    process.env.WEBPUSH_PRIVATEK
);

export class pgWebPush {
    constructor() {
        console.log("Construye Clase pgWebPush");
        const client = new Client({
            connectionString: connectionString,
            ssl: {
                rejectUnauthorized: false
            }
        });
        client.connect();
        // Hay que buscar la forma de reconectar en caso de que se pierda la conexion
        client.query('LISTEN webpush');

        client.on('notification', async (msg) => {
            console.log(msg.channel);
            console.log(msg.payload);

            let datapush = JSON.parse(msg.payload);
            console.log(datapush);
            try {
                await webpush.sendNotification(datapush.subscription, JSON.stringify(datapush.payload));
            } catch (error) {
                console.log(error);
            }

        })
    }


}