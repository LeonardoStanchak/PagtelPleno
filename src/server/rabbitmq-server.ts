import { Connection, Channel, connect, Message } from "amqplib";

export default class RabbitmqServer {
  private conn:Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }
}