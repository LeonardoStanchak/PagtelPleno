import { Channel, connect } from 'amqplib'
import {config} from 'dotenv'


export const uptdateEntregaMensagem = async ():Promise<Channel> =>{
    config()

    try {
        const connection = await connect(process.env.AMQP_SERVER)
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.QUEUE_NAME_UPDATE_ENTREGA)
        console.log("Conectado ao RabbitMq")
        return channel
    } catch (error) {
        console.log("Erro ao logar no RabbitMq")
        console.log(error)
        return null;
    }
}