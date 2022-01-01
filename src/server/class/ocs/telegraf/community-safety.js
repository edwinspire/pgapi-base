const { BOT_TOKEN } = process.env;
const crypto = require("crypto");

const EventEmitter = require('events');
const TelegrafOrg = require('telegraf')
const Markup = require('telegraf/markup')
const ServerRoot = require("../../GetServerRoot");
const FetchDataNode = require("@edwinspire/universal-fetch");
const textEmergency = "🚨 EMERGENCIA";
const textwarning = "⚠ ADVERTENCIA";
const textTest = "🔈 PRUEBA";
const textTurnoff = "🔇 APAGAR";


module.exports.Telegraf = class Telegraf extends EventEmitter {
    constructor() {
        super()

        this.FDataNode = new FetchDataNode();

        this.bot = new TelegrafOrg(BOT_TOKEN);

        /*
        this.bot.on('message', (ctx) => {
            console.log('message bot >>> ', ctx.message.from.first_name);        
        })
        */

        this.bot.command('getid', (ctx) => {
            //console.log('consulta grupo >>> ', ctx.update.message.chat.id);
            ctx.reply('idgroup: ' + Telegraf.getidgroup(ctx.update.message.chat.id))
        });


        this.bot.command('register', async (ctx) => {
            ctx.reply('Un momento por favor. Se está registrando el grupo...');
            try {
                let res = await this.FDataNode.post(
                    ServerRoot() + "/pgapi/OpenCommunitySecurity/Account",
                    ctx.update.message
                );
                let data_res = await res.json();

                ctx.reply(
                    data_res.account_name +
                    " se encuentra registrado. ID: " +
                    data_res.uniqueid
                );
            } catch (error) {
                console.log(error);
                ctx.reply("Ocurrió un error, no se pudo registrar");
            }
        });


        this.bot.command('/start', ({ reply }) => {
            return reply('Seleccione una opción', Markup
                .keyboard([
                    [textEmergency],
                    [textwarning],
                    [textTest, textTurnoff]
                ])
                .oneTime()
                .resize()
                .extra()
            )
        })

        this.bot.hears(textEmergency, async (ctx) => {
            let message = "";
            try {
                let reevent = await Telegraf.SendEvent(ctx, 'EOCSA100');
                //message = reevent.message;
                message = 'Recibida solicitud ' + reevent.idevent;
            } catch (error) {
                message = 'Ocurrió un error: ' + JSON.stringify(error)
            }
            ctx.reply(message);
        })
        this.bot.hears(textwarning, async (ctx) => {
            let message = "";
            try {
                let reevent = await Telegraf.SendEvent(ctx, 'EOCSA102');
                message = reevent.message;
            } catch (error) {
                message = 'Ocurrió un error: ' + JSON.stringify(error)
            }
            ctx.reply(message);
        })

        this.bot.hears(textTest, async (ctx) => {
            console.log(textTest);
            let message = "";
            try {
                let reevent = await Telegraf.SendEvent(ctx, 'EOCSA104');
                message = reevent.message;
            } catch (error) {
                message = 'Ocurrió un error: ' + JSON.stringify(error)
            }
            ctx.reply(message).catch((e) => {
                console.trace(e);
            });
        })
        this.bot.hears(textTurnoff, async (ctx) => {
            //console.log('Pulsa APAGAR');
            let message = "";
            try {
                let reevent = await Telegraf.SendEvent(ctx, 'ROCSA106');
                message = reevent.message;
            } catch (error) {
                message = 'Ocurrió un error: ' + JSON.stringify(error)
                console.log(error);
            }
            ctx.reply(message);
        });


    }



    static getidgroup(idgroup) {
        let c = crypto
            .createHash("md5")
            .update(JSON.stringify(idgroup))
            .digest("hex");
        //console.log('MD5 de ', idgroup, JSON.stringify(idgroup), c);
        return c;
    }

    launch() {
        //CreateSocketIONameSpace(socketioInstance)
        this.bot.launch();
    }

    static async SendEventOCS(data) {
        console.log('SendEventOCS');
        try {
            //console.log(data);
            let FDataNodeFetch = new FetchDataNode();
            let res = await FDataNodeFetch.post(
                ServerRoot() + "/pgapi/OpenCommunitySecurity/event",
                data
            );
            let data_res = await res.json();
            //return data_res;
            
            //console.log(data_res);
            if (Array.isArray(data_res) && data_res.length > 0) {
                return data_res[0];
            } else {
            //    console.log('data_res', data_res);
                return data_res;
            }
            

        } catch (error) {
            console.log(error);
            return error;
        }
    }


    static async SendEvent(ctx, eventcode) {
        console.log('SendEvent', eventcode);
        try {
            let data = { idgroup: Telegraf.getidgroup(ctx.message.chat.id), message: ctx.message, eventcode: eventcode };
            return await Telegraf.SendEventOCS(data);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async getEventById(idevent) {
        try {
            let FDataNodeFetch = new FetchDataNode();
            let res = await FDataNodeFetch.get(
                ServerRoot() + "/pgapi/OpenCommunitySecurity/event",
                { idevent: idevent }
            );

            let data_res = await res.json();

            if (Array.isArray(data_res) && data_res.length > 0) {
                return data_res[0];
            } else {
                console.log('OJO ==>>>> ', data_res);
                return data_res;
            }

        } catch (error) {
            console.log('getEventById', error);
            return error;
        }
    }

    async sendMessageToGroup(event) {
        //console.log('>>>>>>> event.idgroup', event.details);
        try {
            if (event && event.idevent > 0) {
                if (typeof event.identification !== 'undefined' && event.notify) {
                    let message = event.label;

                    if (event.details.message.from) {
                        message = event.details.message.from.first_name + ' ' + event.details.message.from.last_name + ' envía ' + event.label;
                    } else if (event.details.message.description) {
                        message = event.label + ' ' + event.details.message.description;
                    }

                    await this.bot.telegram.sendMessage(Number(event.identification), message);
                }
            } else {
                console.trace('sendMessageToGroup evento no válido', event.identification);
            }
        } catch (error) {
            console.log(error, event.identification);
        }
    }

    async ProcessPgNotification(socketio, pgNotifyEvent) {

        console.log('===>>>>   pgNotifyEvent.channel', pgNotifyEvent.channel);

        if (pgNotifyEvent && pgNotifyEvent.channel) {
            try {
                let payloadNotify = JSON.parse(pgNotifyEvent.payload);
                switch (pgNotifyEvent.channel) {
                    case 'events.data':
                        if (payloadNotify && payloadNotify.idevent && payloadNotify.idevent > 0) {
                            let event = await Telegraf.getEventById(payloadNotify.idevent);
                            Telegraf.EmitEventToNameSpace(socketio, event);
                            this.sendMessageToGroup(event);
                        } else {
                            console.error("pgNotifyProcess - El evento no es válido", pgNotifyEvent);
                        }
                        break;
                }
            } catch (error) {
                console.error('ProcessPgNotification 2', pgNotifyEvent, error);
            }
        } else {
            console.error('ProcessPgNotification 1', pgNotifyEvent);
        }
    }

    static EmitEventToNameSpace(socketioInstance, event) {
        let namespace = "/appocs";

        if (event && typeof event.identification !== 'undefined') {
            //3) Obtener el namespace del evento
            namespace += '-' + Telegraf.getidgroup(Number(event.identification));
            //console.log('====>>>>', namespace, event.ideventtype, event.code);
            //4) Emitir el evento al socketio
            socketioInstance.of(namespace).emit(event.code, {});
            console.log('EmitEventToNameSpace emite ' + namespace + ' ' + event.code);
        } else {
            console.log('EmitEventToNameSpace Evento no válido', event);
        }
    }

    static CreateSocketIONameSpace(socketioInstance) {
        // Crea el namespace de forma dinamica
        let namespace_appocs = socketioInstance.of(/\/appocs-(.+)/g);

        namespace_appocs.on("connection", (socket) => {
            console.log("SocketIO Dev Connected");

            socket.use((packet, next) => {
                switch (packet[1]) {
                    case "EOCSC100":
                        Telegraf.SendEventOCS({ idgroup: packet[0].idgroup, message: packet[0], eventcode: 'EOCSC100' });
                        break;
                    default:
                        Telegraf.SendEventOCS({ idgroup: packet[0].idgroup, message: packet[0], eventcode: packet[1] });
                        break;
                }

                next();
            });

        });

    }

}

