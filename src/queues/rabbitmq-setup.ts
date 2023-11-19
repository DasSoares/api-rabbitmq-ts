import client, { Channel, Connection, ConsumeMessage } from "amqplib";
import { configDotenv } from "dotenv";

configDotenv()


export class SetupRabbitMQ {
    
    private connection: Connection;
    private channel: Channel;
    public queue: string;

    constructor (queue: string) {
        this.queue = queue;
    }

    async init(): Promise<void> {
        await this.getConnection();
        await this.createChannel();
        await this.channel.assertQueue(this.queue);
    }

    async close(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
    }

    private async getConnection(): Promise<void> {
        this.connection = await client.connect(
            `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
        );
    }

    private async createChannel(): Promise<void> {
        this.channel = await this.connection.createChannel();
    }

    public sendMessage(payLoad: any): void {
        payLoad['timestamp'] = new Date().getTime();
        const message = JSON.stringify(payLoad);
        this.channel.sendToQueue(this.queue, Buffer.from(message))
    }

    public async getMessages(): Promise<object> {
        var arr = new Array();
        await this.channel.consume(this.queue, function(message: ConsumeMessage | null) {
            if (message?.content.toString()){
                var messageJson = JSON.parse(message.content.toString());
                arr.push(messageJson);
                // this.channel.ack(msg) // remove a mensagem da fila
            }
            }, {
            // noAck: true
        });

        return arr;
    }
}